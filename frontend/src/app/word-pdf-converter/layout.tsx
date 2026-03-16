import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Professional PDF & Word Converter - Document Suite | TurboTool",
  description: "Convert PDF to Word and Word to PDF instantly. High-fidelity layouts, 100% private, and browser-based document processing. No registration or uploads required.",
  keywords: ["pdf to word", "word to pdf", "convert docx to pdf", "pdf to docx converter", "online document converter", "free pdf tool"],
  alternates: {
    canonical: "/word-pdf-converter",
  },
};

export default function WordPdfSuiteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
