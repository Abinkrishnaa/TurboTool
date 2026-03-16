"use client";

import dynamic from "next/dynamic";

const PDFToImageInterface = dynamic(
  () => import("@/components/PDFToImageInterface"),
  { 
    ssr: false,
    loading: () => <div className="p-12 text-center text-slate-400 font-bold">Loading PDF Engine...</div>
  }
);

export default function PDFToImageClient() {
  return <PDFToImageInterface />;
}
