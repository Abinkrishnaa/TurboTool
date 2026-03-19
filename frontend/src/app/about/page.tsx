import type { Metadata } from "next";
import { Shield, Zap, Globe, Box, Cpu, Lock, Layers, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Auxlify - Free, privacy-first online tools that run directly in your browser.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Left Column: Heading & Vision */}
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-[2px] w-8 bg-primary" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">About Auxlify</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-10 tracking-tighter leading-[0.9]">
                Built for <br />
                <span className="text-primary">Speed &</span><br />
                <span className="text-primary">Privacy.</span>
              </h1>
              
              <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-12 max-w-md">
                Auxlify is a modern suite of browser-native utilities designed to eliminate friction in your digital workflow. All processing happens locally—your files never leave your device.
              </p>

              <div className="space-y-8">
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-400 shrink-0 border border-slate-100 dark:border-slate-800">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-1 uppercase tracking-widest text-[10px]">Edge Computing</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">We leverage WebAssembly and modern browser engines for native-speed processing.</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-400 shrink-0 border border-slate-100 dark:border-slate-800">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-1 uppercase tracking-widest text-[10px]">Zero Tracking</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Your data never leaves your device. We use browser storage for a 100% private experience.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Story & Features */}
          <div className="lg:col-span-7 space-y-20">
            <section>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-8 tracking-tight">The Auxlify Standards</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-3">Privacy by Default</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Unlike traditional converters, Auxlify processes every bit of data locally. This isn&apos;t just a feature—it&apos;s our fundamental architecture.</p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-3">Lightning Fast</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Latency is the enemy. By executing tools in your browser, we remove server round-trips for near-instant results.</p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Globe className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-3">Works Everywhere</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Access Auxlify from any device—desktop, tablet, or mobile. All tools are fully responsive and work on iOS and Android.</p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Box className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-3">Always Free</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">No hidden fees, no subscriptions, no limits. All our tools are 100% free to use with no account required.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-8 tracking-tight">Core Technologies</h2>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-slate-400">
                  <Layers className="w-5 h-5" />
                  <span className="font-bold text-sm tracking-tight">Next.js</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Box className="w-5 h-5" />
                  <span className="font-bold text-sm tracking-tight">React</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Cpu className="w-5 h-5" />
                  <span className="font-bold text-sm tracking-tight">WebAssembly</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Shield className="w-5 h-5" />
                  <span className="font-bold text-sm tracking-tight">Browser APIs</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Lock className="w-5 h-5" />
                  <span className="font-bold text-sm tracking-tight">AI/ML</span>
                </div>
              </div>
              <p className="mt-6 text-sm text-slate-400 font-medium">Auxlify is built on top of the world&apos;s most stable and performant web technologies to ensure your workflow is never interrupted.</p>
            </section>

            <section>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-8 tracking-tight">Available Tools</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Image Tools</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Background Remover, Compressor, Resizer, Cropper, Converter</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Document Tools</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">PDF to Word, Word to PDF, PDF to Images</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Text Tools</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">OCR, JSON Formatter, AI Humanizer</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Productivity</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Password Generator, Age Calculator, Thumbnail Downloader</p>
                </div>
              </div>
            </section>

            <div className="p-8 rounded-3xl bg-primary text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 -mr-12 -mt-12 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000" />
              <div className="relative z-10">
                <h3 className="text-2xl font-black mb-4">Try Auxlify Today</h3>
                <p className="text-primary-foreground/90 mb-6 max-w-md">Our tools will always be free. If you find them useful, share them with your team or community.</p>
                <Link href="/#tools" className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary rounded-xl font-bold shadow-lg hover:scale-105 transition-all">
                  <span>Launch Tools Library</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>

            <section className="pt-8 border-t border-slate-100 dark:border-slate-800">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Contact Us</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-4">
                Have questions or suggestions? We&apos;d love to hear from you!
              </p>
              <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6">
                <p className="text-slate-700 dark:text-slate-300 font-medium">Auxlify</p>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Email: octaacebusiness@gmail.com</p>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Website: https://auxlify.online</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
