"use client";

import { useState, useRef } from "react";
import { TOOLS } from "@/constants/tools";
import ToolLayout from "@/components/ToolLayout";
import Dropzone from "@/components/Dropzone";
import { Download, X, RefreshCw, AlertCircle, FileType, CheckCircle, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import Breadcrumbs from "@/components/Breadcrumbs";
import EducationalContent from "@/components/EducationalContent";

export default function ImageConverterPage() {
  const tool = TOOLS.find(t => t.id === "converter")!;
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [targetFormat, setTargetFormat] = useState("image/png");
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const formats = [
    { label: "PNG", value: "image/png" },
    { label: "JPG", value: "image/jpeg" },
    { label: "WEBP", value: "image/webp" },
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://TurboTool.com" },
      { "@type": "ListItem", "position": 2, "name": "Image Converter", "item": "https://TurboTool.com/png-to-jpg-converter" }
    ]
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));
    setStatus("idle");
    setResultUrl(null);
  };

  const convertImage = () => {
    if (!selectedFile || !canvasRef.current) return;
    setStatus("processing");

    const img = new Image();
    img.src = URL.createObjectURL(selectedFile);
    img.onload = () => {
      const canvas = canvasRef.current!;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      
      const convertedUrl = canvas.toDataURL(targetFormat);
      setResultUrl(convertedUrl);
      setStatus("done");
    };
    img.onerror = () => setStatus("error");
  };

  const downloadImage = () => {
    if (!resultUrl) return;
    const extension = targetFormat.split("/")[1];
    const link = document.createElement("a");
    link.href = resultUrl;
    link.download = `converted-${selectedFile?.name.split('.')[0]}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const reset = () => {
    setSelectedFile(null);
    setResultUrl(null);
    setStatus("idle");
  };

  const howToSteps = [
    { title: "Upload Image", description: "Select or drag and drop your image (JPG, PNG, or WEBP)." },
    { title: "Choose Format", description: "Select your desired target format from the options provided." },
    { title: "Convert & Download", description: "Click 'Convert Now' and save your file in the new format." }
  ];

  const faqs = [
    { question: "Is this converter free?", answer: "Yes, it is 100% free with no limits on the number of conversions." },
    { question: "Does it work for WEBP?", answer: "Absolutely! You can convert to and from PNG, JPG, and WEBP effortlessly." },
    { question: "Is my privacy protected?", answer: "Yes, all processing happens locally in your browser. No files are uploaded to any server." },
    { question: "Will I lose quality?", answer: "Converting between lossless formats (like PNG) or to modern formats (like WEBP) maintains excellent quality." }
  ];

  const benefits = [
    "Instant, browser-based conversion with no server delay.",
    "Support for modern formats like WEBP for better web performance.",
    "Completely private - your files stay on your machine.",
    "Clean and simple interface for fast results."
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
      
      <Breadcrumbs items={[{ label: "Image Converter" }]} />

      <div className="bg-white dark:bg-slate-900 rounded-4xl p-2 shadow-2xl border border-slate-100 dark:border-slate-800 hover-shadow transition-all duration-500">
        <AnimatePresence mode="wait">
          {!selectedFile ? (
            <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Dropzone onFileSelect={handleFileSelect} label="Upload Image to Convert" />
            </motion.div>
          ) : (
            <motion.div key="interface" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-12">
                <div className="w-full md:w-1/2">
                  <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-50 dark:bg-slate-800 flex items-center justify-center border-2 border-slate-100 dark:border-slate-800 shadow-inner">
                    <img src={previewUrl || ""} alt="Preview" className="max-w-full max-h-full object-contain" />
                    <button onClick={reset} className="absolute top-4 right-4 p-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-xl text-slate-500 hover:text-red-500 transition-colors shadow-lg">
                      <X className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/50 backdrop-blur-md text-white rounded-lg text-xs font-bold uppercase tracking-widest">
                      {selectedFile.type.split('/')[1].toUpperCase()} Original
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-1/2 space-y-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                      <FileType className="w-5 h-5 text-primary" />
                      <span>Target Format</span>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {formats.map((f) => (
                        <button
                          key={f.value}
                          onClick={() => setTargetFormat(f.value)}
                          className={`py-4 rounded-2xl font-black transition-all border-2 active:scale-95 ${
                            targetFormat === f.value 
                              ? "bg-primary/10 border-primary text-primary shadow-sm" 
                              : "bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-800 text-slate-400 hover:border-primary/50"
                          }`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {status === "idle" && (
                      <button onClick={convertImage} className="w-full py-5 bg-primary text-white rounded-2xl font-black text-xl shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all flex items-center justify-center gap-3 active:scale-95">
                        <RefreshCw className="w-6 h-6" />
                        <span>Convert Now</span>
                      </button>
                    )}

                    {status === "processing" && (
                      <div className="flex flex-col items-center gap-4 py-4">
                        <RefreshCw className="w-10 h-10 text-primary animate-spin" />
                        <p className="font-bold text-slate-500">Converting Format...</p>
                      </div>
                    )}

                    {status === "done" && (
                      <div className="space-y-4">
                        <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 rounded-3xl flex items-center gap-4">
                          <CheckCircle className="w-8 h-8 text-emerald-500" />
                          <div>
                            <p className="font-bold text-slate-900 dark:text-white">Conversion Complete!</p>
                            <p className="text-sm text-slate-500">Ready to download in {targetFormat.split('/')[1].toUpperCase()} format.</p>
                          </div>
                        </div>
                        <button onClick={downloadImage} className="w-full py-5 bg-emerald-500 text-white rounded-2xl font-black text-xl shadow-xl shadow-emerald-500/20 hover:bg-emerald-600 transition-all flex items-center justify-center gap-3 active:scale-95">
                          <Download className="w-6 h-6" />
                          <span>Download Image</span>
                        </button>
                        <button onClick={reset} className="w-full py-3 text-slate-400 hover:text-primary transition-colors font-bold text-sm">Convert another image</button>
                      </div>
                    )}

                    {status === "error" && (
                      <div className="p-6 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-3xl text-center space-y-4">
                        <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
                        <h4 className="font-bold text-red-600 dark:text-red-400">Oops! Conversion failed</h4>
                        <p className="text-sm text-red-500/70">Please try a different image.</p>
                        <button onClick={reset} className="font-bold text-primary underline">Try again</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <canvas ref={canvasRef} className="hidden" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <EducationalContent 
        title="Modern Image Conversion Made Simple"
        content={[
          "The web is moving towards more efficient image formats. While PNG and JPG are the classics, <strong>WEBP</strong> provides superior compression and quality for modern browsers. Our <strong>Free Online Image Converter</strong> allows you to switch between these formats with ease.",
          "Whether you need to turn a heavy PNG into a lightweight JPG for your website, or convert a photo into WEBP to improve your SEO scores, our tool handles it all. We don't believe in complex menus or technical jargon—just fast, high-quality conversion.",
          "All processing happens locally on your computer. This means no waiting for uploads to finish, and complete peace of mind knowing your photos are never seen by anyone else."
        ]}
        benefits={[
          "WEBP Support: Modernize your site for faster loading and better SEO.",
          "Lossless Quality: Maintain the visual integrity of your images.",
          "Zero Server Delay: Instant results powered by your own browser.",
          "Secure & Private: Files never leave your local environment."
        ]}
        faqs={[
          {
            question: "Why should I convert my images to WEBP?",
            answer: "WEBP images are significantly smaller than JPG or PNG files without losing visible quality. This results in faster page loads and better search rankings."
          },
          {
            question: "Is there any limit to how many files I can convert?",
            answer: "No, TurboTools is completely unlimited. You can convert as many images as you need without any restrictions."
          }
        ]}
      />
    </ToolLayout>
  );
}
