import { useState, useEffect } from "react";
import { ChevronRight, HelpCircle, Settings, Bell, Menu, Users } from "lucide-react";
import Link from "next/link";

interface DashboardTopBarProps {
  toolName: string;
  onMenuClick: () => void;
}

export default function DashboardTopBar({ toolName, onMenuClick }: DashboardTopBarProps) {
  const [userCount, setUserCount] = useState<number>(0);

  useEffect(() => {
    // Generate a number between 101 and 500
    const count = Math.floor(Math.random() * (500 - 101 + 1)) + 101;
    setUserCount(count);
  }, []);

  return (
    <header className="h-16 border-b border-[#E5E5E5] bg-white sticky top-0 z-40 px-4 md:px-8 flex items-center justify-between">
      <div className="flex items-center gap-4 text-sm font-medium">
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 text-slate-400 hover:text-[#111] lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>
        <Link href="/" className="hidden sm:block text-slate-400 hover:text-[#111] transition-colors">Tools</Link>
        <ChevronRight className="hidden sm:block w-4 h-4 text-slate-300" />
        <span className="text-[#111] font-bold truncate max-w-[120px] sm:max-w-none">{toolName}</span>
        
        {/* Social Proof Badge */}
        {userCount > 0 && (
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100 animate-in fade-in slide-in-from-left-2 duration-700">
            <div className="relative flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <div className="absolute w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping opacity-75" />
            </div>
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-wider">
              {userCount} users used today
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-6">
        {/* Compact Mobile Badge */}
        {userCount > 0 && (
          <div className="md:hidden flex items-center gap-1.5 px-2 py-1 bg-emerald-50 rounded-lg border border-emerald-100">
             <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
             <span className="text-[10px] font-black text-emerald-600 tracking-tighter">{userCount} Uses</span>
          </div>
        )}

        <button className="text-slate-400 hover:text-[#111] transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full border-2 border-white"></span>
        </button>
        <button className="hidden sm:block text-slate-400 hover:text-[#111] transition-colors">
          <HelpCircle className="w-5 h-5" />
        </button>
        <button className="hidden sm:block text-slate-400 hover:text-[#111] transition-colors">
          <Settings className="w-5 h-5" />
        </button>
        <div className="hidden sm:block w-px h-6 bg-[#E5E5E5]" />
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#111] text-white flex items-center justify-center text-[10px] font-bold">
            PRO
          </div>
        </div>
      </div>
    </header>
  );
}
