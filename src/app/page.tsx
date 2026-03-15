"use client";

import { useState, useEffect } from "react";
import { Search, Sparkles, Shield, Rocket, Clock, ChevronDown, Plus, Minus, History } from "lucide-react";
import { TOOLS, Tool } from "@/constants/tools";
import ToolCard from "@/components/ToolCard";
import Logo from "@/components/Logo";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import AIPromptBar from "@/components/AIPromptBar";
import TrustSection from "@/components/TrustSection";
import { getRecentTools } from "@/utils/recentTools";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [recentTools, setRecentTools] = useState<Tool[]>([]);

  useEffect(() => {
    setRecentTools(getRecentTools());
  }, []);

  const categories = ["All", "Image", "Text", "Developer"];

  const filteredTools = TOOLS.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = activeCategory === "All" || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col gap-32 pb-32 bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-24 overflow-hidden bg-saas-grid">
        {/* Abstract Background Accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[140px] animate-pulse" />
          <div className="absolute top-1/3 -right-20 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px] animate-pulse delay-700" />
        </div>

        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            {/* Massive Logo & Brand Name */}
            <div className="relative group mb-16">
              <div className="absolute -inset-8 bg-primary/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Logo size="massive" className="relative" />
            </div>

            <h1 className="text-7xl md:text-9xl font-display font-black text-slate-900 dark:text-white mb-8 tracking-tighter leading-[0.85] text-balance max-w-5xl">
              Tools <span className="bg-linear-to-r from-primary via-indigo-500 to-violet-500 bg-clip-text text-transparent">Powering</span> <br />
              Your Productivity.
            </h1>

            <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto mb-16 leading-relaxed font-medium tracking-tight">
              Experience the ultra-fast, local, and privacy-first way to handle any task. 
              No accounts. No uploads. No waiting.
            </p>

            <AIPromptBar />
          </motion.div>
        </div>
      </section>

      {/* Recently Used Section */}
      {recentTools.length > 0 && !searchQuery && activeCategory === "All" && (
        <section className="container mx-auto px-6">
          <div className="glass p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 -mr-12 -mt-12 bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-1000" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <History className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Pick up where you left off</h2>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-0.5">Recently Used Tools</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recentTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} compact />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Tools Grid Section */}
      <section id="tools" className="container mx-auto px-6 scroll-mt-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-[2px] w-12 bg-primary" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">Tool Library</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
              Everything you need, <br />
              <span className="text-slate-400">right in your browser.</span>
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              Explore our collection of high-performance utilities designed for modern digital workflows.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <div className="relative w-full sm:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search tools, formats, tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-base font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
              />
            </div>
            <div className="flex items-center gap-1 p-1.5 bg-slate-100/50 dark:bg-slate-900/50 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 w-full sm:w-auto overflow-x-auto no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${activeCategory === cat
                      ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-md ring-1 ring-slate-200 dark:ring-slate-700 active:scale-95"
                      : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredTools.map((tool, index) => (
              <motion.div
                key={tool.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <ToolCard tool={tool} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-32 glass rounded-[3rem] border border-dashed border-slate-200 dark:border-slate-800 overflow-hidden relative">
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-slate-50/50 to-transparent dark:via-slate-900/50" />
            <div className="relative z-10">
              <Search className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-6" />
              <p className="text-slate-500 text-xl mb-4 font-medium italic">No tools match your current search.</p>
              <button
                onClick={() => { setSearchQuery(""); setActiveCategory("All") }}
                className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:opacity-90 transition-all active:scale-95"
              >
                Reset Search Filters
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Why Choose TurboTool Section */}
      <section id="features" className="container mx-auto px-6 max-w-7xl py-48 border-t border-slate-100 dark:border-slate-800 scroll-mt-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-24">
          {/* Section Header */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-[2px] w-8 bg-indigo-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600">Our Philosophy</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-black text-slate-900 dark:text-white mb-10 tracking-tighter leading-[0.9]">
              Built for <br />
              <span className="text-indigo-600 dark:text-indigo-400 italic">Professionals.</span>
            </h2>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-sm">
              We focus on performance, privacy, and precision so you can focus on your work.
            </p>
          </div>

          {/* Feature stacked list */}
          <div className="md:col-span-7 space-y-4">
            <FeatureRow 
              icon={<Shield className="w-8 h-8" />}
              title="End-to-End Privacy"
              description="Your data never touches a server. All computations happen locally in your browser sandbox, ensuring absolute data security and privacy."
            />
            <FeatureRow 
              icon={<Rocket className="w-8 h-8" />}
              title="Warp Speed Execution"
              description="Built with high-performance Web APIs, TurboTool delivers instant results without the latency of cloud-based processing."
            />
            <FeatureRow 
              icon={<Clock className="w-8 h-8" />}
              title="Zero Friction UX"
              description="No registrations, no cookies, no dark patterns. Just open the tool and get results in seconds. Pure utility, reinvented."
            />
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <TrustSection />

      {/* FAQ Section */}
      <section id="faq" className="container mx-auto px-6 max-w-7xl py-32 scroll-mt-24">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight text-balance">Frequently Asked Questions</h2>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-medium">Everything you need to know about the platform.</p>
          </div>

          <div className="space-y-2">
            <FAQItem
              question="Is TurboTool really free?"
              answer="Yes, 100% free. We don't charge for any tools, and there are no hidden fees or 'pro' versions. Our goal is to provide high-quality utilities for everyone without gatekeeping."
            />
            <FAQItem
              question="Is my data secure?"
              answer="Absolutely. One of our core principles is browser-only processing. This means your images and text documents are processed locally on your device and never uploaded to any server. Your privacy is guaranteed."
            />
            <FAQItem
              question="Do I need to create an account?"
              answer="No account, no login, no hassle. You can use all our tools immediately without providing any personal information, email address, or payment details."
            />
            <FAQItem
              question="Why are these tools so fast?"
              answer="Because they run entirely in your browser using modern Web APIs like Canvas, Web Workers, and WebAssembly. Experience instant results without waiting for server round-trips."
            />
          </div>
        </div>
      </section>
    </div>
  );
}


function FeatureRow({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="group p-8 md:p-12 rounded-[2rem] hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all duration-500 border border-transparent hover:border-slate-100 dark:hover:border-slate-800">
      <div className="flex flex-col sm:flex-row gap-10">
        <div className="shrink-0 w-16 h-16 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-900 dark:text-white shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
          {icon}
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">{title}</h3>
          <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`rounded-3xl transition-all duration-300 ${isOpen ? "bg-slate-50 dark:bg-slate-900/50 p-6 md:p-8" : "p-6 md:p-8 hover:bg-slate-50/50 dark:hover:bg-slate-900/30"}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left flex items-center justify-between group"
      >
        <span className={`text-xl font-bold transition-colors duration-200 ${isOpen ? "text-primary" : "text-slate-900 dark:text-white tracking-tight"}`}>
          {question}
        </span>
        <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${isOpen ? "bg-primary border-primary text-white rotate-45" : "border-slate-200 dark:border-slate-800 text-slate-400"}`}>
          <Plus className="w-4 h-4 stroke-[3]" />
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="pt-6 text-slate-500 dark:text-slate-400 text-lg leading-relaxed font-medium pr-10">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
