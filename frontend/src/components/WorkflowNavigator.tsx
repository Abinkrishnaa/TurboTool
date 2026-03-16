"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap, Maximize, RefreshCw, FileType, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { savePendingFile } from "@/utils/filePersist";

interface WorkflowStep {
  name: string;
  id: string;
  href: string;
  icon: any;
  description: string;
}

const STEPS: WorkflowStep[] = [
  { id: "compressor", name: "Compress", href: "/compress-image-online", icon: Zap, description: "Reduce file size" },
  { id: "resizer", name: "Resize", href: "/resize-image-online", icon: Maximize, description: "Change dimensions" },
  { id: "converter", name: "Convert", href: "/png-to-jpg-converter", icon: RefreshCw, description: "Change format" },
  { id: "img-to-pdf", name: "To PDF", href: "/image-to-pdf-converter", icon: FileType, description: "Export as PDF" }
];

export default function WorkflowNavigator({ currentToolId, activeFile }: { currentToolId: string, activeFile: File | null }) {
  if (!activeFile) return null;

  const nextSteps = STEPS.filter(step => step.id !== currentToolId);

  const handleNextStep = async () => {
    if (activeFile) {
      await savePendingFile(activeFile);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-12 space-y-8"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Step Complete! What's next?</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {nextSteps.map((step) => (
          <Link 
            key={step.id} 
            href={`${step.href}?autoProcess=true`}
            onClick={handleNextStep}
            className="group relative"
          >
            <div className="glass p-6 rounded-[2rem] border border-white/50 dark:border-white/5 hover:border-primary/40 transition-all duration-300 flex flex-col items-center text-center">
               <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all duration-500 mb-4">
                  <step.icon className="w-6 h-6" />
               </div>
               <h4 className="font-black text-slate-900 dark:text-white mb-1 tracking-tight text-sm uppercase">{step.name}</h4>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{step.description}</p>
               
               <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-4 h-4 text-primary" />
               </div>
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
