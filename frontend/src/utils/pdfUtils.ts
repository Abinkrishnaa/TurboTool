"use client";

let pdfjsLib: any = null;

export async function loadPdfJs() {
  if (pdfjsLib) return pdfjsLib;
  
  pdfjsLib = await import("pdfjs-dist");
  
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
  
  return pdfjsLib;
}

export async function extractTextFromPDF(file: File): Promise<string> {
  const pdfjs = await loadPdfJs();
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
  
  let fullText = "";
  
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const items = textContent.items as any[];
    
    const lines: string[] = [];
    let currentLine = "";
    let lastY = -1;
    
    items.forEach((item: any) => {
      const y = item.transform[5];
      const text = item.str;
      
      if (lastY !== -1 && Math.abs(y - lastY) > 5) {
        if (currentLine) lines.push(currentLine);
        currentLine = text;
      } else {
        currentLine += (currentLine ? " " : "") + text;
      }
      lastY = y;
    });
    
    if (currentLine) lines.push(currentLine);
    fullText += lines.join("\n") + "\n\n";
  }
  
  return fullText;
}

export async function convertPDFToImages(file: File, onProgress?: (progress: number) => void): Promise<string[]> {
  const pdfjs = await loadPdfJs();
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
  
  const totalPages = pdf.numPages;
  const extractedImages: string[] = [];
  
  for (let i = 1; i <= totalPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 2.0 });
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    
    if (!context) continue;
    
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    
    await page.render({ canvasContext: context, viewport }).promise;
    
    const url = canvas.toDataURL("image/png");
    extractedImages.push(url);
    
    if (onProgress) {
      onProgress(Math.round((i / totalPages) * 100));
    }
  }
  
  return extractedImages;
}
