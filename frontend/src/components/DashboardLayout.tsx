"use client";

import { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardTopBar from "./DashboardTopBar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  toolName: string;
}

export default function DashboardLayout({ children, toolName }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Sidebar */}
      <DashboardSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:ml-72 min-w-0">
        <DashboardTopBar toolName={toolName} onMenuClick={() => setIsSidebarOpen(true)} />
        
        <main className="flex-grow p-4 md:p-8 lg:p-12">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

        <footer className="px-12 py-8 border-t border-[#F1F1F1] dark:border-slate-800 text-center">
          <p className="text-[11px] font-bold text-slate-300 dark:text-slate-600 uppercase tracking-widest">
            © 2026 Auxlify • Privacy-first online utilities
          </p>
        </footer>
      </div>
    </div>
  );
}
