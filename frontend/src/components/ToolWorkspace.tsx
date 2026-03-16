"use client";

import { motion } from "framer-motion";
import { 
  Shield, 
  Zap, 
  Globe, 
  Lock, 
  Star, 
  ImageIcon, 
  FileDown, 
  Search, 
  Sliders, 
  Zap as Quick
} from "lucide-react";

const ICON_MAP: Record<string, any> = {
  shield: Shield,
  zap: Zap,
  globe: Globe,
  lock: Lock,
  star: Star,
  image: ImageIcon,
  download: FileDown,
  search: Search,
  sliders: Sliders,
  quick: Quick
};

interface InfoBadgeProps {
  iconId: string;
  label: string;
}

const InfoBadge = ({ iconId, label }: InfoBadgeProps) => {
  const Icon = ICON_MAP[iconId] || InfoBadge;
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E5E5E5] bg-slate-50/50">
      <Icon className="w-3.5 h-3.5 text-slate-400" />
      <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{label}</span>
    </div>
  );
};

interface FeatureBlockProps {
  iconId: string;
  title: string;
  description: string;
}

const FeatureBlock = ({ iconId, title, description }: FeatureBlockProps) => {
  const Icon = ICON_MAP[iconId] || Star;
  return (
    <div className="space-y-3 text-left">
      <div className="w-10 h-10 rounded-lg bg-slate-50 border border-[#E5E5E5] flex items-center justify-center text-[#111]">
        <Icon className="w-5 h-5" />
      </div>
      <h4 className="text-sm font-bold text-[#111]">{title}</h4>
      <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
    </div>
  );
};

interface ToolWorkspaceProps {
  badge?: string;
  title: string;
  description: string;
  children: React.ReactNode;
  features: { iconId: string; title: string; description: string }[];
  education: {
    title: string;
    content: React.ReactNode;
  };
  relatedTools?: { name: string; description: string; href: string; iconId: string }[];
}

export default function ToolWorkspace({ 
  badge = "Free Utility", 
  title, 
  description, 
  children,
  features,
  education,
  relatedTools = []
}: ToolWorkspaceProps) {
  return (
    <div className="space-y-12">
      {/* Tool Header Section */}
      <div className="space-y-2 text-left">
        <div className="inline-block px-2 py-0.5 rounded-md border border-slate-200 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          {badge}
        </div>
        <h1 className="text-4xl font-bold text-[#111] tracking-tight">{title}</h1>
        <p className="text-sm font-medium text-slate-500 max-w-2xl">{description}</p>
      </div>

      {/* Main Tool Area (Primary Card) */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border border-[#E5E5E5] shadow-[0_1px_3px_rgba(0,0,0,0.02)] p-8 md:p-12 overflow-hidden"
      >
        <div className="max-w-4xl mx-auto">
          {children}
        </div>

        {/* Info Badges Row */}
        <div className="mt-12 pt-8 border-t border-[#F5F5F5] flex flex-wrap gap-4 justify-center">
          <InfoBadge iconId="shield" label="100% Secure" />
          <InfoBadge iconId="zap" label="Instant Processing" />
          <InfoBadge iconId="globe" label="Works in Browser" />
          <InfoBadge iconId="lock" label="No Upload Required" />
        </div>
      </motion.div>

      {/* Feature Explanation Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-8">
        {features.map((f, i) => (
          <FeatureBlock key={i} {...f} />
        ))}
      </div>

      {/* Educational Section */}
      <div className="border-t border-[#E5E5E5] pt-16 text-left">
        <div className="max-w-[700px]">
          <h2 className="text-2xl font-bold text-[#111] mb-6">{education.title}</h2>
          <div className="prose prose-slate prose-sm prose-p:leading-relaxed prose-p:text-slate-500 dark:prose-invert">
            {education.content}
          </div>
        </div>
      </div>

      {/* Related Tools Section - Internal Linking Booster */}
      {relatedTools.length > 0 && (
        <div className="border-t border-[#E5E5E5] pt-16 pb-24">
          <h2 className="text-xl font-bold text-[#111] mb-8 text-left">Related Tools you might need</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedTools.map((tool) => (
              <a 
                key={tool.href} 
                href={tool.href}
                className="group p-4 rounded-xl border border-[#E5E5E5] bg-white hover:border-[#111] transition-all flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-[#111] group-hover:bg-slate-100 transition-colors">
                  {/* Reuse ICON_MAP logic if needed, but for simplicity we keep it minimal */}
                  <span className="text-xs font-bold uppercase tracking-tighter">TOOL</span>
                </div>
                <div className="text-left overflow-hidden">
                  <h4 className="text-sm font-bold text-[#111] truncate">{tool.name}</h4>
                  <p className="text-[10px] text-slate-400 truncate">{tool.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
