"use client";

import { useState, Suspense, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { 
  FileText, 
  FileCode,
  ArrowRightLeft,
  CheckCircle2,
  AlertCircle,
  Shield,
  Zap
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { motion, AnimatePresence } from "framer-motion";
import Breadcrumbs from "@/components/Breadcrumbs";
import EducationalContent from "@/components/EducationalContent";

const PdfToWordInterface = dynamic(() => import("@/components/PdfToWordInterface"), { 
  ssr: false,
  loading: () => <div className="p-12 text-center text-slate-400 font-bold">Loading PDF Engine...</div>
});

const WordToPdfInterface = dynamic(() => import("@/components/WordToPdfInterface"), { 
  ssr: false,
  loading: () => <div className="p-12 text-center text-slate-400 font-bold">Loading Word Engine...</div>
});

function WordPdfConverterContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<"pdf-to-word" | "word-to-pdf">("pdf-to-word");

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://TurboTool.com" },
      { "@type": "ListItem", "position": 2, "name": "Word & PDF Suite", "item": "https://TurboTool.com/word-pdf-converter" }
    ]
  };

  useEffect(() => {
    const mode = searchParams.get("mode");
    if (mode === "word-to-pdf") {
      setActiveTab("word-to-pdf");
    } else {
      setActiveTab("pdf-to-word");
    }
  }, [searchParams]);

  const handleTabChange = (tab: "pdf-to-word" | "word-to-pdf") => {
    setActiveTab(tab);
    const params = new URLSearchParams(searchParams.toString());
    params.set("mode", tab);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <DashboardLayout toolName="Word & PDF Converter">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <div className="container mx-auto px-6 py-4 max-w-7xl">
        <Breadcrumbs items={[{ label: "Word & PDF Suite" }]} />
        
        {/* Header Section */}
        <div className="text-center mb-16 space-y-6 mt-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-[2.5rem] bg-orange-600/10 text-orange-600 mb-4 shadow-inner">
            <ArrowRightLeft className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Professional <span className="text-orange-600">Word & PDF Suite</span>
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            Seamlessly convert between Word and PDF documents while preserving perfect layouts. Fast, secure, and 100% private.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
           <div className="bg-slate-100 dark:bg-slate-900 p-1.5 rounded-[2rem] flex items-center shadow-inner">
              <button 
                onClick={() => handleTabChange("pdf-to-word")}
                className={`flex items-center gap-3 px-8 py-4 rounded-[1.7rem] font-black text-sm transition-all duration-300 ${activeTab === "pdf-to-word" ? "bg-white dark:bg-slate-800 text-orange-600 shadow-xl scale-105" : "text-slate-400 hover:text-slate-600"}`}
              >
                <FileText className="w-5 h-5" />
                <span>PDF to Word</span>
              </button>
              <div className="w-px h-8 bg-slate-200 dark:bg-slate-800 mx-2" />
              <button 
                onClick={() => handleTabChange("word-to-pdf")}
                className={`flex items-center gap-3 px-8 py-4 rounded-[1.7rem] font-black text-sm transition-all duration-300 ${activeTab === "word-to-pdf" ? "bg-white dark:bg-slate-800 text-orange-600 shadow-xl scale-105" : "text-slate-400 hover:text-slate-600"}`}
              >
                <FileCode className="w-5 h-5" />
                <span>Word to PDF</span>
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
                      <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin" />
                      <p className="text-slate-500 font-bold tracking-widest uppercase text-xs">Initializing Processing Engine...</p>
                    </div>
                  </div>
                }>
                  {activeTab === "pdf-to-word" ? <PdfToWordInterface /> : <WordToPdfInterface />}
                </Suspense>
              </motion.div>
           </AnimatePresence>
        </div>

        {/* Trust Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            { icon: Shield, title: "100% Private", desc: "Files never leave your browser memory." },
            { icon: Zap, title: "Instant Result", desc: "No queues or wait times for processing." },
            { icon: CheckCircle2, title: "Perfect Layout", desc: "Preserves fonts, images, and alignment." }
          ].map((feature, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-4xl border border-slate-100 dark:border-slate-800 shadow-xl flex flex-col items-center text-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-600/10 text-orange-600 flex items-center justify-center">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-widest text-xs">{feature.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>

        <EducationalContent 
          title="Professional Document Conversion Without Compromise"
          content={[
            "Converting between Word and PDF is one of the most common tasks for professionals, students, and businesses. However, many online tools sacrifice document formatting or, worse, compromise your data privacy by uploading files to a cloud server.",
            "TurboTools solves this with our <strong>Professional Word & PDF Suite</strong>. Our engine runs 100% client-side, meaning your sensitive documents—legal contracts, resumes, or financial reports—are processed entirely within your browser. We never see your content, and it's never stored on any server.",
            "Our <strong>PDF to Word</strong> converter uses advanced structural analysis to reconstruct editable DOCX files that look exactly like the original PDF. Similarly, our <strong>Word to PDF</strong> tool generates high-fidelity documents that are ready for distribution, printing, or archiving."
          ]}
          benefits={[
            "Absolute data sovereignty: Your files are never uploaded to our servers.",
            "Support for charts, tables, and complex vector graphics."
          ]}
          faqs={[
            {
              question: "Will my Word document look the same as the original PDF?",
              answer: "Yes, our engine prioritizes font and layout accuracy. While some complex elements may require minor adjustments, most documents are reconstructed with professional fidelity."
            },
            {
              question: "Is there a limit to how many files I can convert?",
              answer: "No. Since the tool runs on your device, there are no artificial limits. You can convert as many documents as your system's memory can handle."
            },
            {
              question: "How do you ensure my documents stay private?",
              answer: "We use WebAssembly technology to run the conversion engine locally in your browser. No data packet containing your document content ever reaches a server."
            }
          ]}
        />
      </div>
    </DashboardLayout>
  );
}

export default function WordPdfConverterPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400 font-bold uppercase tracking-widest">Loading Document Suite...</div>}>
      <WordPdfConverterContent />
    </Suspense>
  );
}
