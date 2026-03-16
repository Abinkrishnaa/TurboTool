import type { Metadata } from "next";
import dynamic from "next/dynamic";
import DashboardLayout from "@/components/DashboardLayout";
import ToolWorkspace from "@/components/ToolWorkspace";
import { FileStack } from "lucide-react";
import { Suspense } from "react";

import PDFToImageClient from "./PDFToImageClient";

export const metadata: Metadata = {
  title: "PDF to Image Converter - Extract Pages as High-Quality PNG | TurboTool",
  description: "Extract high-quality images from any PDF document for free. Professional-grade converter that runs entirely in your browser for maximum privacy.",
  keywords: ["pdf to image", "pdf to png", "extract pages from pdf", "pdf image extractor", "online pdf to image"],
  alternates: {
    canonical: "/pdf-to-image-converter",
  },
};

const features = [
  {
    title: "High Fidelity",
    description: "Export images at 2x scale for maximum clarity and detail preservation.",
    iconId: "zap"
  },
  {
    title: "Batch Extraction",
    description: "Instantly convert every page of your PDF into individual PNG files.",
    iconId: "layers"
  },
  {
    title: "Privacy First",
    description: "All processing happens on your device. Your sensitive PDFs never touch our servers.",
    iconId: "shield"
  }
];

export default function PDFToImagePage() {
  const relatedTools = [
    { name: "Image to PDF", description: "Combine images into a PDF.", href: "/image-to-pdf-converter", iconId: "file" },
    { name: "PDF to Word", description: "Convert PDF to editable DOCX.", href: "/pdf-to-word-online", iconId: "file-text" },
    { name: "Image Compressor", description: "Reduce image file size.", href: "/compress-image-online", iconId: "zap" }
  ];

  return (
    <DashboardLayout toolName="PDF to Image">
      <ToolWorkspace
        badge="PDF Utility"
        title="PDF to Image"
        description="Extract high-quality images from any PDF document for free. Professional-grade converter that runs entirely in your browser for maximum privacy."
        features={features}
        relatedTools={relatedTools}
        education={{
          title: "Technical Specification",
          content: (
            <>
              <p>
                Our PDF to Image converter utilizes <strong>PDF.js</strong> (the same engine powering Firefox's PDF viewer) to render document pages into high-resolution canvas elements. This ensures perfect font rendering and vector fidelity.
              </p>
              <p className="mt-4">
                Each page is rasterized at a <strong>300 DPI equivalent</strong> scale, ensuring that even small text remains legible after extraction. This tool is ideal for designers, legal professionals, and anyone needing to share PDF content as standard image files for social media or presentations.
              </p>
              <h3 className="text-sm font-bold text-[#111] dark:text-white mt-8 mb-2">Key Use Cases:</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Sharing specific PDF pages on Instagram or LinkedIn.</li>
                <li>Extracting graphics from professional reports.</li>
                <li>Creating image slides from PDF presentations.</li>
                <li>Archiving document pages as universal image formats.</li>
              </ul>
            </>
          )
        }}
      >
        <Suspense fallback={<div className="p-12 text-center text-slate-400 font-bold uppercase tracking-widest">Loading Tool Workspace...</div>}>
           <PDFToImageClient />
        </Suspense>
      </ToolWorkspace>
    </DashboardLayout>
  );
}
