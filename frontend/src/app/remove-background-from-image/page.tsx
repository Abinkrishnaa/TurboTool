import type { Metadata } from "next";
import dynamic from "next/dynamic";
import DashboardLayout from "@/components/DashboardLayout";
import ToolWorkspace from "@/components/ToolWorkspace";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Remove Background From Image Free Online - AI Powered | Auxlify",
  description: "Remove image backgrounds instantly for free using AI. Our professional-grade background remover runs 100% in your browser for total privacy. No signup required.",
  keywords: ["remove background", "transparent background", "background remover AI", "free online background remover", "remove bg free"],
  alternates: {
    canonical: "/remove-background-from-image",
  },
};

import BackgroundRemoverClient from "./BackgroundRemoverClient";
import Breadcrumbs from "@/components/Breadcrumbs";
import EducationalContent from "@/components/EducationalContent";

const features = [
  {
    title: "Precise Edges",
    description: "Professional-grade AI detects hair and complex edges with high accuracy.",
    iconId: "zap"
  },
  {
    title: "Transparent Output",
    description: "Get crystal clear transparent PNGs ready for your design projects.",
    iconId: "image"
  },
  {
    title: "100% Private",
    description: "All AI processing happens on your device. Your photos are never stored.",
    iconId: "shield"
  }
];

export default function BackgroundRemoverPage() {
  const relatedTools = [
    { name: "Image Compressor", description: "Reduce photo size.", href: "/compress-image-online", iconId: "zap" },
    { name: "Image Resizer", description: "Change dimensions.", href: "/resize-image-online", iconId: "image" },
    { name: "Image Cropper", description: "Precise image cropping.", href: "/crop-image-online", iconId: "sliders" }
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://auxlify.online"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Background Remover",
        "item": "https://auxlify.online/remove-background-from-image"
      }
    ]
  };

  return (
    <DashboardLayout toolName="Background Remover">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <Breadcrumbs items={[{ label: "Background Remover" }]} />

      <ToolWorkspace
        badge="AI Powered"
        title="Background Remover"
        description="Remove backgrounds from any image instantly using professional AI. Private, fast, and 100% free."
        features={features}
        relatedTools={relatedTools}
        education={{
          title: "Technical Specification",
          content: (
            <>
              <p>
                The Background Remover uses a <strong>Machine Learning model</strong> (specifically a variation of U-Net) that runs entirely inside your browser using TensorFlow.js or similar client-side inference engines.
              </p>
              <p className="mt-4">
                By analyzing the visual contrast and semantic layers of the image, the AI identifies the most prominent subject and isolates it from the background. This process is complex but optimized for modern browsers, ensuring professional results without needing high-end desktop hardware.
              </p>
            </>
          )
        }}
      >
        <Suspense fallback={<div className="p-12 text-center text-slate-400 font-bold uppercase tracking-widest">Loading Tool Workspace...</div>}>
           <BackgroundRemoverClient />
        </Suspense>
      </ToolWorkspace>

      <EducationalContent 
        title="Professional Background Removal for Designers and Creators"
        content={[
          "Images with transparent backgrounds are essential for modern web design, ecommerce, and marketing. Whether you're preparing <strong>product shots for Shopify</strong> or creating <strong>personal headshots</strong>, our AI-powered background remover delivers pixel-perfect results instantly.",
          "Unlike traditional online tools that upload your data to a server, Auxlify executes the entire removal process <strong>directly on your device</strong>. This means your private photos never leave your browser, providing 100% data security and privacy.",
          "Our AI model is trained on millions of images to accurately detect complex subjects, including hair, fur, and intricate edges, ensuring a clean cutout every time."
        ]}
        benefits={[
          "Instant results with zero server latency.",
          "100% data privacy - your photos are never uploaded.",
          "High-resolution transparent PNG downloads.",
          "Free to use with no hidden subscriptions or limits."
        ]}
        faqs={[
          {
            question: "Is this background remover free?",
            answer: "Yes, Auxlify provides unlimited background removal for free. There are no daily limits or watermarks on your downloads."
          },
          {
            question: "Will my image quality be reduced?",
            answer: "No, our tool preserves the original resolution of your image while only removing the background layers."
          },
          {
            question: "Does it work with complex backgrounds?",
            answer: "Our advanced AI is specifically optimized to handle complex backgrounds, including outdoor scenes and busy studio setups."
          }
        ]}
      />
    </DashboardLayout>
  );
}
