"use client";

import Link from "next/link";
import Logo from "./Logo";
import { Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 pt-24 pb-12 transition-colors">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-y-12 gap-x-8 mb-24">
          {/* Column 1: Image Tools */}
          <div className="md:col-span-2">
            <h4 className="text-[11px] font-bold text-slate-400 dark:text-slate-500 mb-6 uppercase tracking-[0.15em]">Image Tools</h4>
            <ul className="space-y-4">
              <li><Link href="/compress-image-online" className="text-[14px] font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors duration-200">Compress Image</Link></li>
              <li><Link href="/remove-background-from-image" className="text-[14px] font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors duration-200">BG Remover</Link></li>
              <li><Link href="/resize-image-online" className="text-[14px] font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors duration-200">Resize Image</Link></li>
              <li><Link href="/crop-image-online" className="text-[14px] font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors duration-200">Crop Image</Link></li>
              <li><Link href="/png-to-jpg-converter" className="text-[14px] font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors duration-200">PNG to JPG</Link></li>
            </ul>
          </div>

          {/* Column 2: Developer Tools */}
          <div className="md:col-span-2">
            <h4 className="text-[11px] font-bold text-slate-400 dark:text-slate-500 mb-6 uppercase tracking-[0.15em]">Dev Tools</h4>
            <ul className="space-y-4">
              <li><Link href="/json-formatter" className="text-[14px] font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors duration-200">JSON Formatter</Link></li>
              <li><Link href="/base64-encode-decode" className="text-[14px] font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors duration-200">Base64 Converter</Link></li>
              <li><Link href="/image-to-text-converter" className="text-[14px] font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors duration-200">OCR (Text)</Link></li>
              <li><Link href="/image-to-pdf-converter" className="text-[14px] font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors duration-200">Image to PDF</Link></li>
            </ul>
          </div>

          {/* Column 3: Utilities */}
          <div className="md:col-span-2">
            <h4 className="text-[11px] font-bold text-slate-400 dark:text-slate-500 mb-6 uppercase tracking-[0.15em]">Utilities</h4>
            <ul className="space-y-4">
              <li><Link href="/password-generator" className="text-[14px] font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors duration-200">Password Gen</Link></li>
              <li><Link href="/word-counter-online" className="text-[14px] font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors duration-200">Word Counter</Link></li>
              <li><Link href="/age-calculator" className="text-[14px] font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors duration-200">Age Calculator</Link></li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div className="md:col-span-2">
            <h4 className="text-[11px] font-bold text-slate-400 dark:text-slate-500 mb-6 uppercase tracking-[0.15em]">Company</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-[14px] font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors duration-200">About</Link></li>
              <li><Link href="/contact" className="text-[14px] font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors duration-200">Contact</Link></li>
              <li><Link href="/privacy" className="text-[14px] font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors duration-200">Privacy</Link></li>
              <li><Link href="/terms" className="text-[14px] font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors duration-200">Terms</Link></li>
            </ul>
          </div>

          {/* Column 5-Newsletter: Right Aligned */}
          <div className="md:col-span-4 lg:pl-12">
            <h4 className="text-[11px] font-bold text-slate-400 dark:text-slate-500 mb-6 uppercase tracking-[0.15em]">Stay Updated</h4>
            <p className="text-[14px] text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              Get notified when we launch new tools. No spam, just pure utility.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="email@example.com" 
                className="flex-grow bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-slate-950 dark:focus:ring-white transition-all placeholder:text-slate-400"
              />
              <button className="px-4 py-2 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-md text-xs font-bold hover:opacity-90 transition-all active:scale-[0.98]">
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Footer Bar */}
        <div className="pt-10 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:opacity-80 transition-all duration-500">
              <Logo showText={true} variant="grayscale" />
            </Link>
            <p className="text-[12px] font-medium text-slate-400 dark:text-slate-500 ml-2">
              © {currentYear} Auxlify. All rights reserved.
            </p>
          </div>
          
          <div className="flex gap-8">
            <Link href="#" className="text-slate-400 hover:text-slate-950 dark:hover:text-white transition-all">
              <Twitter className="w-4 h-4 fill-current" />
            </Link>
            <Link href="#" className="text-slate-400 hover:text-slate-950 dark:hover:text-white transition-all">
              <Linkedin className="w-4 h-4 fill-current" />
            </Link>
            <Link href="mailto:auxstel@gmail.com" className="text-slate-400 hover:text-slate-950 dark:hover:text-white transition-all">
              <Mail className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
