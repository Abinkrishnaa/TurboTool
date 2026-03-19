"use client";

import { useState, Suspense, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
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
import Breadcrumbs from "@/components/Breadcrumbs";
import EducationalContent from "@/components/EducationalContent";
const ImageToPdfInterface = dynamic(() => import("@/components/ImageToPdfInterface"), { ssr: false });
const PDFToImageInterface = dynamic(() => import("@/components/PDFToImageInterface"), { ssr: false });

function UnifiedPdfImageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<"img-to-pdf" | "pdf-to-img">("img-to-pdf");
  const tool = TOOLS.find(t => t.id === "img-to-pdf")!;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://auxlify.online" },
      { "@type": "ListItem", "position": 2, "name": "Universal PDF Service", "item": "https://auxlify.online/image-to-pdf-converter" }
    ]
  };

  // Handle manual tab switching and URL sync
  const handleTabChange = (tab: "img-to-pdf" | "pdf-to-img") => {
    setActiveTab(tab);
    const params = new URLSearchParams(searchParams.toString());
    params.set("mode", tab);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const mode = searchParams.get("mode");
    if (mode === "pdf-to-img") {
      setActiveTab("pdf-to-img");
    } else if (mode === "img-to-pdf") {
      setActiveTab("img-to-pdf");
    }
  }, [searchParams]);

  return (
    <DashboardLayout toolName="Universal PDF Service">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="container mx-auto px-6 py-4 max-w-7xl">
        <Breadcrumbs items={[{ label: "PDF & Image Service" }]} />
        
        {/* Header Section */}
        <div className="text-center mb-16 space-y-6 mt-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-[2.5rem] bg-indigo-600/10 text-indigo-600 mb-4 shadow-inner">
            <FileStack className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Universal <span className="text-indigo-600">PDF & Image Service</span>
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            Everything you need for PDF and Image conversion in one place. Convert photos to PDF or extract images from documents instantly.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
           <div className="bg-slate-100 dark:bg-slate-900 p-1.5 rounded-[2rem] flex items-center shadow-inner">
              <button 
                onClick={() => handleTabChange("img-to-pdf")}
                className={`flex items-center gap-3 px-8 py-4 rounded-[1.7rem] font-black text-sm transition-all duration-300 ${activeTab === "img-to-pdf" ? "bg-white dark:bg-slate-800 text-indigo-600 shadow-xl scale-105" : "text-slate-400 hover:text-slate-600"}`}
              >
                <FileType className="w-5 h-5" />
                <span>Images to PDF</span>
              </button>
              <div className="w-px h-8 bg-slate-200 dark:bg-slate-800 mx-2" />
              <button 
                onClick={() => handleTabChange("pdf-to-img")}
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
                      <p className="text-slate-500 font-bold tracking-widest uppercase text-xs">Initializing PDF Engine...</p>
                    </div>
                  </div>
                }>
                  {activeTab === "img-to-pdf" ? <ImageToPdfInterface /> : <PDFToImageInterface />}
                </Suspense>
              </motion.div>
           </AnimatePresence>
        </div>

        <EducationalContent 
          title="The All-in-One Solution for PDF and Image Conversion"
          content={[
            "Managing documents shouldn't require multiple browser tabs. Our <strong>Universal PDF & Image Service</strong> combines powerful conversion tools into a single, high-performance interface. Whether you're turning a collection of photos into a professional PDF portfolio or extracting high-resolution assets from a presentation, we have you covered.",
            "Our <strong>Images to PDF</strong> converter supports JPG, PNG, and WebP formats, allowing you to merge dozens of files with zero quality loss. On the flip side, our <strong>PDF to Images</strong> tool uses advanced rendering to extract every page as a crisp image, perfect for sharing on social media or in messages.",
            "Security is non-negotiable. Traditional PDF converters often upload your sensitive documents to their servers. Auxlify processes everything <strong>inside your browser</strong>. Your bank statements, personal photos, and official forms never leave your device."
          ]}
          benefits={[
            "Dual-mode conversion: Toggle between Image-to-PDF and PDF-to-Image instantly.",
            "Lightning-fast local processing powered by high-concurrency JS workers.",
            "Complete privacy: Files are never uploaded, stored, or indexed.",
            "Support for batch processing and multi-page document generation."
          ]}
          faqs={[
            {
              question: "Will the quality of my images decrease after converting to PDF?",
              answer: "No, our tool maintains the original resolution and color profile of your images during the PDF generation process."
            },
            {
              question: "Can I extract specific pages from a PDF as images?",
              answer: "Yes! Our PDF to Image tool extracts all pages from your document, allowing you to select and save only the ones you need."
            },
            {
              question: "Is there a file size limit for PDFs?",
              answer: "Since processing happens locally, the limit is determined by your system's memory. Most modern laptops and desktops can handle documents with hundreds of pages easily."
            }
          ]}
        />
      </div>
    </DashboardLayout>
  );
}

export default function UNIFIED_PDF_IMAGE_PAGE() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400 font-bold uppercase tracking-widest">Loading PDF Suite...</div>}>
      <UnifiedPdfImageContent />
    </Suspense>
  );
}
