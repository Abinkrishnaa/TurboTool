"use client";

import dynamic from "next/dynamic";

const BackgroundRemoverInterface = dynamic(
  () => import("@/components/BackgroundRemoverInterface"),
  { 
    ssr: false,
    loading: () => <div className="p-12 text-center text-slate-400 font-bold">Loading AI Engine...</div>
  }
);

export default function BackgroundRemoverClient() {
  return <BackgroundRemoverInterface />;
}
