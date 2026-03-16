"use client";

import { useState, useRef } from "react";
import Dropzone from "@/components/Dropzone";
import { Download, Layers, FileText, X, Loader2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { API_ENDPOINTS } from "@/utils/apiConfig";

export default function PDFToImageInterface() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const processingRef = useRef(false);

  const handleFileSelect = (file: File) => {
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      setError('Please select a PDF file');
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      setError('File size must be less than 50MB');
      return;
    }
    setSelectedFile(file);
    setStatus("idle");
    setProgress(0);
    setError(null);
  };

  const convertPDFToImages = async () => {
    if (!selectedFile || processingRef.current) return;

    processingRef.current = true;
    setStatus("processing");
    setError(null);
    setProgress(10);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      setProgress(30);

      const response = await fetch(API_ENDPOINTS.pdfToImage, {
        method: 'POST',
        body: formData,
      });

      setProgress(70);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Conversion failed' }));
        throw new Error(errorData.detail || `Server error: ${response.status}`);
      }

      setProgress(90);

      // Get the ZIP blob and trigger download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = selectedFile.name.replace('.pdf', '_images.zip');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      setProgress(100);
      setStatus("done");
    } catch (err: any) {
      console.error("PDF Conversion Error:", err);
      setError(err.message || 'Failed to convert PDF. Please try again.');
      setStatus("error");
    } finally {
      processingRef.current = false;
    }
  };

  const reset = () => {
    setSelectedFile(null);
    setStatus("idle");
    setProgress(0);
    setError(null);
    processingRef.current = false;
  };

  return (
    <div className="text-left">
      <AnimatePresence mode="wait">
        {!selectedFile ? (
          <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Dropzone 
              onFileSelect={handleFileSelect} 
              accept={{ 'application/pdf': ['.pdf'] }} 
              label="Upload PDF to Extract Images" 
            />
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
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • Ready
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={reset} className="p-4 text-slate-400 hover:text-red-500 transition-colors">
                  <X className="w-6 h-6" />
                </button>
                {status === "idle" && (
                  <button 
                    onClick={convertPDFToImages} 
                    className="px-8 py-4 bg-primary text-white rounded-2xl font-black shadow-xl shadow-primary/20 hover:opacity-90 active:scale-95 transition-all flex items-center gap-2"
                  >
                    <Layers className="w-5 h-5" />
                    <span>Extract All Pages</span>
                  </button>
                )}
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800 flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </motion.div>
            )}

            {status === "processing" && (
              <div className="glass p-12 rounded-[2.5rem] text-center space-y-8 max-w-xl mx-auto border border-dashed border-primary/20">
                <div className="w-20 h-20 rounded-full border-4 border-slate-100 dark:border-slate-800 border-t-primary animate-spin mx-auto" />
                <div>
                  <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-2 italic">Converting Pages...</h4>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-4">
                    <motion.div className="h-full bg-primary" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }} />
                  </div>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{progress}% Complete</p>
                </div>
              </div>
            )}

            {status === "done" && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="glass p-8 rounded-[2rem] text-center border border-green-500/20"
              >
                <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
                  <Layers className="w-10 h-10 text-green-600" />
                </div>
                <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Conversion Complete!</h4>
                <p className="text-sm text-slate-500 mb-8">Your images have been downloaded as a ZIP file.</p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={convertPDFToImages}
                    className="px-8 py-4 bg-primary text-white rounded-2xl font-black shadow-xl shadow-primary/20 hover:opacity-90 active:scale-95 transition-all flex items-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download Again</span>
                  </button>
                  <button 
                    onClick={reset}
                    className="px-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                  >
                    Convert Another PDF
                  </button>
                </div>
              </motion.div>
            )}

            {status === "error" && (
              <div className="p-12 glass rounded-[2.5rem] text-center border border-red-100 dark:border-red-900/30">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-red-500 mb-4">Failed to process PDF</h4>
                <p className="text-sm text-slate-500 mb-6">{error || 'An unexpected error occurred.'}</p>
                <button onClick={reset} className="px-8 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                  Try Again
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
