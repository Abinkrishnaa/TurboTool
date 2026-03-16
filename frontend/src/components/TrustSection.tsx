"use client";

import React from "react";
import { motion } from "framer-motion";
import { Layers, Box, Cpu, Shield, Zap, Database } from "lucide-react";

export default function TrustSection() {
  const techLogos = [
    { name: "Next.js", icon: <Layers className="w-6 h-6" /> },
    { name: "React", icon: <Box className="w-6 h-6" /> },
    { name: "Wasm", icon: <Cpu className="w-6 h-6" /> },
    { name: "Tailwind", icon: <Database className="w-6 h-6" /> },
    { name: "Web API", icon: <Zap className="w-6 h-6" /> },
    { name: "Secure", icon: <Shield className="w-6 h-6" /> },
  ];

  return (
    <section className="py-24 border-t border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500 mb-12">
            Powered by Browser-Native Technologies
          </span>
          
          <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-10 opacity-30 grayscale contrast-125 hover:opacity-50 transition-opacity duration-500">
            {techLogos.map((tech, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-center gap-2 group cursor-default"
              >
                {tech.icon}
                <span className="font-black text-lg tracking-tighter uppercase whitespace-nowrap">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
