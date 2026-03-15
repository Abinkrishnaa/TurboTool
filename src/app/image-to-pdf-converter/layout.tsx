import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Universal PDF & Image Hub - Fast, Free & Private | TurboTool",
  description: "The all-in-one PDF and Image suite. Convert Image to PDF, PDF to Image, and extract visuals instantly. 100% private, browser-based, no uploads required.",
  keywords: ["image to pdf", "pdf to image", "pdf tools", "convert photo to pdf", "online pdf converter", "pdf extractor"],
  alternates: {
    canonical: "/image-to-pdf-converter",
  },
};

export default function PdfImageHubLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
