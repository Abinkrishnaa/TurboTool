import type { Metadata } from "next";
import AgeCalculatorInterface from "@/components/AgeCalculatorInterface";
import Breadcrumbs from "@/components/Breadcrumbs";
import EducationalContent from "@/components/EducationalContent";
import DashboardLayout from "@/components/DashboardLayout";
import { Calculator, Calendar, Clock, Baby, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Professional Age Calculator - Calculate Your Exact Age Online | TurboTool",
  description: "Calculate your exact age in years, months, days, hours, and minutes. Free, fast, and secure online age calculator for job applications, visas, and official forms.",
  keywords: ["age calculator", "calculate age from dob", "how old am i", "exact age calculator", "online age calculator", "birthday calculator"],
  alternates: {
    canonical: "/age-calculator",
  },
};

export default function AgeCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://TurboTool.com" },
      { "@type": "ListItem", "position": 2, "name": "Age Calculator", "item": "https://TurboTool.com/age-calculator" }
    ]
  };

  return (
    <DashboardLayout toolName="Age Calculator">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="container mx-auto px-6 py-4 max-w-7xl">
        <Breadcrumbs items={[{ label: "Age Calculator" }]} />

        <div className="text-center mb-16 mt-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <Calculator className="w-4 h-4" />
            <span className="text-xs font-black uppercase tracking-widest leading-none">Precise Tool</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-black text-slate-900 dark:text-white mb-6 tracking-tight">
            Age <span className="text-primary">Calculator</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Calculate your exact age in years, months, and days. Ideal for official forms, visa applications, and job entries.
          </p>
        </div>

        <AgeCalculatorInterface />

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {[
            {
              title: "Exact Precision",
              desc: "Get your age down to years, months, days, and even seconds lived.",
              icon: Clock
            },
            {
              title: "Official Use",
              desc: "Perfect for government forms, school admissions, and job applications.",
              icon: Calendar
            },
            {
              title: "Privacy First",
              desc: "All calculations happen in your browser. Your birth data never leaves your device.",
              icon: Baby
            }
          ].map((feature, i) => (
            <div key={i} className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 group hover:border-primary/20 transition-all hover-shadow">
              <feature.icon className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        <EducationalContent 
          title="Mastering Your Exact Age Calculation"
          content={[
            "Have you ever wondered: <em>'How old am I exactly?'</em> While most people know their age in years, official procedures often require your age down to the precise day. Our <strong>Professional Age Calculator</strong> is designed to solve this complexity by handling the calendar math—including leap years—instantly.",
            "Whether you're filling out a school admission form for your child, applying for a retirement pension, or checking your eligibility for a government visa, having the exact number is non-negotiable. Our tool ensures your documentation is 100% accurate every time.",
            "Privacy is a core tenet of TurboTools. Your date of birth is sensitive information; that's why our calculator runs entirely <strong>client-side</strong>. We never see, store, or transmit your data. It stays on your device, giving you total peace of mind for you and your family."
          ]}
          benefits={[
            "Years, months, and days breakdown for official documentation.",
            "Life milestones tracker: Calculate total weeks, hours, and minutes lived.",
            "Leap year adjustment: Advanced algorithm for absolute mathematical precision.",
            "Zero data transmission: 100% secure on-device processing."
          ]}
          faqs={[
            {
              question: "Is this age calculator accurate for leap years?",
              answer: "Yes. Our algorithm is designed to account for varying month lengths and leap year cycles, ensuring the most precise calculation possible."
            },
            {
              question: "Why does my age in days seem different on other calculators?",
              answer: "Some calculators ignore leap years or specific hour offsets. TurboTools uses the standard Gregorian calendar logic to provide the legally recognized age format used by government agencies."
            },
            {
              question: "Can I use this for calculating dates between two specific points?",
              answer: "While this version is optimized for current age calculation, it accurately measures the precise span between any birth date and the current time."
            }
          ]}
        />
      </div>
    </DashboardLayout>
  );
}
