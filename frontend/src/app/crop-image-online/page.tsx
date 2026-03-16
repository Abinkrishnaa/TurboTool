import type { Metadata } from "next";
import ImageCropperInterface from "@/components/ImageCropperInterface";
import Breadcrumbs from "@/components/Breadcrumbs";
import EducationalContent from "@/components/EducationalContent";
import DashboardLayout from "@/components/DashboardLayout";
import { Crop, Maximize, Layout, Share2, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Crop Image Online - Free Photo Cropper & Aspect Ratio Tool | TurboTool",
  description: "Crop your images online for free. Support for Instagram, Square, 16:9, and custom aspect ratios. Professional tools, 100% private, and high-quality exports.",
  keywords: ["crop image online", "free photo cropper", "image resizer", "instagram story cropper", "online image editor", "crop photo"],
  alternates: {
    canonical: "/crop-image-online",
  },
};

export default function ImageCropperPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://TurboTool.com" },
      { "@type": "ListItem", "position": 2, "name": "Image Cropper", "item": "https://TurboTool.com/crop-image-online" }
    ]
  };

  return (
    <DashboardLayout toolName="Image Cropper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <div className="container mx-auto px-6 py-4 max-w-7xl">
        <Breadcrumbs items={[{ label: "Image Cropper" }]} />

        <div className="text-center mb-16 mt-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <Crop className="w-4 h-4" />
            <span className="text-xs font-black uppercase tracking-widest leading-none">Photo Utility</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-black text-slate-900 dark:text-white mb-6 tracking-tight">
            Image <span className="text-primary">Cropper</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Crop your photos to any size or aspect ratio perfectly. Optimized for social media precision and professional design.
          </p>
        </div>

        <ImageCropperInterface />

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Social Presets",
              desc: "Quickly crop for Instagram, YouTube, and other platforms with built-in aspect ratios.",
              icon: Share2
            },
            {
              title: "High Fidelity",
              desc: "Maintains the original quality of your image during the cropping process.",
              icon: Maximize
            },
            {
              title: "Intuitive UI",
              desc: "Drag and zoom to frame your subject exactly where you want it.",
              icon: Layout
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
          title="Why Use a Dedicated Online Image Cropper?"
          content={[
            "Standard photo viewers often lack the precision needed for modern digital branding. Whether you're preparing a <strong>YouTube Thumbnail</strong>, an <strong>Instagram Story</strong>, or a <strong>Professional Profile Photo</strong>, having exact control over your aspect ratio is vital for a polished look.",
            "Our <strong>Free Online Photo Cropper</strong> simplifies this by providing one-click presets for every major social platform. No need to memorize pixel dimensions—just select your target (like 1:1 Square or 16:9 Cinematic) and let our tool handle the geometry.",
            "Visual quality should never be sacrificed. TurboTools uses high-fidelity canvas rendering to ensures that your cropped export maintains the maximum possible resolution from your original file. And since everything stays on your device, your private photos never touch a cloud server."
          ]}
          benefits={[
            "Instant social media formatting: Optimized for IG, FB, TikTok, and Twitter.",
            "Real-time visual feedback: See exactly how your crop will look before exporting.",
            "Lossless rendering: Preserve the sharp details of your original capture.",
            "100% Secure: On-device processing ensures total photo privacy."
          ]}
          faqs={[
            {
              question: "Will cropping my photo reduce its quality?",
              answer: "Cropping technically removes pixels, but our tool ensures that the remaining area is exported at the highest possible density, following the original image's resolution."
            },
            {
              question: "How do I crop an image for Instagram?",
              answer: "Simply use the 'Instagram' preset. We support 1:1 (Posts), 4:5 (Portraits), and 9:16 (Stories/Reels) to make sure your content fits perfectly."
            },
            {
              question: "Can I crop high-resolution raw photos?",
              answer: "Yes. Our tool leverages your browser's GPU acceleration to handle large file sizes and high-megapixel images smoothly."
            }
          ]}
        />
      </div>
    </DashboardLayout>
  );
}
