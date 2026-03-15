"use client";

import { CheckCircle2 } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

interface EducationalContentProps {
  title: string;
  content: string[];
  faqs: FAQ[];
  benefits: string[];
}

export default function EducationalContent({ title, content, faqs, benefits }: EducationalContentProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="mt-24 prose dark:prose-invert max-w-none p-12 bg-white dark:bg-slate-900 rounded-4xl border border-slate-100 dark:border-slate-800 text-left">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <h2 className="text-3xl font-display font-black mb-6">{title}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-slate-600 dark:text-slate-400">
        <div className="space-y-4">
          {content.map((p, i) => (
            <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
          ))}
        </div>
        
        <div className="space-y-6">
          <h4 className="text-slate-900 dark:text-white font-black uppercase text-xs tracking-widest">Key Benefits</h4>
          <ul className="space-y-4 font-medium list-none p-0">
            {benefits.map((benefit, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
