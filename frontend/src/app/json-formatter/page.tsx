"use client";

import { useState } from "react";
import { TOOLS } from "@/constants/tools";
import ToolLayout from "@/components/ToolLayout";
import { Copy, Trash2, Code, LayoutDashboard, AlertCircle, CheckCircle, Smartphone, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import Breadcrumbs from "@/components/Breadcrumbs";
import EducationalContent from "@/components/EducationalContent";

export default function JsonFormatterPage() {
  const tool = TOOLS.find(t => t.id === "json-formatter")!;
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://TurboTool.com" },
      { "@type": "ListItem", "position": 2, "name": "JSON Formatter", "item": "https://TurboTool.com/json-formatter" }
    ]
  };

  const formatJson = (indent: number = 2) => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, indent);
      setOutput(formatted);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setOutput("");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  const howToSteps = [
    { title: "Paste JSON", description: "Paste your raw or messy JSON data into the input field above." },
    { title: "Choose Format", description: "Click 'Prettify JSON' to organize your data with 2-space indentation." },
    { title: "Copy Result", description: "Grab your clean, formatted JSON and use it in your code or documents." }
  ];

  const faqs = [
    { question: "Is this JSON formatter free?", answer: "Yes, it is completely free to use with no limits on data size." },
    { question: "Can it validate JSON?", answer: "Yes, our formatter will notify you of any syntax errors in your JSON data." },
    { question: "Is my data secure?", answer: "Absolutely. Everything happens locally in your browser. Your data is never sent to any server." },
    { question: "What indentation does it use?", answer: "By default, it uses a standard 2-space indentation style for maximum readability." }
  ];

  const benefits = [
    "Identify syntax errors instantly with real-time validation.",
    "Improve readability of nested JSON structures.",
    "Fast and lightweight - no server processing required.",
    "Clean, professional output ready for documentation."
  ];

  return (
    <ToolLayout 
      tool={tool} 
      howToSteps={howToSteps} 
      faqs={faqs} 
      benefits={benefits}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="flex flex-col gap-8">
        <Breadcrumbs items={[{ label: "JSON Formatter" }]} />

        <div className="bg-white dark:bg-slate-900 rounded-4xl p-2 shadow-2xl border border-slate-100 dark:border-slate-800 hover-shadow transition-all duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Input Editor */}
            <div className="flex flex-col border-b lg:border-b-0 lg:border-r border-slate-50 dark:border-slate-800">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                  <Code className="w-5 h-5 text-primary" />
                  <span>Input JSON</span>
                </div>
                <button onClick={() => setInput("")} className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-widest">Clear</button>
              </div>
              <textarea
                className="w-full h-[300px] lg:h-[400px] p-6 bg-transparent border-none focus:outline-none text-sm text-slate-800 dark:text-slate-200 font-mono resize-none leading-relaxed"
                placeholder="Paste your messy JSON here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>

            {/* Output Display */}
            <div className="flex flex-col relative">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                  <LayoutDashboard className="w-5 h-5 text-emerald-500" />
                  <span>Formatted Result</span>
                </div>
                {output && (
                  <button onClick={copyToClipboard} className="text-xs font-bold text-emerald-500 hover:text-emerald-600 transition-colors uppercase tracking-widest flex items-center gap-1 active:scale-95">
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </button>
                )}
              </div>
              <div className="relative flex-grow h-[300px] lg:h-[400px]">
                <textarea
                  readOnly
                  className="w-full h-full p-6 bg-slate-50/50 dark:bg-white/5 border-none focus:outline-none text-sm text-emerald-700 dark:text-emerald-400 font-mono resize-none leading-relaxed overflow-x-auto whitespace-pre"
                  placeholder="Formatted JSON will appear here..."
                  value={output}
                />
                <AnimatePresence>
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute inset-x-4 bottom-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-2xl flex items-start gap-4 shadow-xl"
                    >
                      <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-red-600 dark:text-red-400 text-sm">Invalid JSON Syntax</p>
                        <p className="text-xs text-red-500/70">{error}</p>
                      </div>
                    </motion.div>
                  )}
                  {output && !error && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute right-8 top-8"
                    >
                      <div className="p-2 bg-emerald-500 text-white rounded-full shadow-lg">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            onClick={() => formatJson(2)}
            className="py-5 bg-primary text-white rounded-2xl font-black text-xl shadow-xl shadow-primary/20 hover:bg-primary-dark hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            <Sparkles className="w-6 h-6" />
            <span>Prettify JSON</span>
          </button>
          <button 
            onClick={() => formatJson(0)}
            className="py-5 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-2xl font-black text-xl shadow-xl shadow-slate-900/10 hover:opacity-90 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            <Smartphone className="w-6 h-6" />
            <span>Minify JSON</span>
          </button>
        </div>

        <EducationalContent 
          title="Why Use a JSON Formatter & Validator?"
          content={[
            "JSON (JavaScript Object Notation) has become the standard for data exchange on the modern web. However, raw JSON data from APIs is often 'minified'—meaning all white space is removed to save bandwidth. While efficient for machines, it's nearly impossible for humans to read or debug.",
            "Our <strong>Free Online JSON Formatter</strong> is designed to solve this. It takes your messy, unreadable JSON and transforms it into a beautifully structured, indented format. This makes it easy to identify nested objects, arrays, and values.",
            "In addition to formatting, our tool acts as a <strong>JSON Validator</strong>. If there's a missing comma, an unclosed bracket, or a syntax error, our real-time engine will pinpoint exactly where the problem is, saving you hours of manual debugging."
          ]}
          benefits={[
            "Instant Prettification: Turn minified strings into human-readable code in one click.",
            "Error Detection: Stop guessing why your API call is failing with built-in validation.",
            "DevOps Friendly: Quickly format configuration files and server responses.",
            "100% Client-Side: Your sensitive JSON data never leaves your environment."
          ]}
          faqs={[
            {
              question: "Does this tool store my JSON data?",
              answer: "No. Unlike other online formatters, TurboTools processes everything locally in your browser. Your data is never sent to our servers, ensuring total privacy for your API keys and sensitive information."
            },
            {
              question: "Can I use this tool to minify JSON?",
              answer: "Yes! Use the 'Minify JSON' button to remove all unnecessary whitespace and carriage returns, reducing the file size for storage or transmission."
            }
          ]}
        />
      </div>
    </ToolLayout>
  );
}

function Sparkles({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
    </svg>
  );
}
