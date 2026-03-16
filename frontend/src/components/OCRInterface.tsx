"use client";

import { useState, useRef, useEffect } from "react";
import Dropzone from "@/components/Dropzone";
import { Copy, Check, RefreshCw, FileText, Image as ImageIcon, Sparkles, Download, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createWorker } from "tesseract.js";

export default function OCRInterface() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setPreviewUrl(null);
    setExtractedText("");
    setProgress(0);
    setStatus("");
  }, [selectedFile]);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setExtractedText("");
    setProgress(0);
    setStatus("");
  };

  const processImage = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setExtractedText("");
    setProgress(0);
    setStatus("Initializing OCR engine...");

    try {
      const worker = await createWorker('eng', 1, {
        logger: (m) => {
          if (m.status === "recognizing text") {
            setProgress(Math.round(m.progress * 100));
            setStatus(`Extracting text: ${Math.round(m.progress * 100)}%`);
          } else {
            setStatus(m.status.charAt(0).toUpperCase() + m.status.slice(1) + "...");
          }
        },
      });

      const { data: { text } } = await worker.recognize(selectedFile);
      setExtractedText(text);
      await worker.terminate();
      setStatus("Extraction complete!");
    } catch (error) {
      console.error(error);
      setStatus("Error: Failed to extract text.");
      alert("OCR processing failed. Please ensure the image contains clear text.");
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(extractedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadText = () => {
    const element = document.createElement("a");
    const file = new Blob([extractedText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "extracted-text.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-4xl p-2 shadow-2xl border border-slate-100 dark:border-slate-800 text-left">
      <AnimatePresence mode="wait">
        {!selectedFile ? (
          <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Dropzone onFileSelect={handleFileSelect} label="Upload Image to Extract Text" />
          </motion.div>
        ) : (
          <motion.div key="interface" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Preview Section */}
              <div className="space-y-6">
                <div className="relative rounded-3xl overflow-hidden bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 shadow-inner min-h-[300px] flex items-center justify-center">
                  {previewUrl && (
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="max-w-full max-h-[500px] object-contain transition-all"
                    />
                  )}
                  <button onClick={() => setSelectedFile(null)} className="absolute top-4 right-4 p-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-xl text-slate-500 hover:text-red-500 transition-colors shadow-lg z-10">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {!isProcessing && !extractedText && (
                  <button 
                    onClick={processImage}
                    className="w-full py-5 bg-primary text-white rounded-2xl font-black text-xl shadow-xl shadow-primary/20 hover:bg-primary-dark hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                  >
                    <Sparkles className="w-6 h-6" />
                    Extract Text Now
                  </button>
                )}

                {isProcessing && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm font-bold text-slate-500 uppercase tracking-widest">
                      <span>{status}</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-gradient-to-r from-primary to-indigo-500 shadow-lg shadow-primary/30"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Result Section */}
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-2">
                   <h3 className="text-xl font-display font-black text-slate-900 dark:text-white flex items-center gap-2">
                     <FileText className="w-6 h-6 text-primary" />
                     Result Text
                   </h3>
                   {extractedText && (
                     <div className="flex gap-2">
                       <button 
                         onClick={copyToClipboard}
                         className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-primary/10 hover:text-primary rounded-xl transition-all"
                         title="Copy text"
                       >
                         {copied ? <Check className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
                       </button>
                       <button 
                         onClick={downloadText}
                         className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-primary/10 hover:text-primary rounded-xl transition-all"
                         title="Download .txt"
                       >
                         <Download className="w-5 h-5" />
                       </button>
                     </div>
                   )}
                </div>

                <div className="relative h-[400px]">
                   {!extractedText && !isProcessing ? (
                     <div className="absolute inset-0 border-4 border-dashed border-slate-50 dark:border-slate-800 rounded-3xl flex flex-col items-center justify-center text-center p-8 text-slate-400">
                        <ImageIcon className="w-16 h-16 mb-4 opacity-20" />
                        <p className="font-bold">No text detected yet</p>
                        <p className="text-xs">Click 'Extract Text Now' to start processing.</p>
                     </div>
                   ) : (
                     <textarea 
                       readOnly
                       value={extractedText}
                       placeholder="Extracted text will appear here..."
                       className="w-full h-full p-6 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-3xl outline-none focus:border-primary transition-all text-slate-700 dark:text-slate-200 font-medium resize-none text-sm md:text-base leading-relaxed"
                     />
                   )}
                </div>

                {extractedText && (
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 p-4 rounded-2xl flex items-center gap-3">
                    <Check className="w-5 h-5 text-emerald-500" />
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Text successfully extracted! You can now copy or edit the text.</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
