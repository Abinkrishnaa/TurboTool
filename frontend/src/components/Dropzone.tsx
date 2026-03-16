"use client";

import { useState, useCallback } from "react";
import { Upload, X, FileImage, ShieldCheck, Zap } from "lucide-react";
import { useDropzone } from "react-dropzone";

interface DropzoneProps {
  onFileSelect: (file: File) => void;
  accept?: Record<string, string[]>;
  maxSize?: number;
  label?: string;
}

export default function Dropzone({ 
  onFileSelect, 
  accept = { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
  maxSize = 10 * 1024 * 1024, // 10MB
  label = "Select or Drop an Image"
}: DropzoneProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple: false
  });

  return (
    <div 
      {...getRootProps()} 
      className={`relative group cursor-pointer transition-all duration-300 ${
        isDragActive ? "scale-[0.98]" : ""
      }`}
    >
      <div className={`absolute inset-0 bg-primary/5 rounded-4xl blur-2xl group-hover:bg-primary/10 transition-colors ${
        isDragActive ? "bg-primary/20" : ""
      }`} />
      
      <div className={`relative flex flex-col items-center justify-center min-h-[400px] bg-white dark:bg-slate-900 border-3 border-dashed rounded-4xl p-12 text-center transition-all ${
        isDragActive 
          ? "border-primary bg-primary/5 ring-4 ring-primary/10" 
          : "border-slate-100 dark:border-slate-800 hover:border-primary/50"
      }`}>
        <input {...getInputProps()} />
        
        <div className={`w-24 h-24 rounded-3xl mb-8 flex items-center justify-center transition-all duration-500 ${
          isDragActive 
            ? "bg-primary text-white scale-110 rotate-12" 
            : "bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary group-hover:scale-110"
        }`}>
          <Upload className="w-10 h-10" />
        </div>
        
        <h3 className="text-3xl font-display font-black text-slate-900 dark:text-white mb-4 tracking-tight">
          {isDragActive ? "Drop it here!" : label}
        </h3>
        
        <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-10 text-lg leading-relaxed">
          Drag and drop your file here, or click to browse. Safe, secure, and stays in your browser.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>100% Secure</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Instant Processing</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
            <FileImage className="w-4 h-4 text-blue-500" />
            <span>PNG, JPG, WEBP</span>
          </div>
        </div>
      </div>
    </div>
  );
}
