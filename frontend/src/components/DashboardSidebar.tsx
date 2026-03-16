"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Image as ImageIcon, 
  Type, 
  Code, 
  Calculator, 
  ChevronRight,
  X
} from "lucide-react";
import { TOOLS } from "@/constants/tools";
import Logo from "./Logo";

const CATEGORIES = [
  { name: "Image Tools", icon: ImageIcon, tools: TOOLS.filter(t => t.category === "Image") },
  { name: "Text Tools", icon: Type, tools: TOOLS.filter(t => t.category === "Text") },
  { name: "Developer Tools", icon: Code, tools: TOOLS.filter(t => t.category === "Developer") },
  { name: "Calculators", icon: Calculator, tools: TOOLS.filter(t => t.category === "Calculator") },
];

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DashboardSidebar({ isOpen, onClose }: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] lg:hidden transition-opacity ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <aside className={`w-72 h-screen fixed left-0 top-0 border-r border-[#E5E5E5] dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col z-[70] transition-all duration-300 lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <button 
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 p-2 text-slate-400 hover:text-[#111]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Sidebar Header */}
        <div className="h-16 flex items-center px-6 border-b border-[#E5E5E5] dark:border-slate-800">
          <Link href="/" onClick={onClose}>
            <Logo showText={true} className="scale-90 origin-left" />
          </Link>
        </div>

        {/* Navigation Content */}
        <div className="flex-grow overflow-y-auto py-6 px-4 no-scrollbar">
          <div className="space-y-8">
            {/* General Nav */}
            <div>
              <Link 
                href="/"
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === "/" 
                    ? "bg-[#F5F5F5] dark:bg-slate-800 text-[#111] dark:text-white" 
                    : "text-slate-500 hover:bg-[#F9FAFB] dark:hover:bg-slate-800/50 hover:text-[#111] dark:hover:text-white"
                }`}
              >
                <Home className="w-4 h-4" />
                <span>Dashboard Home</span>
              </Link>
            </div>

            {/* Tool Categories */}
            {CATEGORIES.map((cat) => (
              <div key={cat.name} className="space-y-1">
                <h4 className="px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-2">
                  {cat.name}
                </h4>
                <div className="space-y-0.5">
                  {cat.tools.map((tool) => (
                    <Link
                      key={tool.id}
                      href={tool.href}
                      onClick={onClose}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors group ${
                        pathname === tool.href
                          ? "bg-[#F5F5F5] dark:bg-slate-800 text-[#111] dark:text-white font-semibold"
                          : "text-slate-500 hover:bg-[#F9FAFB] dark:hover:bg-slate-800/50 hover:text-[#111] dark:hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <tool.icon className={`w-4 h-4 ${pathname === tool.href ? "text-[#111]" : "text-slate-400 group-hover:text-[#111]"}`} />
                        <span>{tool.name}</span>
                      </div>
                      {pathname === tool.href && (
                        <div className="w-1 h-4 bg-[#111] dark:bg-white rounded-full" />
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-[#E5E5E5] dark:border-slate-800">
          <div className="p-4 bg-emerald-50/40 dark:bg-emerald-950/20 rounded-xl border border-emerald-100 dark:border-emerald-800/50">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
              <span>100% Privacy</span>
            </div>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-normal">
              Your data never leaves your browser. Safe and secure.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
