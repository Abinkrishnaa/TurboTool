import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resize Image Online - Change Dimensions Perfectly | Auxlify",
  description: "Resize your images to any resolution or aspect ratio for free. Optimized for social media (Instagram, Twitter, Facebook) and professional design. Fast, secure, and 100% private.",
  keywords: ["resize image online", "image resizer", "change photo dimensions", "social media image resizer", "free online resizer"],
  alternates: {
    canonical: "/resize-image-online",
  },
};

export default function ResizeImageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
