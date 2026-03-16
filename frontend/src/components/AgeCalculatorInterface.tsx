"use client";

import { useState, useEffect } from "react";
import { Calendar, RefreshCw, Clock, Baby, ChevronRight, Hash, Hourglass } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AgeCalculatorInterface() {
  const [birthDate, setBirthDate] = useState<string>("");
  const [birthTime, setBirthTime] = useState<string>("00:00");
  const [includeTime, setIncludeTime] = useState(false);
  const [ageResults, setAgeResults] = useState<any>(null);

  const calculateAge = () => {
    if (!birthDate) return;

    const dob = new Date(includeTime ? `${birthDate}T${birthTime}` : birthDate);
    const now = new Date();

    if (dob > now) {
      alert("Birth date cannot be in the future!");
      return;
    }

    const diffMs = now.getTime() - dob.getTime();
    
    // Exact Age Calculation
    let years = now.getFullYear() - dob.getFullYear();
    let months = now.getMonth() - dob.getMonth();
    let days = now.getDate() - dob.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Totals
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = (years * 12) + months;
    const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
    const totalMinutes = Math.floor(diffMs / (1000 * 60));
    const totalSeconds = Math.floor(diffMs / 1000);

    // Next Birthday
    const nextBday = new Date(dob);
    nextBday.setFullYear(now.getFullYear());
    if (nextBday < now) {
      nextBday.setFullYear(now.getFullYear() + 1);
    }
    const daysToBday = Math.ceil((nextBday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    setAgeResults({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
      totalHours,
      totalMinutes,
      totalSeconds,
      daysToBday
    });
  };

  // Live update if includeTime is true
  useEffect(() => {
    let interval: any;
    if (includeTime && ageResults) {
      interval = setInterval(calculateAge, 1000);
    }
    return () => clearInterval(interval);
  }, [includeTime, ageResults?.totalSeconds]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-4xl p-2 shadow-2xl border border-slate-100 dark:border-slate-800 text-left">
      <div className="p-8 md:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Input Section */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-display font-black text-slate-900 dark:text-white mb-2 flex items-center gap-3">
                <Calendar className="w-8 h-8 text-primary" />
                Age Calculator
              </h2>
              <p className="text-slate-500 dark:text-slate-400">Calculate your exact age and see fun statistics.</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Date of Birth</label>
                <input 
                  type="date" 
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full p-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-2xl focus:border-primary outline-none transition-all text-lg font-bold"
                />
              </div>

              <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-2 border-slate-100 dark:border-slate-800 transition-all">
                <div className="flex-grow">
                  <p className="font-bold text-slate-900 dark:text-white">Include Birth Time</p>
                  <p className="text-xs text-slate-500">Calculate age down to the second.</p>
                </div>
                <button 
                  onClick={() => setIncludeTime(!includeTime)}
                  className={`w-14 h-8 rounded-full transition-all relative ${includeTime ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'}`}
                >
                  <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${includeTime ? 'left-7' : 'left-1'}`} />
                </button>
              </div>

              {includeTime && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Birth Time</label>
                  <input 
                    type="time" 
                    value={birthTime}
                    onChange={(e) => setBirthTime(e.target.value)}
                    className="w-full p-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-2xl focus:border-primary outline-none transition-all text-lg font-bold"
                  />
                </motion.div>
              )}

              <button 
                onClick={calculateAge}
                className="w-full py-5 bg-primary text-white rounded-2xl font-black text-xl shadow-xl shadow-primary/20 hover:bg-primary-dark hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                <RefreshCw className="w-6 h-6" />
                Calculate Age
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="relative min-h-[400px]">
            <AnimatePresence mode="wait">
              {ageResults ? (
                <motion.div 
                  key="results"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="p-8 bg-primary/5 dark:bg-primary/10 rounded-3xl border-2 border-primary/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                       <Baby className="w-24 h-24" />
                    </div>
                    <p className="text-sm font-bold text-primary uppercase tracking-widest mb-4">Your Exact Age</p>
                    <div className="space-y-2">
                       <p className="text-4xl md:text-5xl font-display font-black text-slate-900 dark:text-white leading-tight">
                         {ageResults.years} <span className="text-primary text-2xl uppercase font-black">Years</span>
                       </p>
                       <p className="text-3xl md:text-4xl font-display font-black text-slate-800 dark:text-slate-200">
                         {ageResults.months} <span className="text-slate-400 text-xl uppercase font-black">Months</span>
                       </p>
                       <p className="text-2xl md:text-3xl font-display font-black text-slate-700 dark:text-slate-300">
                         {ageResults.days} <span className="text-slate-400 text-lg uppercase font-black">Days</span>
                       </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border-2 border-slate-100 dark:border-slate-800 group hover:border-primary/30 transition-all">
                      <div className="flex items-center gap-2 text-primary mb-2">
                        <Calendar className="w-4 h-4" />
                        <p className="text-[10px] font-black uppercase tracking-widest">Next Birthday</p>
                      </div>
                      <p className="text-2xl font-black text-slate-900 dark:text-white">{ageResults.daysToBday}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Days to go</p>
                    </div>
                    <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border-2 border-slate-100 dark:border-slate-800 group hover:border-primary/30 transition-all">
                      <div className="flex items-center gap-2 text-indigo-500 mb-2">
                        <Hash className="w-4 h-4" />
                        <p className="text-[10px] font-black uppercase tracking-widest">Total Months</p>
                      </div>
                      <p className="text-2xl font-black text-slate-900 dark:text-white">{ageResults.totalMonths.toLocaleString()}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Months Lived</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] px-2 mb-2">Life in Numbers</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { label: 'Total Days', value: ageResults.totalDays, icon: Calendar, color: 'text-blue-500' },
                        { label: 'Total Weeks', value: ageResults.totalWeeks, icon: Hash, color: 'text-purple-500' },
                        { label: 'Total Hours', value: ageResults.totalHours, icon: Clock, color: 'text-emerald-500' },
                        { label: 'Total Secs', value: ageResults.totalSeconds, icon: Hourglass, color: 'text-rose-500' }
                      ].map((stat, i) => (
                        <div key={i} className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                          <div className={stat.color + " mb-1"}><stat.icon className="w-3 h-3" /></div>
                          <p className="text-xs font-black text-slate-900 dark:text-white truncate" title={stat.value.toLocaleString()}>{stat.value.toLocaleString()}</p>
                          <p className="text-[8px] text-slate-400 font-black uppercase tracking-tighter">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-4 p-8 border-4 border-dashed border-slate-50 dark:border-slate-800 rounded-4xl"
                >
                  <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center text-slate-300 dark:text-slate-700">
                    <Hourglass className="w-10 h-10 animate-pulse" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-slate-900 dark:text-white">Ready to Calculate?</p>
                    <p className="text-sm text-slate-400">Enter your date of birth to see the magic numbers of your life.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
