"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowLeftRight, Sparkles, X } from "lucide-react";

interface ComparisonProps {
  beforeUrl: string;
  afterUrl: string;
  beforeLabel?: string;
  afterLabel?: string;
  onReset?: () => void;
}

export default function ImageComparisonSlider({ 
  beforeUrl, 
  afterUrl, 
  beforeLabel = "Original", 
  afterLabel = "Optimized",
  onReset
}: ComparisonProps) {
  const [sliderPos, setSliderPos] = useState(afterUrl === beforeUrl ? 100 : 50);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (afterUrl !== beforeUrl) {
      setSliderPos(50);
    }
  }, [afterUrl, beforeUrl]);

  const handleMove = (e: React.MouseEvent | React.TouchEvent | any) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX : e.clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(0, Math.min(100, position)));
  };

  return (
    <div 
      ref={containerRef}
      className="relative min-h-[300px] sm:min-h-[400px] h-auto aspect-video rounded-3xl sm:rounded-[2.5rem] overflow-hidden bg-slate-100 dark:bg-slate-800 border border-white/50 dark:border-white/5 shadow-2xl cursor-col-resize select-none group"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      {/* "After" Image (Background) */}
      <img 
        src={afterUrl} 
        alt="After" 
        className="absolute inset-0 w-full h-full object-contain pointer-events-none"
      />

      {/* "Before" Image (Clipped) */}
      <div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <img 
          src={beforeUrl} 
          alt="Before" 
          className="absolute inset-0 w-full h-full object-contain"
        />
      </div>

      {/* Slider Line */}
      {afterUrl !== beforeUrl && (
        <div 
          className="absolute inset-y-0 w-1 bg-white shadow-[0_0_15px_rgba(0,0,0,0.3)] pointer-events-none flex items-center justify-center"
          style={{ left: `${sliderPos}%` }}
        >
           <div className="w-12 h-12 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-2xl border-4 border-white scroll-m-2">
              <ArrowLeftRight className="w-5 h-5 font-black" />
           </div>
        </div>
      )}

      {/* Controls */}
      {onReset && (
        <button 
          onClick={(e) => { e.stopPropagation(); onReset(); }}
          className="absolute top-6 right-6 w-10 h-10 glass rounded-2xl flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Labels */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-6 px-3 sm:px-4 py-1.5 sm:py-2 glass rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#111] dark:text-white pointer-events-none z-10">
         {beforeLabel}
      </div>
      
      {afterUrl !== beforeUrl && (
        <div className="absolute top-4 sm:top-6 right-16 sm:right-20 px-3 sm:px-4 py-1.5 sm:py-2 glass rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#111] dark:text-white pointer-events-none z-10">
           <div className="flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-yellow-500" />
              <span className="truncate max-w-[80px] sm:max-w-none">{afterLabel}</span>
           </div>
        </div>
      )}

      {/* Overlay Hint */}
      {afterUrl !== beforeUrl && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-black/40 backdrop-blur-md rounded-full text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase tracking-widest z-10">
           Slide to compare
        </div>
      )}
    </div>
  );
}
