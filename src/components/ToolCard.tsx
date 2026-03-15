"use client";

import { Tool } from "@/constants/tools";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { saveRecentTool } from "@/utils/recentTools";

export default function ToolCard({ tool, compact = false }: { tool: Tool, compact?: boolean }) {
  const Icon = tool.icon;
  
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="h-full"
    >
      <Link 
        href={tool.href}
        onClick={() => saveRecentTool(tool.id)}
        className={`group flex flex-col h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:border-primary/30 transition-all duration-300 relative overflow-hidden ${
          compact ? "p-6 rounded-3xl" : "p-8 rounded-[2rem]"
        }`}
      >
        {/* Decorative corner glow */}
        <div className="absolute -top-12 -right-12 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/20 transition-all duration-700" />
        
        {/* Card Header: Icon + Title */}
        <div className={`flex items-start gap-4 ${compact ? "mb-4" : "mb-6"}`}>
          <div className={`shrink-0 flex items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-500 ${
            compact ? "w-10 h-10" : "w-14 h-14"
          }`}>
            <Icon className={`${compact ? "w-5 h-5" : "w-6 h-6"} transition-transform duration-500 group-hover:scale-110`} />
          </div>
          <div className="flex-grow pt-1">
            {!compact && (
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                  {tool.category}
                </span>
                <div className="w-1 h-1 rounded-full bg-slate-200 dark:bg-slate-700" />
                <Sparkles className="w-2.5 h-2.5 text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            )}
            <h3 className={`${compact ? "text-base" : "text-xl"} font-black text-slate-900 dark:text-white leading-tight tracking-tight group-hover:text-primary transition-colors`}>
              {tool.name}
            </h3>
          </div>
        </div>
        
        {/* Description */}
        {!compact && (
          <p className="text-[15px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium mb-8 line-clamp-2">
            {tool.description}
          </p>
        )}
        
        {/* Bottom indicator */}
        <div className="mt-auto flex items-center justify-between">
          {compact ? (
             <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 group-hover:text-primary transition-colors">Launch</span>
          ) : (
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800" />
              <div className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-700" />
            </div>
          )}
          <div className={`rounded-xl transition-all duration-300 ${
            compact ? "p-1.5 bg-slate-50 dark:bg-slate-800 group-hover:bg-primary group-hover:text-white" : "p-2.5 bg-slate-50 dark:bg-slate-800 group-hover:bg-primary group-hover:text-white group-hover:shadow-[0_0_20px_rgba(79,70,229,0.4)]"
          }`}>
            <ArrowRight className={`${compact ? "w-3.5 h-3.5" : "w-4 h-4"} group-hover:translate-x-0.5 transition-transform`} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
