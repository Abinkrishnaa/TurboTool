"use client";

import { useState, useRef, useEffect } from "react";
import Dropzone from "@/components/Dropzone";
import { Download, Crop, Maximize, X, RefreshCw, Layers } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { downloadBlob, isMobileDevice } from "@/utils/download";

const ASPECT_RATIOS = [
  { name: "Free", value: NaN },
  { name: "1:1 Square", value: 1 },
  { name: "4:3 Classic", value: 4/3 },
  { name: "16:9 Widescreen", value: 16/9 },
  { name: "3:2 Photo", value: 3/2 },
  { name: "Instagram Story", value: 9/16 },
];

export default function ImageCropperInterface() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState(ASPECT_RATIOS[0]);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isProcessing, setIsProcessing] = useState(false);
  const [initialBaseSize, setInitialBaseSize] = useState({ w: 0, h: 0 });
  
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [selectedFile]);

  useEffect(() => {
    if (!previewUrl || !containerRef.current) return;
    
    const img = new Image();
    img.src = previewUrl;
    img.onload = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const containerRatio = rect.width / rect.height;
      
      let w, h;
      if (imgRatio > containerRatio) {
        w = rect.width;
        h = w / imgRatio;
      } else {
        h = rect.height;
        w = h * imgRatio;
      }
      setInitialBaseSize({ w, h });
    };
  }, [previewUrl]);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  const handleExport = async () => {
    if (!previewUrl || !containerRef.current || !selectedFile) return;
    setIsProcessing(true);

    try {
      const containerRect = containerRef.current.getBoundingClientRect();
      const imgElement = containerRef.current.querySelector("img");
      if (!imgElement) return;
      const imgRect = imgElement.getBoundingClientRect();

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const originalImg = new Image();
      originalImg.src = previewUrl;
      await new Promise((resolve) => { originalImg.onload = resolve; });

      const scaleX = originalImg.naturalWidth / imgRect.width;
      const scaleY = originalImg.naturalHeight / imgRect.height;

      const sx = (containerRect.left - imgRect.left) * scaleX;
      const sy = (containerRect.top - imgRect.top) * scaleY;
      const sw = containerRect.width * scaleX;
      const sh = containerRect.height * scaleY;

      canvas.width = sw;
      canvas.height = sh;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(originalImg, sx, sy, sw, sh, 0, 0, sw, sh);

      canvas.toBlob(async (blob) => {
        if (blob) {
          await downloadBlob(blob, `cropped-${selectedFile.name || 'image'}.png`);
        } else {
          alert("Export failed. Please try again.");
        }
        setIsProcessing(false);
      }, 'image/png');
    } catch (error) {
      console.error(error);
      alert("Export failed. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-4xl p-2 shadow-2xl border border-slate-100 dark:border-slate-800 text-left">
      <AnimatePresence mode="wait">
        {!selectedFile ? (
          <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Dropzone onFileSelect={handleFileSelect} label="Upload Image to Crop" />
          </motion.div>
        ) : (
          <motion.div key="interface" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div 
                  ref={containerRef}
                  className="relative rounded-3xl overflow-hidden bg-slate-50 dark:bg-slate-800 flex items-center justify-center border-2 border-slate-100 dark:border-slate-800 cursor-move shadow-inner"
                  style={{ 
                    aspectRatio: isNaN(aspectRatio.value) ? '4 / 3' : `${aspectRatio.value}`,
                    width: '100%',
                    maxWidth: '450px',
                    margin: '0 auto'
                  }}
                  onMouseDown={(e) => {
                    const startX = e.clientX - offset.x;
                    const startY = e.clientY - offset.y;
                    const onMouseMove = (moveEvent: MouseEvent) => {
                      setOffset({ x: moveEvent.clientX - startX, y: moveEvent.clientY - startY });
                    };
                    const onMouseUp = () => {
                      window.removeEventListener("mousemove", onMouseMove);
                      window.removeEventListener("mouseup", onMouseUp);
                    };
                    window.addEventListener("mousemove", onMouseMove);
                    window.addEventListener("mouseup", onMouseUp);
                  }}
                  onTouchStart={(e) => {
                    const touch = e.touches[0];
                    const startX = touch.clientX - offset.x;
                    const startY = touch.clientY - offset.y;
                    const onTouchMove = (moveEvent: TouchEvent) => {
                      const t = moveEvent.touches[0];
                      setOffset({ x: t.clientX - startX, y: t.clientY - startY });
                    };
                    const onTouchEnd = () => {
                      window.removeEventListener("touchmove", onTouchMove);
                      window.removeEventListener("touchend", onTouchEnd);
                    };
                    window.addEventListener("touchmove", onTouchMove, { passive: false });
                    window.addEventListener("touchend", onTouchEnd);
                  }}
                >
                  {previewUrl && (
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      draggable={false}
                      className="max-w-none origin-center"
                      style={{ 
                        width: initialBaseSize.w > 0 ? `${initialBaseSize.w}px` : 'auto',
                        height: initialBaseSize.h > 0 ? `${initialBaseSize.h}px` : 'auto',
                        transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
                        transition: 'none'
                      }}
                    />
                  )}
                  {/* Aspect Ratio Overlay */}
                  <div className="absolute inset-0 border-2 border-white/50 border-dashed pointer-events-none" />
                  
                  <button onClick={() => setSelectedFile(null)} className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-xl text-slate-500 hover:text-red-500 transition-colors shadow-lg z-10">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Zoom</span>
                  <input 
                    type="range" min="0.1" max="5" step="0.1" value={zoom}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    className="flex-grow h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <span className="text-xs font-black text-primary">{Math.round(zoom * 100)}%</span>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-display font-black text-slate-900 dark:text-white mb-6">1. Aspect Ratio</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                    {ASPECT_RATIOS.map((r) => (
                      <button
                        key={r.name}
                        onClick={() => {
                          setAspectRatio(r);
                          setZoom(1);
                          setOffset({ x: 0, y: 0 });
                        }}
                        className={`p-4 rounded-2xl border-2 text-left transition-all ${aspectRatio.name === r.name ? "border-primary bg-primary/5 text-primary" : "border-slate-50 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-200"}`}
                      >
                        <p className="font-bold text-xs truncate">{r.name}</p>
                        <Layers className={`w-4 h-4 mt-2 opacity-50 ${aspectRatio.name === r.name ? 'text-primary opacity-100' : ''}`} />
                      </button>
                    ))}
                  </div>

                  <h3 className="text-2xl font-display font-black text-slate-900 dark:text-white mb-6">2. Finish Editing</h3>
                  <button 
                    onClick={handleExport} 
                    disabled={isProcessing}
                    className="w-full py-5 bg-primary text-white rounded-3xl font-black text-lg sm:text-xl shadow-xl shadow-primary/20 hover:bg-primary-dark hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isProcessing ? <RefreshCw className="animate-spin w-6 h-6" /> : <Download className="w-6 h-6" />}
                    {isProcessing ? "Processing..." : "Download Cropped Image"}
                  </button>
                  <p className="text-xs text-slate-400 mt-4 text-center italic">Tip: Use the slider to zoom and drag the image to frame your subject perfectly.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
