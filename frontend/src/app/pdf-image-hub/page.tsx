"use client";

import { useState } from "react";
import { FileType, Image as ImageIcon, ArrowRight, ArrowLeftRight, FileStack, Zap } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import ToolWorkspace from "@/components/ToolWorkspace";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function PDFImageHub() {
  const [direction, setDirection] = useState<"img-to-pdf" | "pdf-to-img" | null>(null);

  const services = [
    {
      id: "img-to-pdf",
      name: "Image to PDF",
      description: "Convert your photos, scans, and images into a professional PDF document.",
      icon: <FileType className="w-10 h-10" />,
      href: "/image-to-pdf-converter",
      color: "from-blue-500 to-indigo-600"
    },
    {
      id: "pdf-to-img",
      name: "PDF to Image",
      description: "Extract high-quality images from your PDF pages effortlessly.",
      icon: <ImageIcon className="w-10 h-10" />,
      href: "/pdf-to-image-converter",
      color: "from-purple-500 to-pink-600"
    }
  ];

  return (
    <DashboardLayout toolName="PDF / Image Service">
      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-primary/10 text-primary mb-8 shadow-inner">
            <FileStack className="w-10 h-10" />
          </div>
          <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">Flexible PDF & Image Service</h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
            Choose your conversion direction. Same high performance, same total privacy, now in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <Link 
              key={service.id}
              href={service.href}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-linear-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem] blur-xl" style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to))` }} />
              <div className="relative h-full glass p-10 rounded-[2.5rem] flex flex-col items-center text-center group-hover:bg-white dark:group-hover:bg-slate-900 transition-all duration-300">
                <div className={`w-24 h-24 rounded-3xl bg-linear-to-br ${service.color} text-white flex items-center justify-center mb-8 shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 tracking-tight group-hover:text-primary transition-colors">
                  {service.name}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-10">
                  {service.description}
                </p>
                <div className="mt-auto flex items-center gap-2 px-6 py-3 bg-slate-50 dark:bg-slate-800 rounded-2xl group-hover:bg-primary group-hover:text-white transition-all duration-300 font-bold text-sm">
                  <span>Enter Service</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-20 p-8 glass rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 border border-white/50 dark:border-white/5">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 flex items-center justify-center text-yellow-500">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-black text-slate-900 dark:text-white tracking-tight">Pro Tip</h4>
                <p className="text-sm text-slate-500 font-medium tracking-tight">You can use Turbo AI to jump directly to these tools.</p>
              </div>
           </div>
           <Link href="/compress-image-online" className="text-sm font-black text-primary hover:underline">Combine with Image Compressor →</Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
