"use client";

import React, { useState } from 'react';
import { FileCode, Download, ArrowRight, Shield, Zap, FileCheck, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import jsPDF from 'jspdf';

export default function WordToPdfInterface() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
      setIsComplete(false);
      setPdfBlob(null);
    }
  };

  const processFile = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError(null);

    try {
      // Load dependencies
      const mammoth = await import("mammoth");
      const html2canvas = (await import("html2canvas")).default;
      const arrayBuffer = await file.arrayBuffer();
      
      const result = await mammoth.convertToHtml({ arrayBuffer });
      const htmlContent = result.value;

      if (!htmlContent || htmlContent.trim() === "") {
        throw new Error("No content found in Word document.");
      }

      // Create a hidden iframe for isolated rendering
      const iframe = document.createElement("iframe");
      iframe.style.position = "fixed";
      iframe.style.left = "-9999px";
      iframe.style.top = "0";
      iframe.style.width = "794px";
      iframe.style.height = "100%";
      iframe.style.border = "none";
      document.body.appendChild(iframe);

      const iframeWindow = iframe.contentWindow;
      const iframeDoc = iframe.contentDocument || iframeWindow?.document;
      if (!iframeDoc || !iframeWindow) throw new Error("Could not initialize rendering sandbox.");

      iframeDoc.open();
      iframeDoc.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
            body { 
              margin: 0; 
              padding: 60px; 
              background: white !important; 
              color: #000 !important;
              width: 674px; /* A4 width minus padding */
              font-family: 'Inter', 'Arial', sans-serif;
              line-height: 1.6;
              font-size: 14px;
              word-wrap: break-word;
            }
            img { max-width: 100%; height: auto; margin: 15px 0; display: block; }
            table { width: 100%; border-collapse: collapse; margin: 15px 0; }
            td, th { border: 1px solid #ddd; padding: 10px; text-align: left; }
            p { margin-bottom: 12px; }
            h1, h2, h3 { 
              margin-top: 25px; 
              margin-bottom: 15px; 
              font-weight: 800;
              line-height: 1.2;
              color: #000;
            }
          </style>
        </head>
        <body>
          <div id="render-target">${htmlContent}</div>
        </body>
        </html>
      `);
      iframeDoc.close();

      // Wait for font and images to load in the iframe
      await new Promise(r => setTimeout(r, 600));

      // SHIELD: Temporarily disable main document stylesheets to prevent html2canvas from scanning them
      const mainStyles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]')) as (HTMLStyleElement | HTMLLinkElement)[];
      const previousStates = mainStyles.map(s => s.disabled);
      mainStyles.forEach(s => s.disabled = true);

      // Create PDF from isolated iframe content
      const doc = new jsPDF({
        orientation: 'p',
        unit: 'px',
        format: 'a4',
        hotfixes: ['px_scaling']
      });

      await new Promise<void>((resolve, reject) => {
        doc.html(iframeDoc.body, {
          callback: (doc) => {
            try {
              // RESTORE: Re-enable main document stylesheets
              mainStyles.forEach((s, i) => s.disabled = previousStates[i]);
              
              const blob = doc.output('blob');
              setPdfBlob(blob);
              setIsComplete(true);
              document.body.removeChild(iframe);
              resolve();
            } catch (err) {
              // Ensure we restore even on error
              mainStyles.forEach((s, i) => s.disabled = previousStates[i]);
              reject(err);
            }
          },
          x: 0,
          y: 0,
          width: 794,
          windowWidth: 794,
          html2canvas: {
            scale: 1,
            useCORS: true,
            logging: false,
            letterRendering: true,
            allowTaint: false,
            backgroundColor: '#ffffff'
          }
        });
      });

    } catch (err: any) {
      console.error("Word Conversion Error:", err);
      setError(err.message || "Failed to convert Word document.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!pdfBlob || !file) return;
    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name.replace('.docx', '').replace('.doc', '') + '.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
            Drag and drop your DOCX file here. Files are processed locally for maximum privacy.
          </p>
          <label className="inline-flex items-center px-6 py-3 bg-orange-600 text-white rounded-full text-sm font-bold cursor-pointer hover:bg-orange-700 transition-all active:scale-95 shadow-lg shadow-orange-600/20">
            Select Word File
            <input type="file" className="hidden" accept=".docx" onChange={handleFileChange} />
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
              onClick={() => setFile(null)}
              className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors"
            >
              Remove
            </button>
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-xs font-bold border border-red-100">
              {error}
            </div>
          )}

          <button
            onClick={processFile}
            disabled={isProcessing}
            className="w-full py-4 bg-orange-600 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-3 hover:bg-orange-700 transition-all active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-orange-600/20"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing Word Assets...
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
                  animate={{ width: "100%" }}
                  transition={{ duration: 3 }}
                  className="h-full bg-orange-600"
                />
              </div>
              <p className="text-[10px] text-slate-400 text-center font-bold uppercase tracking-widest">
                AI Formatting: Aligning elements...
              </p>
            </motion.div>
          )}
        </div>
      )}

      {isComplete && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-12 bg-white dark:bg-slate-900 rounded-2xl border-2 border-emerald-500 shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
        >
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Zap className="w-10 h-10 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Word to PDF Ready!</h3>
          <p className="text-sm text-slate-500 mb-8">Securely converted in your browser.</p>
          
          <div className="flex flex-col gap-4">
            <button 
              onClick={handleDownload}
              className="w-full py-4 bg-orange-600 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-3 hover:bg-orange-700 transition-all active:scale-[0.98] shadow-lg shadow-orange-600/20"
            >
              <Download className="w-4 h-4" />
              Download PDF Document
            </button>
            <button 
              onClick={() => { setFile(null); setIsComplete(false); }}
              className="text-xs font-bold text-slate-400 hover:text-[#111] transition-colors"
            >
              Convert another file
            </button>
          </div>
        </motion.div>
      )}

      {/* Security Check */}
      <div className="grid grid-cols-2 gap-4 mt-12">
        <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col items-center text-center">
          <Shield className="w-5 h-5 text-slate-400 mb-2" />
          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest leading-none">Safe & Private</span>
          <span className="text-[9px] text-slate-400 mt-1">Files never leave browser</span>
        </div>
        <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col items-center text-center">
          <Zap className="w-5 h-5 text-slate-400 mb-2" />
          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest leading-none">Fast Render</span>
          <span className="text-[9px] text-slate-400 mt-1">High-quality PDF output</span>
        </div>
      </div>
    </div>
  );
}
