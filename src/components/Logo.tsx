"use client";

import Image from "next/image";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "default" | "large" | "massive";
  variant?: "default" | "grayscale";
}

export default function Logo({ className = "", showText = true, size = "default", variant = "default" }: LogoProps) {
  const sizeClasses = {
    default: {
      img: "w-12 h-12 md:w-14 md:h-14",
      text: "text-2xl md:text-3xl",
      subtext: "text-[10px]"
    },
    large: {
      img: "w-16 h-16 md:w-20 md:h-20",
      text: "text-4xl md:text-5xl",
      subtext: "text-xs"
    },
    massive: {
      img: "w-24 h-24 md:w-32 md:h-32",
      text: "text-6xl md:text-8xl",
      subtext: "text-sm"
    }
  };

  const currentSize = sizeClasses[size];
  const isGrayscale = variant === "grayscale";

  return (
    <div className={`flex items-center gap-4 group transition-all duration-300 ${className}`}>
      <div className={`relative flex items-center justify-center ${currentSize.img} transition-all duration-300`}>
        <Image
          src="/brand/logo.png"
          alt="TurboTool Logo"
          width={128}
          height={128}
          className={`object-contain w-full h-full transform group-hover:scale-105 transition-transform duration-500 ${
            isGrayscale ? "grayscale opacity-50 contrast-125" : "mix-blend-multiply dark:mix-blend-screen"
          }`}
        />
        {!isGrayscale && (
          <div className="absolute -inset-4 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        )}
      </div>
      {showText && (
        <div className="flex flex-col leading-tight">
          <span className={`${currentSize.text} font-display font-black tracking-tighter ${
            isGrayscale ? "text-slate-400 dark:text-slate-500" : "text-[#111] dark:text-white"
          }`}>
            Turbo<span className={isGrayscale ? "" : "text-indigo-600 dark:text-indigo-400"}>Tool</span>
          </span>
          <span className={`${currentSize.subtext} font-bold uppercase tracking-[0.4em] text-slate-400 mt-1`}>
            {isGrayscale ? "Speed & Privacy" : "Speed & Efficiency"}
          </span>
        </div>
      )}
    </div>
  );
}
