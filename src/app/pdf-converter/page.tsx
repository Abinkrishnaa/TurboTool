"use client";

import { useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { 
  FileStack, 
  FileType, 
  Image as ImageIcon, 
  CheckCircle2,
  ArrowRightLeft
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { TOOLS } from "@/constants/tools";
import { motion, AnimatePresence } from "framer-motion";

const ImageToPdfInterface = dynamic(() => import("@/components/ImageToPdfInterface"), { ssr: false });
const PDFToImageInterface = dynamic(() => import("@/components/PDFToImageInterface"), { ssr: false });

export default function UNIFIED_PDF_PAGE() {
  const [activeTab, setActiveTab] = useState<"img-to-pdf" | "pdf-to-img">("img-to-pdf");
  const tool = TOOLS.find(t => t.id === "pdf-converter")!;

  return (
    <DashboardLayout toolName="PDF / Image Service">
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        
        {/* Header Section */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-[2.5rem] bg-indigo-600/10 text-indigo-600 mb-4 shadow-inner">
            <FileStack className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Universal <span className="text-indigo-600">PDF Converter</span>
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            A single, powerful utility for all your PDF and Image conversion needs. Fast, private, and 100% browser-native.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
           <div className="bg-slate-100 dark:bg-slate-900 p-1.5 rounded-[2rem] flex items-center shadow-inner">
              <button 
                onClick={() => setActiveTab("img-to-pdf")}
                className={`flex items-center gap-3 px-8 py-4 rounded-[1.7rem] font-black text-sm transition-all duration-300 ${activeTab === "img-to-pdf" ? "bg-white dark:bg-slate-800 text-indigo-600 shadow-xl scale-105" : "text-slate-400 hover:text-slate-600"}`}
              >
                <FileType className="w-5 h-5" />
                <span>Images to PDF</span>
              </button>
              <div className="w-px h-8 bg-slate-200 dark:bg-slate-800 mx-2" />
              <button 
                onClick={() => setActiveTab("pdf-to-img")}
                className={`flex items-center gap-3 px-8 py-4 rounded-[1.7rem] font-black text-sm transition-all duration-300 ${activeTab === "pdf-to-img" ? "bg-white dark:bg-slate-800 text-indigo-600 shadow-xl scale-105" : "text-slate-400 hover:text-slate-600"}`}
              >
                <ImageIcon className="w-5 h-5" />
                <span>PDF to Images</span>
              </button>
           </div>
        </div>

        {/* Tool Area */}
        <div className="mb-24 min-h-[500px]">
           <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Suspense fallback={
                  <div className="w-full h-[400px] flex items-center justify-center bg-slate-50 dark:bg-slate-900 rounded-4xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                      <p className="text-slate-500 font-bold tracking-widest uppercase text-xs">Initializing Engine...</p>
                    </div>
                  </div>
                }>
                  {activeTab === "img-to-pdf" ? <ImageToPdfInterface /> : <PDFToImageInterface />}
                </Suspense>
              </motion.div>
           </AnimatePresence>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start border-t border-slate-100 dark:border-slate-800 pt-24">
           <div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">Why Use Our Unified PDF Service?</h2>
              <p className="text-lg text-slate-500 font-medium leading-relaxed mb-8">
                Most online tools force you to jump between multiple pages or even different websites for simple PDF tasks. TurboTools consolidates these workflows into a single high-performance interface.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                   <div className="w-10 h-10 rounded-xl bg-green-500/10 text-green-600 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-6 h-6" />
                   </div>
                   <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">Batch Processing</h4>
                      <p className="text-sm text-slate-500 font-medium italic">Convert dozens of images at once or extract entire PDF books in seconds.</p>
                   </div>
                </div>
                <div className="flex items-start gap-4">
                   <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                      <ArrowRightLeft className="w-6 h-6" />
                   </div>
                   <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">Seamless Workflow</h4>
                      <p className="text-sm text-slate-500 font-medium italic">Switch between conversion directions without reloading the page.</p>
                   </div>
                </div>
              </div>
           </div>
           
           <div className="bg-slate-50 dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-inner">
              <h3 className="text-xl font-black mb-6">Frequently Asked Questions</h3>
              <div className="space-y-6">
                 <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-2">Is there a file size limit?</h4>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">No strict limits! However, larger files depend on your browser's RAM capacity since everything runs locally.</p>
                 </div>
                 <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-2">Are my files stored online?</h4>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">Never. We use jsPDF and pdf.js to run 100% of the conversion logic inside your browser. Privacy is guaranteed.</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
