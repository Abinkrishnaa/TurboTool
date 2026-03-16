import { Shield, Zap, Heart, Globe, Box, Cpu, Lock, Layers } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

export default function AboutPage() {
  return (
    <DashboardLayout toolName="About TurboTools">
      <div className="container mx-auto px-6 py-24 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Left Column: Heading & Vision */}
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-[2px] w-8 bg-indigo-600" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600">Our Evolution</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white mb-10 tracking-tighter leading-[0.85] text-balance">
                Built for <br />
                <span className="text-indigo-600 dark:text-indigo-400">Precision.</span>
              </h1>
              
              <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-12 max-w-md">
                TurboTools is a high-performance suite of browser-native utilities designed to eliminate friction in your digital workflow.
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

          {/* Right Column: Detailed Story & Metrics */}
          <div className="lg:col-span-7 space-y-24">
            <section>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-8 tracking-tight">The TurboTools Standards</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="p-8 rounded-[2rem] bg-slate-50/50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                  <h3 className="font-black text-slate-900 dark:text-white mb-4">Privacy by Default</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">Unlike traditional converters, TurboTools processes every bit of data locally. This isn't just a feature—it's our fundamental architecture.</p>
                </div>
                <div className="p-8 rounded-[2rem] bg-slate-50/50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                  <h3 className="font-black text-slate-900 dark:text-white mb-4">Warp-Speed UX</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">Latency is the enemy. By executing tools in your browser, we remove server round-trips for near-instant results.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-8 tracking-tight">Core Technologies</h2>
              <div className="flex flex-wrap gap-8 opacity-40 grayscale contrast-150">
                <div className="flex items-center gap-2 group cursor-default">
                  <Layers className="w-6 h-6" />
                  <span className="font-black text-lg tracking-tighter">NEXT.JS</span>
                </div>
                <div className="flex items-center gap-2 group cursor-default">
                  <Box className="w-6 h-6" />
                  <span className="font-black text-lg tracking-tighter">REACT</span>
                </div>
                <div className="flex items-center gap-2 group cursor-default">
                  <Cpu className="w-6 h-6" />
                  <span className="font-black text-lg tracking-tighter">WASM</span>
                </div>
                <div className="flex items-center gap-2 group cursor-default">
                  <Shield className="w-6 h-6" />
                  <span className="font-black text-lg tracking-tighter">BROWSER-API</span>
                </div>
              </div>
              <p className="mt-8 text-sm text-slate-400 font-medium">TurboTools is built on top of the world's most stable and performant web technologies to ensure your workflow is never interrupted.</p>
            </section>

            <div className="p-10 rounded-[3rem] bg-indigo-600 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 -mr-12 -mt-12 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000" />
              <div className="relative z-10">
                <h3 className="text-2xl font-black mb-4">Support the Mission</h3>
                <p className="text-indigo-100 mb-8 max-w-md">Our tools will always be free. If you find them useful, share them with your team or community. It helps us keep moving forward.</p>
                <a href="/" className="inline-flex items-center justify-center px-8 py-4 bg-white text-indigo-600 rounded-2xl font-black shadow-xl hover:scale-105 transition-all">
                  Launch Tools Library
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
