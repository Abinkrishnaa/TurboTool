import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PNG to JPG Converter - Best High-Quality Image Converter | Auxlify",
  description: "Convert PNG to JPG, JPG to PNG, and WebP instantly. Fast, high-quality, and 100% private image conversion in your browser. No registration required.",
  keywords: ["png to jpg converter", "jpg to png", "convert image online", "image converter free", "webp to jpg"],
  alternates: {
    canonical: "/png-to-jpg-converter",
  },
};

export default function PngToJpgLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
