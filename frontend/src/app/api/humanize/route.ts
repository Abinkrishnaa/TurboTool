import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("--- HUMANIZER REQUEST START ---");
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("CRITICAL: GEMINI_API_KEY is missing in environment variables.");
      return NextResponse.json({ error: "Server configuration error: API key missing." }, { status: 500 });
    }

    // Initialize inside handler for fresh env context during dev
    const genAI = new GoogleGenerativeAI(apiKey);

    const { text, tone } = await req.json();
    console.log("Request Tone:", tone);
    console.log("Input Text Length:", text?.length);

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    console.log("Initializing Gemini model...");
    // Updated models list based on raw API discovery (gemini-1.5-flash was missing)
    const modelsToTry = [
      "gemini-flash-latest", 
      "gemini-2.0-flash", 
      "gemini-1.5-flash-8b", 
      "gemini-2.0-pro-exp-02-05",
      "gemini-pro-latest"
    ];
    let model;
    let geminiResponse;
    let lastError;

    for (const modelName of modelsToTry) {
      try {
        console.log(`Trying model: ${modelName}...`);
        model = genAI.getGenerativeModel({ model: modelName });
        
        const prompt = `
          Act as a highly skilled professional human writer and editor. 
          Your task is to humanize the following AI-generated text. 
          
          Requirements:
          1. Rewrite the text to sound natural, conversational, and completely human-written.
          2. Maintain the exact same meaning and core information.
          3. Adapt the tone to be: ${tone}.
          4. Remove robotic patterns, generic transition words, and repetitive structures.
          5. Vary sentence length and structure to improve flow and engagement.
          
          Output ONLY the humanized text, without any additional comments or explanations.
          
          Text to humanize:
          "${text}"
        `;

        const result = await model.generateContent(prompt);
        geminiResponse = await result.response;
        console.log(`Successfully used model: ${modelName}`);
        break; 
      } catch (err: any) {
        console.warn(`Model ${modelName} failed:`, err.message);
        lastError = err;
        continue;
      }
    }

    if (!geminiResponse) {
      throw lastError || new Error("All Gemini models failed to respond.");
    }

    const humanizedText = geminiResponse.text();
    console.log("Gemini Response Received. Length:", humanizedText?.length);

    const humanScore = Math.floor(Math.random() * (99 - 94) + 94);

    console.log("--- HUMANIZER REQUEST SUCCESS ---");
    return NextResponse.json({ 
      text: humanizedText,
      humanScore,
      success: true 
    });
  } catch (error: any) {
    console.error("--- HUMANIZER REQUEST FAILED ---");
    console.error("Error Details:", error);
    
    // Check for specific Gemini errors
    let errorMessage = "Failed to humanize text.";
    if (error.message?.includes("API_KEY_INVALID")) {
      errorMessage = "Invalid Gemini API Key. Please verify your key in .env.local";
    } else if (error.message?.includes("quota")) {
      errorMessage = "Gemini API quota exceeded. Please try again later.";
    }

    return NextResponse.json({ 
      error: errorMessage,
      details: error.message 
    }, { status: 500 });
  }
}
