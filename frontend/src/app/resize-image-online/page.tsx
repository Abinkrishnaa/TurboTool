"use client";

import { useState, useEffect } from "react";
import { TOOLS } from "@/constants/tools";
import ToolLayout from "@/components/ToolLayout";
import Dropzone from "@/components/Dropzone";
import { Download, X, Maximize, RefreshCw, AlertCircle, Settings2, Lock, Unlock, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import WorkflowNavigator from "@/components/WorkflowNavigator";
import { getPendingFile, clearPendingFile } from "@/utils/filePersist";
import { downloadBlob } from "@/utils/download";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import EducationalContent from "@/components/EducationalContent";

function ImageResizerContent() {
  const tool = TOOLS.find(t => t.id === "resizer")!;
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
  const [lockAspectRatio, setLockAspectRatio] = useState(true);
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const searchParams = useSearchParams();
  const [resizedFile, setResizedFile] = useState<File | null>(null);

  // Handle AI Auto-Actions and File Loading
  useEffect(() => {
    const initWorkflow = async () => {
      const autoProcess = searchParams.get("autoProcess");
      const pendingFile = await getPendingFile();
      if (pendingFile) {
        handleFileSelect(pendingFile);
        clearPendingFile();
      }
    };
    initWorkflow();
  }, [searchParams]);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://TurboTool.com" },
      { "@type": "ListItem", "position": 2, "name": "Image Resizer", "item": "https://TurboTool.com/resize-image-online" }
    ]
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setResizedFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    const img = new Image();
    img.src = url;
    img.onload = () => {
      setDimensions({ width: img.width, height: img.height });
      setOriginalDimensions({ width: img.width, height: img.height });
      setStatus("idle");
    };
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const width = parseInt(e.target.value) || 0;
    if (lockAspectRatio) {
      const ratio = originalDimensions.height / originalDimensions.width;
      setDimensions({ width, height: Math.round(width * ratio) });
    } else {
      setDimensions({ ...dimensions, width });
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const height = parseInt(e.target.value) || 0;
    if (lockAspectRatio) {
      const ratio = originalDimensions.width / originalDimensions.height;
      setDimensions({ width: Math.round(height * ratio), height });
    } else {
      setDimensions({ ...dimensions, height });
    }
  };

  const resizeImage = () => {
    if (!selectedFile || !previewUrl) return;
    setStatus("processing");

    const img = new Image();
    img.src = previewUrl;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = dimensions.width;
      canvas.height = dimensions.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setStatus("error");
        return;
      }
      ctx.drawImage(img, 0, 0, dimensions.width, dimensions.height);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], selectedFile.name, { type: selectedFile.type });
          setResizedFile(file);
          setStatus("done");
        } else {
          setStatus("error");
        }
      }, selectedFile.type, 0.95);
    };
    img.onerror = () => {
      setStatus("error");
    };
  };

  const downloadImage = async () => {
    if (!resizedFile || !selectedFile) return;
    await downloadBlob(resizedFile, `resized-${selectedFile.name}`);
  };

  const reset = () => {
    setSelectedFile(null);
    setDimensions({ width: 0, height: 0 });
    setOriginalDimensions({ width: 0, height: 0 });
    setStatus("idle");
  };

  const howToSteps = [
    { title: "Upload Image", description: "Select or drag and drop your image into the workspace." },
    { title: "Set Dimensions", description: "Enter your desired width or height. Aspect ratio is locked by default." },
    { title: "Download", description: "Click 'Resize Now' and download your perfectly sized image instantly." }
  ];

  const faqs = [
    { question: "Is resizing free?", answer: "Yes, TurboTool provides unlimited image resizing at no cost." },
    { question: "Will my image lose quality?", answer: "Shrinking an image and then enlarging it may result in loss of clarity. We recommend resizing from high-resolution originals." },
    { question: "Does it work in my browser?", answer: "Yes, everything happens locally using the Canvas API. Your files are never uploaded." },
    { question: "Can I resize for Instagram?", answer: "Absolutely! Use our presets or manual input for 1080x1080 (Post) or 1080x1920 (Story)." }
  ];

  const benefits = [
    "Fast, browser-based resizing with no wait times.",
    "Lock aspect ratio to prevent image distortion.",
    "No registration or personal data required.",
    "Preset sizes for popular social media platforms."
  ];

  return (
    <ToolLayout 
      tool={tool} 
      howToSteps={howToSteps} 
      faqs={faqs} 
      benefits={benefits}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <Breadcrumbs items={[{ label: "Image Resizer" }]} />

      <div className="bg-white dark:bg-slate-900 rounded-4xl p-2 shadow-2xl border border-slate-100 dark:border-slate-800 hover-shadow transition-all duration-500">
        <AnimatePresence mode="wait">
          {!selectedFile ? (
            <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Dropzone onFileSelect={handleFileSelect} label="Upload Image to Resize" />
            </motion.div>
          ) : (
            <motion.div key="interface" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-12">
                <div className="w-full md:w-1/2">
                  <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-50 dark:bg-slate-800 flex items-center justify-center border-2 border-slate-100 dark:border-slate-800 shadow-inner">
                    <img src={previewUrl || ""} alt="Preview" className="max-w-full max-h-full object-contain" />
                    <button onClick={reset} className="absolute top-4 right-4 p-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-xl text-slate-500 hover:text-red-500 transition-colors shadow-lg">
                      <X className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/50 backdrop-blur-md text-white rounded-lg text-xs font-bold uppercase tracking-widest">
                      {originalDimensions.width} x {originalDimensions.height}
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-1/2 space-y-8">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                        <Settings2 className="w-5 h-5 text-primary" />
                        <span>Resize Settings</span>
                      </div>
                      <button 
                        onClick={() => setLockAspectRatio(!lockAspectRatio)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          lockAspectRatio ? "bg-primary/10 text-primary" : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {lockAspectRatio ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                        {lockAspectRatio ? "Aspect Ratio Locked" : "Aspect Ratio Unlocked"}
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Width (px)</label>
                        <input 
                          type="number" 
                          value={dimensions.width} 
                          onChange={handleWidthChange}
                          className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-xl p-3 font-bold text-lg focus:outline-none focus:border-primary transition-all shadow-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Height (px)</label>
                        <input 
                          type="number" 
                          value={dimensions.height} 
                          onChange={handleHeightChange}
                          className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-xl p-3 font-bold text-lg focus:outline-none focus:border-primary transition-all shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => { setDimensions({ width: 1080, height: 1080 }); setLockAspectRatio(false); }} className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 text-slate-500 rounded-lg text-xs font-bold hover:bg-primary/10 hover:text-primary transition-all border border-transparent hover:border-primary/20">Instagram Post</button>
                      <button onClick={() => { setDimensions({ width: 1080, height: 1920 }); setLockAspectRatio(false); }} className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 text-slate-500 rounded-lg text-xs font-bold hover:bg-primary/10 hover:text-primary transition-all border border-transparent hover:border-primary/20">Instagram Story</button>
                      <button onClick={() => { setDimensions({ width: 1200, height: 630 }); setLockAspectRatio(false); }} className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 text-slate-500 rounded-lg text-xs font-bold hover:bg-primary/10 hover:text-primary transition-all border border-transparent hover:border-primary/20">Facebook Post</button>
                      <button onClick={() => { setDimensions({ width: 1920, height: 1080 }); setLockAspectRatio(false); }} className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 text-slate-500 rounded-lg text-xs font-bold hover:bg-primary/10 hover:text-primary transition-all border border-transparent hover:border-primary/20">Full HD</button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {status === "idle" && (
                      <button onClick={resizeImage} className="w-full py-5 bg-primary text-white rounded-2xl font-black text-xl shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all flex items-center justify-center gap-3 active:scale-95">
                        <Maximize className="w-6 h-6" />
                        <span>Resize Now</span>
                      </button>
                    )}

                    {status === "processing" && (
                      <div className="flex flex-col items-center gap-4 py-4">
                        <RefreshCw className="w-10 h-10 text-primary animate-spin" />
                        <p className="font-bold text-slate-500">Processing Pixels...</p>
                      </div>
                    )}

                    {status === "done" && (
                      <div className="space-y-4">
                        <button onClick={downloadImage} className="w-full py-5 bg-emerald-500 text-white rounded-2xl font-black text-xl shadow-xl shadow-emerald-500/20 hover:bg-emerald-600 transition-all flex items-center justify-center gap-3 active:scale-95">
                          <Download className="w-6 h-6" />
                          <span>Download Image</span>
                        </button>
                        <WorkflowNavigator currentToolId="resizer" activeFile={resizedFile} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <EducationalContent 
        title="Precise Image Resizing for Any Platform"
        content={[
          "Images that are too large slow down your website, while those that are too small look blurry. Finding the <strong>perfect dimensions</strong> is critical for professional design and web optimization. Our <strong>Online Image Resizer</strong> gives you pixel-perfect control over your photos.",
          "We've included built-in presets for the most popular social media formats, from Instagram Posts to Full HD wallpapers. If you need a custom size, simply type in your dimensions. Our <strong>Smart Aspect Ratio Lock</strong> ensures your images never look stretched or distorted.",
          "Safety is our priority. By performing all calculations in your browser, we ensure that your private photos are never uploaded or stored. It's fast, free, and completely secure."
        ]}
        benefits={[
          "Aspect Ratio Lock: Keep your images proportional and professional.",
          "Social Presets: One-click resizing for IG and Facebook.",
          "Instant Performance: No server lag, just lightning-fast results.",
          "Zero Data Leakage: Processing happens entirely on-device."
        ]}
        faqs={[
          {
            question: "Does resizing images for the web improve SEO?",
            answer: "Yes! Using correctly sized images significantly improves page load speed, which is a key ranking factor for Google Search (Core Web Vitals)."
          },
          {
            question: "Is there a limit on the number of images I can resize?",
            answer: "No, TurboTools offers unlimited free image resizing. You can use it as often as you need for your personal or professional projects."
          }
        ]}
      />
    </ToolLayout>
  );
}

export default function ImageResizerPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400 font-bold uppercase tracking-widest">Loading Resizer...</div>}>
      <ImageResizerContent />
    </Suspense>
  );
}
