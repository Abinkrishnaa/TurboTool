"use client";

import React, { useState, useRef } from 'react';
import { FileCode, Download, ArrowRight, Shield, Zap, FileCheck, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { API_ENDPOINTS } from '@/utils/apiConfig';

export default function WordToPdfInterface() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const processingRef = useRef(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const ext = selectedFile.name.split('.').pop()?.toLowerCase();
      if (!['docx', 'doc'].includes(ext || '')) {
        setError('Please select a Word document (.docx or .doc)');
        return;
      }
      if (selectedFile.size > 50 * 1024 * 1024) {
        setError('File size must be less than 50MB');
        return;
      }
      setFile(selectedFile);
      setError(null);
      setIsComplete(false);
      setProgress(0);
    }
  };

  const processFile = async () => {
    if (!file || processingRef.current) return;
    
    processingRef.current = true;
    setIsProcessing(true);
    setError(null);
    setProgress(10);

    try {
      const formData = new FormData();
      formData.append('file', file);

      setProgress(30);

      const response = await fetch(API_ENDPOINTS.wordToPdf, {
        method: 'POST',
        body: formData,
      });

      setProgress(70);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Conversion failed' }));
        throw new Error(errorData.detail || `Server error: ${response.status}`);
      }

      setProgress(90);

      // Get the PDF blob and trigger download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name.replace('.docx', '.pdf').replace('.doc', '.pdf');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      setProgress(100);
      setIsComplete(true);
    } catch (err: any) {
      console.error('Word to PDF Conversion Error:', err);
      setError(err.message || 'Failed to convert Word document. Please try again.');
    } finally {
      setIsProcessing(false);
      processingRef.current = false;
    }
  };

  const reset = () => {
    setFile(null);
    setIsComplete(false);
    setError(null);
    setProgress(0);
    processingRef.current = false;
  };

  return (
    <div className="space-y-8">
      {!file && !isComplete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center hover:border-slate-300 transition-colors"
        >
          <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FileCode className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Upload your Word Document</h3>
          <p className="text-sm text-slate-500 mb-8 max-w-xs mx-auto">
            Drag and drop your DOCX file here or click to browse. Your file will be converted using our server-side engine.
          </p>
          <label className="inline-flex items-center px-6 py-3 bg-orange-600 text-white rounded-full text-sm font-bold cursor-pointer hover:bg-orange-700 transition-all active:scale-95 shadow-lg shadow-orange-600/20">
            Select Word File
            <input 
              type="file" 
              className="hidden" 
              accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
              onChange={handleFileChange} 
            />
          </label>
        </motion.div>
      )}

      {file && !isComplete && (
        <div className="space-y-6">
          <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-lg border border-slate-200 flex items-center justify-center">
                <FileCode className="w-6 h-6 text-slate-900" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate pr-2">{file.name}</h4>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                  {(file.size / 1024 / 1024).toFixed(2)} MB • READY
                </p>
              </div>
            </div>
            <button 
              onClick={reset}
              className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors"
            >
              Remove
            </button>
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

          <button
            onClick={processFile}
            disabled={isProcessing}
            className="w-full py-4 bg-orange-600 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-3 hover:bg-orange-700 transition-all active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-orange-600/20"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Converting...
              </>
            ) : (
              <>
                Convert Word to PDF
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {isProcessing && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="space-y-2"
            >
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-orange-600"
                />
              </div>
              <p className="text-[10px] text-slate-400 text-center font-bold uppercase tracking-widest">
                Converting: {progress}%
              </p>
            </motion.div>
          )}
        </div>
      )}

      {isComplete && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-8 sm:p-12 bg-white dark:bg-slate-900 rounded-3xl border-2 border-green-500 shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
        >
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileCheck className="w-10 h-10 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Conversion Successful!</h3>
          <p className="text-sm text-slate-500 mb-8">Your PDF file has been downloaded.</p>
          
          <div className="flex flex-col gap-4">
            <button 
              onClick={processFile}
              className="w-full py-4 bg-orange-600 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-3 hover:bg-orange-700 transition-all active:scale-[0.98] shadow-lg shadow-orange-600/20"
            >
              <Download className="w-4 h-4" />
              Download Again
            </button>
            <button 
              onClick={reset}
              className="text-xs font-bold text-slate-400 hover:text-[#111] dark:hover:text-white transition-colors"
            >
              Convert another file
            </button>
          </div>
        </motion.div>
      )}

      {/* Trust Badges */}
      <div className="grid grid-cols-2 gap-4 mt-12">
        <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col items-center text-center">
          <Shield className="w-5 h-5 text-slate-400 mb-2" />
          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest leading-none">Secure Processing</span>
          <span className="text-[9px] text-slate-400 mt-1">Processed on secure servers</span>
        </div>
        <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col items-center text-center">
          <Zap className="w-5 h-5 text-slate-400 mb-2" />
          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest leading-none">High Quality</span>
          <span className="text-[9px] text-slate-400 mt-1">Formatting fully preserved</span>
        </div>
      </div>
    </div>
  );
}
