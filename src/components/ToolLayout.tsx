import { Tool, TOOLS } from "@/constants/tools";
import { CheckCircle2, Zap, Shield, Star, Info } from "lucide-react";
import DashboardLayout from "./DashboardLayout";
import ToolWorkspace from "./ToolWorkspace";

interface FAQ {
  question: string;
  answer: string;
}

interface Step {
  title: string;
  description: string;
}

interface ToolLayoutProps {
  tool: Tool;
  children: React.ReactNode;
  howToSteps: Step[];
  faqs: FAQ[];
  benefits: string[];
}

export default function ToolLayout({ 
  tool, 
  children, 
  howToSteps, 
  faqs, 
  benefits 
}: ToolLayoutProps) {
  const features = [
    {
      title: "Privacy First",
      description: "100% on-device processing. No files ever leave your browser.",
      iconId: "shield"
    },
    {
      title: "Lightning Fast",
      description: "Optimized client-side algorithms for instant results.",
      iconId: "zap"
    },
    {
      title: "Always Free",
      description: "No accounts, no limits, and absolutely no hidden fees.",
      iconId: "star"
    }
  ];

  const educationContent = (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-bold text-[#111] mb-3 flex items-center gap-2">
          <Info className="w-4 h-4 text-slate-400" />
          How to use {tool.name}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {howToSteps.map((step, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-slate-100 flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-slate-500">
                {i + 1}
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#111] mb-1">{step.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-[#111] mb-3">Key Benefits</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {benefits.map((benefit, i) => (
            <li key={i} className="flex items-start gap-3 text-xs text-slate-500">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      {faqs.length > 0 && (
        <div className="pt-8 border-t border-slate-100 mt-8">
          <h3 className="text-sm font-bold text-[#111] mb-6">Frequently Asked Questions</h3>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i}>
                <h4 className="text-xs font-bold text-[#111] mb-2">{faq.question}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // Calculate related tools (same category, excluding current tool)
  const relatedTools = TOOLS
    .filter(t => t.category === tool.category && t.id !== tool.id)
    .slice(0, 3)
    .map(t => ({
      name: t.name,
      description: t.description,
      href: t.href,
      iconId: t.category.toLowerCase() // Simple mapping
    }));

  return (
    <DashboardLayout toolName={tool.name}>
      <ToolWorkspace
        badge={tool.category}
        title={tool.name}
        description={tool.longDescription}
        features={features}
        relatedTools={relatedTools}
        education={{
          title: `How to use ${tool.name}`,
          content: educationContent
        }}
      >
        {children}
      </ToolWorkspace>
    </DashboardLayout>
  );
}
