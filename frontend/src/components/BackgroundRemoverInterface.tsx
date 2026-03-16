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
import { downloadBlob, isMobileDevice } from "@/utils/download";
import { isIOS, isSafari, getDeviceOptimizationLevel } from "@/utils/heicUtils";
import { API_ENDPOINTS } from "@/utils/apiConfig";
import ProgressStatus from "./ProgressStatus";

export default function BackgroundRemoverInterface() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "optimizing" | "processing" | "done" | "error">("idle");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const [statusLevel, setStatusLevel] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [retryCount, setRetryCount] = useState(0);
  const [triedBackendFallback, setTriedBackendFallback] = useState(false);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setStatus("idle");
    setProcessedImage(null);
    setProgress(0);
    setStatusLevel(1);
    setRetryCount(0);
    setTriedBackendFallback(false);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const removeBackground = async (isRetry = false) => {
    if (!selectedFile) return;

    setStatus(isRetry ? "optimizing" : "optimizing");
    setStatusLevel(1);
    setProgress(0);
    if (!isRetry) setRetryCount(0);
    
    try {
      // 1. Mobile Optimization: Pre-scale image if it's too large to save WebGL memory
      let fileToProcess = selectedFile;
      
      const isIOSDevice = isIOS();
      const isSafariBrowser = isSafari();
      const isMobile = isMobileDevice();

      // Use device optimization levels from heicUtils
      const optimization = getDeviceOptimizationLevel();
      
      let MAX_SIZE_MB = optimization.maxSizeMB;
      let MAX_DIM = optimization.maxDimension;

      // Additional restrictions for Safari (more aggressive)
      if (isSafariBrowser) {
        MAX_SIZE_MB = Math.min(MAX_SIZE_MB, 0.2);
        MAX_DIM = Math.min(MAX_DIM, 640);
      }

      // Stage fallbacks based on retry count
      if (retryCount === 1) {
        MAX_SIZE_MB = Math.min(MAX_SIZE_MB, 0.15);
        MAX_DIM = Math.min(MAX_DIM, 500);
      } else if (retryCount >= 2) {
        MAX_SIZE_MB = 0.1;
        MAX_DIM = 400; // Total safety fallback
      }
      
      if (selectedFile.size > 0.2 * 1024 * 1024 || isMobile || retryCount > 0) { 
        const options = {
          maxSizeMB: MAX_SIZE_MB,
          maxWidthOrHeight: MAX_DIM,
          useWebWorker: true
        };
        try {
          fileToProcess = await imageCompression(selectedFile, options);
          console.log(`Image level ${retryCount} optimization (${MAX_DIM}px) applied`);
        } catch (compressionError) {
          console.warn("Compression failed, trying current file:", compressionError);
        }
      }

      setStatus("processing");
      setStatusLevel(2);
      const processedBlob = await imglyRemoveBackground(fileToProcess, {
        progress: (key, current, total) => {
          const p = Math.round((current / total) * 100);
          setProgress(p);
          if (p > 50) setStatusLevel(3);
        },
        model: "isnet_fp16",
      });
      
      const url = URL.createObjectURL(processedBlob);
      setProcessedImage(url);
      setStatusLevel(4);
      setStatus("done");
      setStatusLevel(5);
      setRetryCount(0);
    } catch (err: any) {
      console.error("Background Removal Error:", err);
      
      const isMemoryError = err.message?.includes("WebGL") || err.message?.includes("memory") || err.message?.includes("out of memory");
      
      if (isMemoryError && retryCount < 2) {
        console.log(`Memory limit reached. Initiating fallback level ${retryCount + 1}...`);
        setRetryCount(prev => prev + 1);
        removeBackground(true); 
        return;
      }
      
      if (!triedBackendFallback) {
        console.log("Client-side processing failed. Trying server-side fallback...");
        tryBackendFallback();
        return;
      }

      const isMobile = isMobileDevice();
      let msg = isMobile 
        ? "AI processing failed on mobile. Please try a smaller image (under 1MB) or use a desktop computer for best results."
        : "AI processing failed. Please try a smaller image or use a desktop browser.";
      if (isMemoryError) {
        msg = isMobile
          ? "Device memory limit reached. Try a much smaller image (under 500KB) for mobile processing."
          : "Device memory limit reached. Try a significantly smaller or cropped image.";
      }
      setErrorMessage(msg);
      setStatus("error");
      setStatusLevel(1);
      setProgress(0);
    }
  };

  const tryBackendFallback = async () => {
    if (!selectedFile || triedBackendFallback) return;
    
    setTriedBackendFallback(true);
    setStatus("processing");
    setStatusLevel(2);
    setProgress(10);
    setErrorMessage("");
    
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      
      setStatusLevel(2);
      setProgress(30);
      
      const response = await fetch(API_ENDPOINTS.removeBackground, {
        method: 'POST',
        body: formData,
      });
      
      setStatusLevel(3);
      setProgress(70);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Server processing failed' }));
        throw new Error(errorData.detail || `Server error: ${response.status}`);
      }
      
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setProcessedImage(url);
      setStatusLevel(4);
      setStatus("done");
      setStatusLevel(5);
    } catch (err: any) {
      console.error("Backend Fallback Error:", err);
      const isMobile = isMobileDevice();
      setErrorMessage(
        isMobile 
          ? "Server processing also failed. Please try a much smaller image or use a desktop computer."
          : "Server processing also failed. Please try a smaller image."
      );
      setStatus("error");
      setStatusLevel(1);
      setProgress(0);
    }
  };

  const downloadImage = async () => {
    if (!processedImage) return;
    try {
      const response = await fetch(processedImage);
      const blob = await response.blob();
      await downloadBlob(blob, `Auxkit-removed-bg-${Date.now()}.png`);
    } catch (error) {
      // Fallback: open in new tab
      window.open(processedImage, '_blank');
    }
  };

  const reset = () => {
    setSelectedFile(null);
    setProcessedImage(null);
    setStatus("idle");
    setErrorMessage("");
    setProgress(0);
    setStatusLevel(1);
    setRetryCount(0);
    setTriedBackendFallback(false);
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
                  <ProgressStatus 
                    level={1} 
                    progress={progress} 
                    isClientSide={true}
                    customMessage={retryCount > 0 ? "Memory recovery: Re-scaling..." : "Preparing your file..."}
                  />
                )}

                {status === "processing" && (
                  <ProgressStatus 
                    level={statusLevel} 
                    progress={progress} 
                    isClientSide={true}
                  />
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
