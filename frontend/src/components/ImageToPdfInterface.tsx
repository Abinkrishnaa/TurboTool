"use client";

import { useState } from "react";
import Dropzone from "@/components/Dropzone";
import { Download, X, FileType, AlertCircle, FilePlus, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { downloadBlob } from "@/utils/download";
import { isHEIC, convertHeicToJpeg } from "@/utils/heicUtils";
// jsPDF will be imported dynamically inside the function

export default function ImageToPdfInterface() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [convertingIndex, setConvertingIndex] = useState<number | null>(null);

  const handleFileSelect = async (file: File) => {
    let processedFile = file;
    
    if (isHEIC(file)) {
      setConvertingIndex(selectedFiles.length);
      try {
        processedFile = await convertHeicToJpeg(file);
      } catch (error) {
        console.error("HEIC conversion failed:", error);
        alert("Failed to convert HEIC image. Please try a different format.");
        setConvertingIndex(null);
        return;
      }
      setConvertingIndex(null);
    }
    
    setSelectedFiles(prev => [...prev, processedFile]);
    setStatus("idle");
    setResultBlob(null);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setResultBlob(null);
    setStatus("idle");
  };

  const convertToPdf = async () => {
    if (selectedFiles.length === 0) return;
    setStatus("processing");

    try {
      const { jsPDF } = await import("jspdf");
      const pdf = new jsPDF();
      
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        
        // Convert HEIC if needed
        let fileToProcess = file;
        if (isHEIC(file)) {
          try {
            fileToProcess = await convertHeicToJpeg(file);
          } catch (error) {
            console.error("HEIC conversion failed:", error);
            continue;
          }
        }
        
        const imgData = await readFileAsDataURL(fileToProcess);
        
        const img = new Image();
        img.src = imgData;
        await new Promise((resolve) => { img.onload = resolve; });

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imgRatio = img.width / img.height;
        const pageRatio = pageWidth / pageHeight;

        let finalWidth, finalHeight;
        if (imgRatio > pageRatio) {
          finalWidth = pageWidth - 20;
          finalHeight = finalWidth / imgRatio;
        } else {
          finalHeight = pageHeight - 20;
          finalWidth = finalHeight * imgRatio;
        }

        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, "JPEG", (pageWidth - finalWidth) / 2, (pageHeight - finalHeight) / 2, finalWidth, finalHeight);
      }

      const blob = pdf.output("blob");
      setResultBlob(blob);
      setStatus("done");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const downloadPdf = async () => {
    if (!resultBlob) return;
    await downloadBlob(resultBlob, `converted-images.pdf`);
  };

  const reset = () => {
    setSelectedFiles([]);
    setResultBlob(null);
    setStatus("idle");
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-4xl p-2 shadow-2xl border border-slate-100 dark:border-slate-800 text-left">
      <div className="p-8 md:p-12 space-y-12">
        <div className={`${selectedFiles.length > 0 ? "max-w-xl mx-auto" : ""}`}>
          <Dropzone onFileSelect={handleFileSelect} label="Add Image to PDF" />
        </div>

        <AnimatePresence>
          {selectedFiles.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {selectedFiles.map((file, index) => (
                  <motion.div key={index} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="relative group aspect-[3/4] rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800">
                    <img src={URL.createObjectURL(file)} className="w-full h-full object-cover" alt="Selected" />
                    <button onClick={() => removeFile(index)} className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
                <button 
                  onClick={() => (document.querySelector('input[type="file"]') as HTMLInputElement)?.click()}
                  className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl hover:border-primary/50 hover:bg-primary/5 transition-all text-slate-400 hover:text-primary h-full min-h-[160px]"
                >
                  <FilePlus className="w-8 h-8 mb-2" />
                  <span className="text-xs font-bold uppercase tracking-wider">Add More</span>
                </button>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
                    <FileType className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="font-display font-black text-2xl text-slate-900 dark:text-white">{selectedFiles.length} Selected</p>
                    <p className="text-slate-400 text-sm">Target: Portrait PDF</p>
                  </div>
                </div>

                <div className="w-full md:w-auto">
                  {status === "idle" && (
                    <button onClick={convertToPdf} className="w-full md:w-auto px-12 py-5 bg-primary text-white rounded-2xl font-black text-xl shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all">Convert to PDF</button>
                  )}
                  {status === "processing" && (
                    <div className="flex items-center gap-4 px-12 py-5 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-2xl font-black text-xl">
                      <RefreshCw className="w-6 h-6 animate-spin" />
                      <span>Generating...</span>
                    </div>
                  )}
                  {status === "done" && (
                    <div className="flex gap-4">
                      <button onClick={downloadPdf} className="px-12 py-5 bg-emerald-500 text-white rounded-2xl font-black text-xl shadow-xl shadow-emerald-500/20 hover:bg-emerald-600 transition-all flex items-center gap-3">
                        <Download className="w-6 h-6" />
                        <span>Download PDF</span>
                      </button>
                      <button onClick={reset} className="px-8 py-5 text-slate-400 hover:text-primary transition-colors font-bold">Resest</button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
