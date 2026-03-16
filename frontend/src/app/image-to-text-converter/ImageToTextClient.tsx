"use client";

import dynamic from "next/dynamic";

const OCRInterface = dynamic(
  () => import("@/components/OCRInterface"),
  { 
    ssr: false,
    loading: () => <div className="p-12 text-center text-slate-400 font-bold">Loading OCR Engine...</div>
  }
);

export default function ImageToTextClient() {
  return <OCRInterface />;
}
