"use client";

import { useState, useEffect, useCallback } from "react";
import Dropzone from "@/components/Dropzone";
import { Download, RefreshCw, Zap, Settings2, X, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { getPendingFile, clearPendingFile, savePendingFile } from "@/utils/filePersist";
import WorkflowNavigator from "@/components/WorkflowNavigator";
import ImageComparisonSlider from "@/components/ImageComparisonSlider";
import { downloadBlob, isMobileDevice } from "@/utils/download";

export default function ImageCompressorInterface() {
  const searchParams = useSearchParams();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "compressing" | "done" | "error">("idle");
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [compressionValue, setCompressionValue] = useState(0.7);
  const [targetSizeMB, setTargetSizeMB] = useState(1);
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const compressImage = useCallback(async (fileToCompress: File, target: number, quality: number) => {
    if (!fileToCompress) return;

    setStatus("compressing");
    setProgress(10);

    const isMobile = isMobileDevice();
    const isSmallerThanTarget = fileToCompress.size / (1024 * 1024) <= target;
    
    const options = {
      maxSizeMB: isMobile ? Math.min(target, 0.8) : target,
      maxWidthOrHeight: isMobile ? 1200 : 1920,
      useWebWorker: true,
      onProgress: (p: number) => setProgress(p),
      initialQuality: isSmallerThanTarget ? 0.95 : quality,
    };

    try {
      const { default: imageCompression } = await import("browser-image-compression");
      const compressed = await imageCompression(fileToCompress, options);
      setCompressedFile(compressed);
      if (compressedUrl) URL.revokeObjectURL(compressedUrl);
      setCompressedUrl(URL.createObjectURL(compressed));
      setStatus("done");
      setProgress(100);
    } catch (error: any) {
      console.error("Compression error:", error);
      setErrorMessage(isMobileDevice() 
        ? "Processing failed. Please try a smaller image (under 2MB)." 
        : "Compression failed. Please try again.");
      setStatus("error");
    }
  }, [compressedUrl]);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    if (selectedUrl) URL.revokeObjectURL(selectedUrl);
    setSelectedUrl(URL.createObjectURL(file));
    setCompressedFile(null);
    if (compressedUrl) URL.revokeObjectURL(compressedUrl);
    setCompressedUrl(null);
    setStatus("idle");
    setProgress(0);
    
    const originalMB = file.size / (1024 * 1024);
    if (originalMB < 1) {
      setTargetSizeMB(Math.max(0.1, parseFloat((originalMB * 0.7).toFixed(2))));
    } else {
      setTargetSizeMB(1);
    }
  };

  // Handle AI Auto-Actions and File Loading
  useEffect(() => {
    const initAI = async () => {
      const aiTargetSize = searchParams.get("targetSize");
      const autoProcess = searchParams.get("autoProcess");
      
      let target = 1;
      if (aiTargetSize) {
        target = parseFloat(aiTargetSize);
        setTargetSizeMB(target);
      }

      const pendingFile = await getPendingFile();
      if (pendingFile) {
        setSelectedFile(pendingFile);
        if (autoProcess === "true") {
          setTimeout(() => {
            compressImage(pendingFile, target, 0.7);
          }, 500);
        }
        clearPendingFile();
      }
    };
    initAI();
  }, [searchParams, compressImage]);

  const downloadImage = async () => {
    if (!compressedFile || !selectedFile) return;
    const fileName = `compressed-${selectedFile.name}`;
    await downloadBlob(compressedFile, fileName);
  };

  const reset = () => {
    setSelectedFile(null);
    setCompressedFile(null);
    setStatus("idle");
    setProgress(0);
  };

  return (
    <div className="text-left">
      <AnimatePresence mode="wait">
        {!selectedFile ? (
          <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Dropzone onFileSelect={handleFileSelect} label="Upload Image to Compress" />
          </motion.div>
        ) : (
          <motion.div key="interface" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-4">
            <div className="flex flex-col lg:flex-row gap-12 items-start">
              <div className="w-full lg:w-3/5 min-h-[300px] sm:min-h-[450px]">
                <ImageComparisonSlider 
                  beforeUrl={selectedUrl || ""}
                  afterUrl={compressedUrl || selectedUrl || ""}
                  beforeLabel={`Original (${formatSize(selectedFile.size)})`}
                  afterLabel={compressedFile ? `Compressed (${formatSize(compressedFile.size)})` : `Original (${formatSize(selectedFile.size)})`}
                  onReset={reset}
                />
              </div>

              <div className="w-full lg:w-2/5 space-y-8">
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                        <Settings2 className="w-4 h-4 text-slate-400" />
                        <span className="text-sm">Target File Size</span>
                      </div>
                      <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
                        <input 
                          type="number" step="0.1" min="0.01" value={targetSizeMB}
                          onChange={(e) => setTargetSizeMB(parseFloat(e.target.value) || 0.1)}
                          className="w-full bg-transparent text-[#111] dark:text-white font-bold text-right focus:outline-none text-sm"
                        />
                        <span className="text-[10px] font-bold text-slate-400">MB</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                        <Zap className="w-4 h-4 text-slate-400" />
                        <span className="text-sm">Initial Quality</span>
                      </div>
                      <span className="text-sm font-bold text-[#111] dark:text-white">{Math.round(compressionValue * 100)}%</span>
                    </div>
                    <input 
                      type="range" min="0.1" max="1.0" step="0.05" value={compressionValue}
                      onChange={(e) => setCompressionValue(parseFloat(e.target.value))}
                      className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#111]"
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  {status === "error" && errorMessage && (
                    <div className="p-4 rounded-xl border border-red-200 bg-red-50 dark:bg-red-900/20 flex flex-col gap-3">
                      <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                        <AlertCircle className="w-5 h-5" />
                        <span className="text-sm font-bold">Processing Failed</span>
                      </div>
                      <p className="text-xs text-red-600 dark:text-red-300">{errorMessage}</p>
                      <button 
                        onClick={() => { setStatus("idle"); setErrorMessage(""); }}
                        className="text-xs font-bold text-red-500 underline"
                      >
                        Try Again
                      </button>
                    </div>
                  )}

                  {status === "idle" && (
                    <button 
                      onClick={() => compressImage(selectedFile, targetSizeMB, compressionValue)} 
                      className="w-full py-5 bg-primary text-white rounded-2xl font-black text-lg shadow-xl shadow-primary/20 hover:bg-primary-dark hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 mt-4"
                    >
                      <Zap className="w-5 h-5" />
                      <span>Compress Image Now</span>
                    </button>
                  )}

                  {status === "compressing" && (
                    <div className="space-y-4">
                      <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <motion.div className="h-full bg-[#111] dark:bg-white" initial={{ width: 0 }} animate={{ width: `${progress}%` }} />
                      </div>
                      <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest animate-pulse">
                        Optimizing... {progress}%
                      </p>
                    </div>
                  )}

                  {status === "done" && compressedFile && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="p-4 rounded-xl border border-[#E5E5E5] dark:border-slate-800">
                          <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">Original</div>
                          <div className="text-lg font-bold text-[#111] dark:text-white">{formatSize(selectedFile.size)}</div>
                        </div>
                        <div className="p-4 rounded-xl border border-[#E5E5E5] dark:border-slate-800 bg-slate-50/50">
                          <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">Compressed (-{Math.round((1 - compressedFile.size / selectedFile.size) * 100)}%)</div>
                          <div className="text-lg font-bold text-primary">{formatSize(compressedFile.size)}</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={downloadImage} className="flex-1 py-3 bg-[#111] dark:bg-white text-white dark:text-[#111] rounded-lg font-bold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2">
                          <Download className="w-4 h-4" />
                          <span>Download</span>
                        </button>
                        <button onClick={reset} className="px-4 py-3 border border-[#E5E5E5] text-[#111] dark:text-white rounded-lg font-bold text-sm hover:bg-slate-50 transition-all">
                          <RefreshCw className="w-4 h-4" />
                        </button>
                      </div>

                      <WorkflowNavigator currentToolId="compressor" activeFile={compressedFile} />
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
