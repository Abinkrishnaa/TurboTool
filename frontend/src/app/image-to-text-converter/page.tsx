import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Breadcrumbs from "@/components/Breadcrumbs";
import EducationalContent from "@/components/EducationalContent";
import DashboardLayout from "@/components/DashboardLayout";
import { Sparkles, FileText, Search, Zap, CheckCircle2 } from "lucide-react";
import { Suspense } from "react";
import ImageToTextClient from "./ImageToTextClient";

export const metadata: Metadata = {
  title: "Image to Text Converter - Free Online OCR Tool | Auxlify",
  description: "Extract text from images, screenshots, and scanned documents instantly. High-accuracy OCR, 100% private, and browser-based text extraction. No registration required.",
  keywords: ["image to text", "extract text from image", "ocr online", "photo to text converter", "copy text from image", "free ocr tool"],
  alternates: {
    canonical: "/image-to-text-converter",
  },
};

export default function OCRPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://auxlify.online" },
      { "@type": "ListItem", "position": 2, "name": "Image to Text Converter", "item": "https://auxlify.online/image-to-text-converter" }
    ]
  };

  return (
    <DashboardLayout toolName="Image to Text">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="container mx-auto px-6 py-4 max-w-7xl">
        <Breadcrumbs items={[{ label: "Image to Text Converter" }]} />
        
        <div className="text-center mb-16 mt-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-black uppercase tracking-widest leading-none">AI Powered</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-black text-slate-900 dark:text-white mb-6 tracking-tight">
            Image to <span className="text-primary">Text</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Extract text from any image or screenshot instantly. Professional-grade OCR that stays private in your browser.
          </p>
        </div>

        <Suspense fallback={<div className="p-12 text-center text-slate-400 font-bold uppercase tracking-widest">Loading Tool Workspace...</div>}>
           <ImageToTextClient />
        </Suspense>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {[
            {
              title: "Extract Anything",
              desc: "From book pages and notes to receipts and complex screenshots, grab text with one click.",
              icon: FileText
            },
            {
              title: "On-Device OCR",
              desc: "Highest privacy: Your images never leave your computer. Processing happens entirely in-browser.",
              icon: Zap
            },
            {
              title: "Copy & Edit",
              desc: "Instantly copy extracted text or download it as a .txt file for your notes and projects.",
              icon: Search
            }
          ].map((feature, i) => (
            <div key={i} className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 group hover:border-primary/20 transition-all hover-shadow">
              <feature.icon className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
        
        <EducationalContent 
          title="Transforming Pixels into Readable Text"
          content={[
            "An <strong>Image to Text Converter</strong>, also known as <strong>OCR (Optical Character Recognition)</strong>, is a digital powerhouse that analyzes printed or handwritten characters inside an image and converts them into machine-readable, editable text.",
            "At Auxlify, we've optimized text extraction using the <strong>Tesseract engine</strong>, integrated directly into your browser. This allows for lightning-fast digitalization of book pages, lecture slides, and physical receipts without the latency or privacy risks of cloud-based OCR services.",
            "Privacy is non-negotiable for documents containing sensitive data. Unlike other online converters, our tool processes images in your browser's local sandbox. Your confidential business contracts, medical reports, and personal notes are never seen by us or anyone else."
          ]}
          benefits={[
            "Identify and extract text from 100+ languages accurately.",
            "Support for multi-column layouts and complex document structures.",
            "One-click 'Copy to Clipboard' for instant productivity.",
            "Zero upload architecture: All processing happens on your local CPU."
          ]}
          faqs={[
            {
              question: "How accurate is the online OCR process?",
              answer: "Accuracy depends on image quality. For standard digital screenshots or high-contrast scans, accuracy is typically over 99%. For handwritten notes, results may vary depending on legibility."
            },
            {
              question: "Can I extract text from low-resolution photos?",
              answer: "While we support low-res images, our engine performs best with clear, 300 DPI or higher images. If the text is blurry, the OCR may miss some characters."
            },
            {
              question: "Is there a limit on how much text I can extract?",
              answer: "No. You can use our tool for single sentences or entire document pages. There are no daily limits or character counts."
            }
          ]}
        />
      </div>
    </DashboardLayout>
  );
}
