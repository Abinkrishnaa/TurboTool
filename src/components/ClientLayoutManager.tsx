"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ClientLayoutManager({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  
  // Dashboard routes usually start with specific paths or are just not these static ones.
  // We'll keep the logic simple for now: Home and Legacy Static pages get Navbar/Footer.
  const isLegacyStatic = ["/about", "/contact", "/privacy", "/terms"].includes(pathname);
  
  if (isHome) {
    return (
      <>
        <Navbar />
        <main className="flex-grow pt-24">
          {children}
        </main>
        <Footer />
      </>
    );
  }

  if (isLegacyStatic) {
    return (
      <>
        <Navbar />
        <main className="flex-grow pt-32">
          {children}
        </main>
        <Footer />
      </>
    );
  }

  // Dashboard / Tool pages handle their own Layout (DashboardLayout)
  return (
    <main className="flex-grow">
      {children}
    </main>
  );
}
