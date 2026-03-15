"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  Download, 
  X, 
  CheckCircle,
  RefreshCw,
  AlertCircle
} from "lucide-react";
import { removeBackground as imglyRemoveBackground } from "@imgly/background-removal";
import imageCompression from "browser-image-compression";
import Dropzone from "./Dropzone";

export default function BackgroundRemoverInterface() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "optimizing" | "processing" | "done" | "error">("idle");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const [retryCount, setRetryCount] = useState(0);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setStatus("idle");
    setProcessedImage(null);
    setProgress(0);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const removeBackground = async (isRetry = false) => {
    if (!selectedFile) return;

    setStatus(isRetry ? "optimizing" : "optimizing");
    setProgress(0);
    if (!isRetry) setRetryCount(0);
    
    try {
      // 1. Mobile Optimization: Pre-scale image if it's too large to save WebGL memory
      let fileToProcess = selectedFile;
      
      // Higher mobile safety: Lower initial and retry thresholds
      const MAX_SIZE_MB = isRetry ? 0.4 : 0.8;
      const MAX_DIM = isRetry ? 800 : 1200;
      
      if (selectedFile.size > 0.2 * 1024 * 1024 || isRetry) { 
        const options = {
          maxSizeMB: MAX_SIZE_MB,
          maxWidthOrHeight: MAX_DIM,
          useWebWorker: true
        };
        try {
          fileToProcess = await imageCompression(selectedFile, options);
          console.log(`Image aggressively optimized (${MAX_DIM}px) for ${isRetry ? 'retry' : 'safety'}`);
        } catch (compressionError) {
          console.warn("Compression failed, trying current file:", compressionError);
        }
      }

      setStatus("processing");
      const processedBlob = await imglyRemoveBackground(fileToProcess, {
        progress: (key, current, total) => {
          const p = Math.round((current / total) * 100);
          setProgress(p);
        },
        model: "isnet_fp16",
      });
      
      const url = URL.createObjectURL(processedBlob);
      setProcessedImage(url);
      setStatus("done");
      setRetryCount(0);
    } catch (err: any) {
      console.error("Background Removal Error:", err);
      
      const isMemoryError = err.message?.includes("WebGL") || err.message?.includes("memory") || err.message?.includes("out of memory");
      
      if (isMemoryError && !isRetry) {
        console.log("Memory limit reached. Initiating auto-recovery...");
        setRetryCount(1);
        removeBackground(true); // Recursive retry with aggressive downscaling
        return;
      }

      let msg = "AI processing failed. Please try a smaller image or use a desktop browser.";
      if (isMemoryError) {
        msg = "Device memory limit reached even after optimization. Try a significantly smaller or cropped image.";
      }
      setErrorMessage(msg);
      setStatus("error");
    }
  };

  const downloadImage = () => {
    if (!processedImage) return;
    const link = document.createElement("a");
    link.href = processedImage;
    link.download = `TurboTool-removed-bg-${Date.now()}.png`;
    link.click();
  };

  const reset = () => {
    setSelectedFile(null);
    setProcessedImage(null);
    setStatus("idle");
    setErrorMessage("");
  };

  return (
    <div className="text-left">
      {!selectedFile ? (
        <Dropzone onFileSelect={handleFileSelect} label="Upload Image to Remove Background" />
      ) : (
        <div className="p-4">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Preview Section */}
            <div className="w-full lg:w-1/2">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                <img 
                  src={previewUrl || ""} 
                  alt="Original" 
                  className="max-w-full max-h-full object-contain"
                />
                <button 
                  onClick={reset}
                  className="absolute top-4 right-4 p-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-xl text-slate-500 hover:text-red-500 transition-colors shadow-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Action Section */}
            <div className="w-full lg:w-1/2 space-y-8 pt-4">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-[#111] dark:text-white">Processing Options</h3>
                <p className="text-xs text-slate-500 font-medium">Advanced AI edge detection is active by default.</p>
              </div>

              <div className="space-y-4">
                {status === "idle" && (
                  <button 
                    onClick={() => removeBackground(false)}
                    className="w-full py-4 bg-[#111] dark:bg-white text-white dark:text-[#111] rounded-lg font-bold text-sm shadow-sm hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-3"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Remove Background</span>
                  </button>
                )}

                {status === "optimizing" && (
                  <div className="space-y-4 py-4 text-center">
                    <RefreshCw className="w-6 h-6 mx-auto text-indigo-500 animate-spin" />
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {retryCount > 0 ? "Memory Recovery: Re-scaling..." : "Optimizing for Mobile..."}
                    </p>
                  </div>
                )}

                {status === "processing" && (
                  <div className="space-y-4">
                    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-indigo-600 dark:bg-indigo-400" 
                        initial={{ width: 0 }} 
                        animate={{ width: `${progress}%` }} 
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest animate-pulse">
                      {progress < 100 ? `AI Processing: ${progress}%` : "Finalizing pixels..."}
                    </p>
                  </div>
                )}

                {status === "done" && processedImage && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-4"
                  >
                    <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/30 flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                      <span className="text-xs font-bold text-emerald-700">Background removed successfully!</span>
                    </div>
                    <button 
                      onClick={downloadImage}
                      className="w-full py-4 bg-[#111] dark:bg-white text-white dark:text-[#111] rounded-lg font-bold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Transparent PNG</span>
                    </button>
                    <button 
                      onClick={reset}
                      className="w-full py-3 text-slate-400 hover:text-slate-600 font-bold text-[10px] uppercase tracking-widest transition-colors"
                    >
                      Clean and start over
                    </button>
                  </motion.div>
                )}

                {status === "error" && (
                  <div className="p-4 rounded-xl border border-red-100 bg-red-50/30 flex flex-col items-center gap-3 text-center">
                    <AlertCircle className="w-6 h-6 text-red-500" />
                    <p className="text-xs text-red-600 font-bold">{errorMessage}</p>
                    <button onClick={reset} className="text-[10px] font-bold text-slate-400 uppercase underline">Try Again</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
