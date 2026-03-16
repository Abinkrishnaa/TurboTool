"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbProps {
  items: {
    label: string;
    href?: string;
  }[];
}

export default function Breadcrumbs({ items }: BreadcrumbProps) {
  return (
    <nav className="flex mb-8 overflow-x-auto whitespace-nowrap pb-2 no-scrollbar" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest">
        <li className="flex items-center">
          <Link href="/" className="text-slate-400 hover:text-primary transition-colors flex items-center gap-1">
            <Home className="w-3 h-3" />
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight className="w-3 h-3 text-slate-300 mx-1 flex-shrink-0" />
            {item.href ? (
              <Link href={item.href} className="text-slate-400 hover:text-primary transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-primary font-black">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
