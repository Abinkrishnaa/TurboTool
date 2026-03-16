import type { Metadata } from "next";
import CompressorInterface from "@/components/ImageCompressorInterface";
import DashboardLayout from "@/components/DashboardLayout";
import { Suspense } from "react";
import ToolWorkspace from "@/components/ToolWorkspace";
import Breadcrumbs from "@/components/Breadcrumbs";
import EducationalContent from "@/components/EducationalContent";

export const metadata: Metadata = {
  title: "Compress Image Online - Reduce Photo Size Without Quality Loss | TurboTool",
  description: "Reduce image size online for free. Support for KB and MB targets. Our secure tool compresses PNG, JPG, and WEBP images entirely on your device for total privacy.",
  keywords: ["compress image", "reduce photo size", "image size reducer", "kb to mb converter", "online photo compressor", "compress jpeg"],
  alternates: {
    canonical: "/compress-image-online",
  },
};

const features = [
  {
    title: "Target Size Lock",
    description: "Unique feature to compress images down to exact KB or MB requirements for official forms.",
    iconId: "zap"
  },
  {
    title: "Web Optimized",
    description: "Automatically formats your images for fast loading on websites and social media.",
    iconId: "download"
  },
  {
    title: "On-Device Security",
    description: "All compression happens in your browser. Your images are never sent to a server.",
    iconId: "shield"
  }
];

export default function CompressorPage() {
  const relatedTools = [
    { name: "Image Resizer", description: "Change image dimensions.", href: "/resize-image-online", iconId: "image" },
    { name: "Background Remover", description: "AI powered BG removal.", href: "/remove-background-from-image", iconId: "zap" },
    { name: "Image Converter", description: "JPG, PNG, WEBP conversion.", href: "/png-to-jpg-converter", iconId: "download" }
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://TurboTool.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Image Compressor",
        "item": "https://TurboTool.com/compress-image-online"
      }
    ]
  };

  return (
    <DashboardLayout toolName="Image Compressor">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <Breadcrumbs items={[{ label: "Image Compressor" }]} />

      <ToolWorkspace
        badge="Image Utility"
        title="Image Compressor"
        description="Reduce image size online for free. Support for KB and MB targets. Our secure tool compresses PNG, JPG, and WEBP images entirely on your device for total privacy."
        features={features}
        relatedTools={relatedTools}
        education={{
          title: "Technical Specification",
          content: (
            <>
              <p>
                Our Image Compressor leverages <strong>browser-based canvas API</strong> and advanced compression algorithms to reduce file sizes entirely on your client machine. This approach eliminates the latency and security risks associated with server-side processing.
              </p>
              <p className="mt-4">
                By selectively discarding non-essential metadata and optimizing color depth while preserving visual edges, we achieve up to <strong>90% reduction</strong> in file weight.
              </p>
            </>
          )
        }}
      >
        <Suspense fallback={<div className="p-12 text-center text-slate-400 font-bold uppercase tracking-widest">Loading Tool Workspace...</div>}>
           <CompressorInterface />
        </Suspense>
      </ToolWorkspace>

      <EducationalContent 
        title="Smart Image Compression: Optimize for Speed and Quality"
        content={[
          "Slow websites are the number one cause of high bounce rates. Our <strong>online image compressor</strong> helps you improve your site's performance by reducing image file sizes without sacrificing visual quality. Whether you're a developer optimizing web assets or a student uploading files to a portal, our tool is built for you.",
          "We support all major formats including <strong>JPG, PNG, and WebP</strong>. Our unique 'Target Size' feature allows you to specify exactly how many KB or MB you need your file to be, making it the perfect choice for government applications and job portals with strict upload limits.",
          "Privacy is our core philosophy. Unlike other converters, your images are <strong>never uploaded to a server</strong>. The compression happens natively in your browser using high-performance JavaScript workers."
        ]}
        benefits={[
          "Drastically reduce file size while maintaining clarity.",
          "Target specific file sizes in KB or MB.",
          "Batch processing support for faster workflows.",
          "Zero data leaving your device - 100% private."
        ]}
        faqs={[
          {
            question: "How much can I reduce my image size?",
            answer: "Depending on the original format and quality settings, you can often see size reductions of 70% to 90% while keeping the image looking great."
          },
          {
            question: "Is there a limit on file size?",
            answer: "No, since the processing happens on your own computer, you can compress even very large high-resolution photos as long as your browser has enough memory."
          },
          {
            question: "What is the best format for the web?",
            answer: "We recommend converting to WebP for the best balance of quality and small file size. Most modern browsers support WebP perfectly."
          }
        ]}
      />
    </DashboardLayout>
  );
}
