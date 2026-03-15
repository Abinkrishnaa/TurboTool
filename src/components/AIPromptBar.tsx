"use client";

import React, { useState, useEffect, useRef } from "react";
import { Sparkles, Mic, ImagePlus, ArrowRight, X, Loader2, Bot, User, Clock, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TOOLS, Tool } from "@/constants/tools";
import { useRouter } from "next/navigation";
import { savePendingFile } from "@/utils/filePersist";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AIPromptBar() {
  const [prompt, setPrompt] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [suggestedTool, setSuggestedTool] = useState<Tool | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Auto-scroll chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Real-time Content Detection Logic
  useEffect(() => {
    const query = prompt.trim().toLowerCase();
    const hasFile = !!uploadedFile;
    
    if (query.length > 2 || hasFile) {
      // 1. YouTube Detection
      const isYT = query.includes("youtube.com") || query.includes("youtu.be");
      
      // 2. JSON Detection
      const isJSON = (query.startsWith("{") && query.endsWith("}")) || (query.startsWith("[") && query.endsWith("]")) || query.includes("\"key\":") || query.includes(": \"");

      const scoredTools = TOOLS.map(tool => {
        let score = 0;
        
        // Contextual Boosts
        if (isYT && tool.id === "yt-downloader") score += 50;
        if (isJSON && tool.id === "json-formatter") score += 50;
        
        // Multi-Step Keywords (Workflow triggers)
        if (query.includes("then") || query.includes("after") || query.includes("and")) score += 2;

        // Tool-specific heuristics
        if (tool.id === "compressor" && (query.includes("compress") || query.includes("small") || query.includes("kb") || query.includes("mb") || query.includes("light"))) score += 15;
        if (tool.id === "bg-remover" && (query.includes("background") || query.includes("remove bg") || query.includes("transparent") || query.includes("cutout"))) score += 20;
        if (tool.id === "img-to-pdf" && query.includes("to pdf")) score += 35;
        if (tool.id === "pdf-to-img" && (query.includes("pdf to") || query.includes("extract"))) score += 35;
        if ((tool.id === "img-to-pdf" || tool.id === "pdf-to-img") && query.includes("pdf") && query.includes("image")) score += 20;
        if (tool.id === "pdf-to-word" && (query.includes("pdf to word") || query.includes("pdf to doc"))) score += 35;
        if (tool.id === "word-to-pdf" && (query.includes("word to pdf") || query.includes("doc to pdf"))) score += 35;
        if (tool.id === "img-cropper" && (query.includes("crop") || query.includes("trim") || query.includes("cut"))) score += 15;
        
        // General Keyword Match
        tool.keywords.forEach(k => { if (query.includes(k.toLowerCase())) score += 8; });
        if (tool.name.toLowerCase().includes(query)) score += 5;
        
        return { tool, score };
      });

      const bestMatch = scoredTools.sort((a, b) => b.score - a.score)[0];
      setSuggestedTool(bestMatch && bestMatch.score > 5 ? bestMatch.tool : null);
    } else {
      setSuggestedTool(null);
    }
  }, [prompt, uploadedFile]);

  const handleSend = async () => {
    const userPrompt = prompt.trim();
    if (!userPrompt && !uploadedFile) return;

    // 1. Capture tool and file state
    const detectedTool = suggestedTool;
    const currentFile = uploadedFile;
    const userMessage = userPrompt || (currentFile ? `Attached file: ${currentFile}` : "");
    const lowerMsg = userMessage.toLowerCase();
    const isGreeting = ["hi", "hello", "hey", "who are you", "who r u", "hi turbo"].some(g => lowerMsg === g || lowerMsg.startsWith(g + " "));
    
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setPrompt("");
    setUploadedFile(null);
    setIsUploading(true);
    
    // 2. Local Intelligence & Navigation Logic
    setTimeout(() => {
      // If a tool is detected and it's NOT a generic greeting
      if (detectedTool && !isGreeting) {
        let params = "autoProcess=true";
        if (detectedTool.id === "compressor") {
          const kbMatch = lowerMsg.match(/(\d+)\s*kb/);
          const mbMatch = lowerMsg.match(/(\d+)\s*mb/);
          if (kbMatch) params += `&targetSize=${(parseInt(kbMatch[1]) / 1024).toFixed(2)}`;
          else if (mbMatch) params += `&targetSize=${mbMatch[1]}`;
        }
        
        const navMsg = `I've found the **${detectedTool.name}** for you. Launching it now...`;
        setMessages(prev => [...prev, { role: "assistant", content: navMsg }]);
        
        const separator = detectedTool.href.includes("?") ? "&" : "?";
        setTimeout(() => {
          router.push(`${detectedTool.href}${separator}${params}`);
        }, 1500);
      } else {
        // Conversational Fallback (Local)
        let responseText = "I'm here to help! I can process images, handle PDFs, and more. What would you like to do?";
        
        if (lowerMsg.includes("day") || lowerMsg.includes("date")) {
          responseText = `Today is **${new Intl.DateTimeFormat('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(new Date())}**.`;
        } else if (lowerMsg.includes("time")) {
          responseText = `The current time is **${new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).format(new Date())}**.`;
        } else if (isGreeting) {
          responseText = "Hello! I am **TurboTool AI**, your intelligent assistant. How can I help you be more productive today?";
        } else if (lowerMsg.includes("thank")) {
          responseText = "You're very welcome! Let me know if you need anything else.";
        }

        setMessages(prev => [...prev, { role: "assistant", content: responseText }]);
      }
      setIsUploading(false);
    }, 600);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file.name);
      setPrompt(`Analyze this file: ${file.name}`);
      await savePendingFile(file);
    }
  };

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (e: any) => setPrompt(e.results[0][0].transcript);
    recognition.start();
  };

  return (
    <div className="w-full max-w-3xl mx-auto relative z-20">
      {/* Chat Messages */}
      <AnimatePresence>
        {messages.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-6 space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar p-1"
            ref={scrollRef}
          >
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`flex items-start gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${msg.role === "user" ? "bg-indigo-600 text-white" : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"}`}>
                  {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-indigo-500" />}
                </div>
                <div className={`px-4 py-3 rounded-2xl text-sm font-medium shadow-sm leading-relaxed break-words min-w-0 ${
                  msg.role === "user" 
                    ? "bg-indigo-600 text-white rounded-tr-none" 
                    : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-tl-none"
                }`}>
                  {msg.content.split('\n').map((line: string, j: number) => (
                    <p key={j} dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div 
        className={`relative group transition-all duration-500 rounded-3xl p-[2px] ${
          isFocused 
            ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-[0_0_40px_rgba(99,102,241,0.25)]" 
            : "bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 shadow-lg"
        }`}
      >
        <div className="relative flex items-center bg-white dark:bg-slate-950 rounded-[22px] px-4 md:px-6 py-3.5 md:py-4 border border-white/10">
          <Sparkles className={`w-5 h-5 mr-3 md:mr-4 shrink-0 transition-colors duration-300 ${isFocused ? "text-indigo-500 animate-pulse" : "text-slate-400"}`} />
          
          <div className="flex-1 flex flex-wrap items-center gap-2 min-w-0">
            {uploadedFile && (
              <div className="flex items-center gap-1.5 px-3 py-1 bg-indigo-50 dark:bg-indigo-900/40 rounded-lg text-indigo-600 dark:text-indigo-300 text-[10px] font-bold border border-indigo-100 dark:border-indigo-800 tracking-tight">
                <ImagePlus className="w-3.5 h-3.5" />
                <span className="max-w-[80px] truncate">{uploadedFile}</span>
                <button onClick={() => setUploadedFile(null)} className="hover:text-red-500"><X className="w-3 h-3" /></button>
              </div>
            )}
            <input
              ref={inputRef}
              type="text"
              placeholder={isListening ? "Listening..." : "Ask me anything..."}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 bg-transparent border-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none text-base md:text-lg font-medium min-w-0"
            />
          </div>

          <div className="flex items-center gap-1 sm:gap-4 ml-2 md:ml-4 shrink-0">
            <button onClick={startListening} className={`p-2 rounded-xl transition-all hidden xs:flex ${isListening ? "bg-red-50 text-red-500 animate-pulse" : "text-slate-400 hover:text-indigo-500 hover:bg-slate-50 dark:hover:bg-slate-900"}`}>
              <Mic className="w-5 h-5" />
            </button>
            <button onClick={() => fileInputRef.current?.click()} className="p-2 text-slate-400 hover:text-indigo-500 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl transition-all">
              {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ImagePlus className="w-5 h-5" />}
            </button>
            <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800 mx-0.5 md:mx-1" />
            <button 
              onClick={handleSend}
              className={`p-2 sm:p-2.5 rounded-xl transition-all ${
                (prompt.length > 0 || uploadedFile) 
                  ? "bg-indigo-600 text-white shadow-lg active:scale-95 hover:bg-indigo-700" 
                  : "bg-slate-100 dark:bg-slate-800 text-slate-400 opacity-50"
              }`}
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Suggested Tool Quick Result */}
      <AnimatePresence>
        {suggestedTool && !messages.length && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="mt-6 w-full"
          >
            <div className="glass p-5 rounded-[2rem] overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 p-8 -mr-8 -mt-8 bg-primary/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner group-hover:rotate-6 group-hover:scale-110">
                    <suggestedTool.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 dark:text-white text-base tracking-tight">{suggestedTool.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary text-[9px] font-black rounded-full uppercase tracking-widest border border-primary/10">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>Smart Match</span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">Perfect for your task</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={handleSend}
                  className="px-8 py-3.5 bg-primary text-white rounded-2xl text-xs font-black hover:opacity-90 transition-all shadow-xl shadow-primary/20 active:scale-95 flex items-center gap-2"
                >
                  <span>Launch Tool</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
