import type { Metadata } from "next";
import YoutubeThumbnailDownloader from "@/components/YoutubeThumbnailDownloader";
import DashboardLayout from "@/components/DashboardLayout";
import ToolWorkspace from "@/components/ToolWorkspace";
import Breadcrumbs from "@/components/Breadcrumbs";
import EducationalContent from "@/components/EducationalContent";

export const metadata: Metadata = {
  title: "YouTube Thumbnail Downloader - Download HD & 4K Thumbnails | TurboTool",
  description: "Get high-quality YouTube thumbnails in one click. Download 4K, 1080p, and HD thumbnails for any video for free. Safe, fast, and secure.",
  keywords: ["youtube thumbnail downloader", "download youtube thumbnail", "get youtube thumbnail", "yt thumbnail hd", "4k youtube thumbnail", "youtube image downloader"],
  alternates: {
    canonical: "/youtube-thumbnail-downloader",
  },
};

const features = [
  {
    title: "HD & 4K Quality",
    description: "Download the original highest resolution thumbnail uploaded by the creator.",
    iconId: "maximize"
  },
  {
    title: "One-Click Download",
    description: "No complex steps. Paste the URL and get your high-resolution image instantly.",
    iconId: "zap"
  },
  {
    title: "Unlimited & Free",
    description: "Download as many thumbnails as you need with no limits and no hidden costs.",
    iconId: "download"
  }
];

export default function YoutubeDownloaderPage() {
  const relatedTools = [
    { name: "Image Compressor", description: "Optimize your downloads.", href: "/compress-image-online", iconId: "resizer" },
    { name: "Background Remover", description: "Clean up images instantly.", href: "/remove-background-from-image", iconId: "eraser" },
    { name: "Image Converter", description: "SVG, PNG, or JPG.", href: "/png-to-jpg-converter", iconId: "refresh" }
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://TurboTool.com" },
      { "@type": "ListItem", "position": 2, "name": "YouTube Thumbnail Downloader", "item": "https://TurboTool.com/youtube-thumbnail-downloader" }
    ]
  };

  return (
    <DashboardLayout toolName="YouTube Downloader">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="container mx-auto px-6 py-4 max-w-7xl">
        <Breadcrumbs items={[{ label: "YouTube Thumbnail Downloader" }]} />
        
        <ToolWorkspace
          badge="Video Utility"
          title="YouTube Thumbnail Downloader"
          description="Grab the official high-resolution thumbnail from any YouTube video in seconds. Perfect for designers, creators, and researchers."
          features={features}
          relatedTools={relatedTools}
          education={{
            title: "Technical Specification",
            content: (
              <div className="space-y-6">
                <p>
                  Our YouTube Thumbnail Downloader uses the official YouTube metadata API endpoints to retrieve the highest quality asset associated with a video. 
                  When you paste a link, we extract the unique video ID and query the <strong>maxresdefault</strong> image source.
                </p>
                
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-inner">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-widest">Available Quality Levels</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span><strong>MQ Default:</strong> 320 x 180 (Standard resolution)</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span><strong>HQ Default:</strong> 480 x 360 (High quality)</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span><strong>SD Default:</strong> 640 x 480 (Standard definition)</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span><strong>Max Res:</strong> 1080p / 4K (Original upload quality)</span>
                    </li>
                  </ul>
                </div>
              </div>
            )
          }}
        >
          <YoutubeThumbnailDownloader />
        </ToolWorkspace>

        <EducationalContent 
          title="Download YouTube Thumbnails in Full HD and 4K"
          content={[
            "Whether you're looking for inspiration for your next video or need a high-quality preview for a presentation, our <strong>YouTube Thumbnail Downloader</strong> is the fastest way to get the job done. Simply paste the video link, and we'll fetch every available resolution for you instantly.",
            "Creators often upload their thumbnails in <strong>Full HD (1920x1080)</strong> or even higher. Our tool scans the YouTube database specifically for the 'maxresdefault' quality, ensuring you get the exact same image the creator uploaded, without any watermarks or compression artifacts.",
            "We prioritize your security and productivity. There's no account registration, no captcha to solve, and no annoying pop-ups. It's a clean, professional utility designed for creators who value their time."
          ]}
          benefits={[
            "Access original 4K and 1080p thumbnail files effortlessly.",
            "Support for both Short and Long-form YouTube videos.",
            "Instant previews of all available resolution levels.",
            "100% free with no daily download limits."
          ]}
          faqs={[
            {
              question: "Is it legal to download YouTube thumbnails?",
              answer: "Downloading thumbnails for personal use, research, or fair-use commentary is generally acceptable. However, always credit the original creator and respect copyright if you plan to use the image in your own projects."
            },
            {
              question: "Can I download thumbnails from private videos?",
              answer: "No. For security and privacy reasons, our tool only accesses thumbnails for public and unlisted videos that are accessible via the YouTube API."
            },
            {
              question: "What if the 4K quality is not available?",
              answer: "The 'Max Res' quality depends on what the original creator uploaded. If they uploaded a low-resolution thumbnail, our tool will provide the highest quality available (HQ or SD)."
            }
          ]}
        />
      </div>
    </DashboardLayout>
  );
}
