"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Dropzone from "@/components/Dropzone";
import { Download, RefreshCw, Layers, FileText, Image as ImageIcon, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { downloadBlob } from "@/utils/download";
// pdfjs-dist will be imported dynamically inside the function

export default function PDFToImageInterface() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [images, setImages] = useState<{ url: string; pageNum: number }[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [progress, setProgress] = useState(0);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setImages([]);
    setStatus("idle");
    setProgress(0);
  };

  const convertPDFToImages = async () => {
    if (!selectedFile) return;

    setStatus("processing");
    setImages([]);
    setProgress(5);

    try {
      const pdfjsLib = await import("pdfjs-dist");
      // Set worker path
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${(pdfjsLib as any).version}/pdf.worker.min.mjs`;
      
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const totalPages = pdf.numPages;
      const extractedImages: { url: string; pageNum: number }[] = [];

      for (let i = 1; i <= totalPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2.0 }); // Higher scale for better quality
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (!context) continue;

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvasContext: context, viewport, canvas: canvas as any }).promise;
        
        const url = canvas.toDataURL("image/png");
        extractedImages.push({ url, pageNum: i });
        setProgress(Math.round((i / totalPages) * 100));
      }

      setImages(extractedImages);
      setStatus("done");
    } catch (err) {
      console.error("PDF Conversion Error:", err);
      setStatus("error");
    }
  };

  const downloadImage = async (url: string, pageNum: number) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      await downloadBlob(blob, `page-${pageNum}-${selectedFile?.name.replace(".pdf", "")}.png`);
    } catch (error) {
      // Fallback: open in new tab
      window.open(url, '_blank');
    }
  };

  const downloadAll = async () => {
    for (const img of images) {
      await downloadImage(img.url, img.pageNum);
    }
  };

  const reset = () => {
    setSelectedFile(null);
    setImages([]);
    setStatus("idle");
    setProgress(0);
  };

  return (
    <div className="text-left">
      <AnimatePresence mode="wait">
        {!selectedFile ? (
          <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Dropzone onFileSelect={handleFileSelect} label="Upload PDF to Extract Images" />
          </motion.div>
        ) : (
          <motion.div key="interface" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
            <div className="glass p-8 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-8 border border-white/40 dark:border-white/5">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:rotate-6 transition-transform">
                  <FileText className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">{selectedFile.name}</h3>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-0.5">Ready for extraction</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={reset} className="p-4 text-slate-400 hover:text-red-500 transition-colors">
                   <X className="w-6 h-6" />
                </button>
                {status === "idle" && (
                  <button onClick={convertPDFToImages} className="px-8 py-4 bg-primary text-white rounded-2xl font-black shadow-xl shadow-primary/20 hover:opacity-90 active:scale-95 transition-all flex items-center gap-2">
                    <Layers className="w-5 h-5" />
                    <span>Extract All Pages</span>
                  </button>
                )}
              </div>
            </div>

            {status === "processing" && (
              <div className="glass p-12 rounded-[2.5rem] text-center space-y-8 max-w-xl mx-auto border border-dashed border-primary/20">
                <div className="w-20 h-20 rounded-full border-4 border-slate-100 dark:border-slate-800 border-t-primary animate-spin mx-auto" />
                <div>
                   <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-2 italic">Converting Pages...</h4>
                   <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-4">
                     <motion.div className="h-full bg-primary" initial={{ width: 0 }} animate={{ width: `${progress}%` }} />
                   </div>
                   <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{progress}% Complete</p>
                </div>
              </div>
            )}

            {status === "done" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Extracted Images ({images.length})</h2>
                  <button onClick={downloadAll} className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-xs hover:opacity-90 transition-all flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    <span>Download All</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {images.map((img) => (
                    <motion.div 
                      key={img.pageNum}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="group relative"
                    >
                      <div className="glass p-4 rounded-[2rem] border border-white/50 dark:border-white/5 hover:border-primary/30 transition-all duration-300">
                        <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-6 relative">
                          <img src={img.url} alt={`Page ${img.pageNum}`} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                             <button 
                               onClick={() => downloadImage(img.url, img.pageNum)}
                               className="w-12 h-12 rounded-2xl bg-white text-primary flex items-center justify-center shadow-2xl scale-50 group-hover:scale-100 transition-transform"
                             >
                               <Download className="w-6 h-6" />
                             </button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between px-2">
                           <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Page {img.pageNum}</span>
                           <button onClick={() => downloadImage(img.url, img.pageNum)} className="text-[10px] font-black text-primary hover:underline">Download PNG</button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {status === "error" && (
              <div className="p-12 glass rounded-[2.5rem] text-center border border-red-100 dark:border-red-900/30">
                 <h4 className="text-xl font-bold text-red-500 mb-4">Failed to process PDF</h4>
                 <button onClick={reset} className="px-8 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold text-sm text-slate-600">Try Again</button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
