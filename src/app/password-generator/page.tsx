"use client";

import { useState, useCallback, useEffect } from "react";
import { TOOLS } from "@/constants/tools";
import ToolLayout from "@/components/ToolLayout";
import { Copy, RefreshCw, ShieldCheck, ShieldAlert, Shield, CheckCircle, Smartphone, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Breadcrumbs from "@/components/Breadcrumbs";
import EducationalContent from "@/components/EducationalContent";
export default function PasswordGeneratorPage() {
  const tool = TOOLS.find(t => t.id === "pw-gen")!;
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true
  });
  const [copied, setCopied] = useState(false);
  const [strength, setStrength] = useState({ score: 0, label: "Weak", color: "bg-red-500" });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://TurboTool.com" },
      { "@type": "ListItem", "position": 2, "name": "Password Generator", "item": "https://TurboTool.com/password-generator" }
    ]
  };

  const generatePassword = useCallback(() => {
    const charset = {
      uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      lowercase: "abcdefghijklmnopqrstuvwxyz",
      numbers: "0123456789",
      symbols: "!@#$%^&*()_+~`|}{[]:;?><,./-="
    };

    let characters = "";
    if (options.uppercase) characters += charset.uppercase;
    if (options.lowercase) characters += charset.lowercase;
    if (options.numbers) characters += charset.numbers;
    if (options.symbols) characters += charset.symbols;

    if (!characters) {
      setPassword("Please select at least one option");
      return;
    }

    let result = "";
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      result += characters.charAt(array[i] % characters.length);
    }
    setPassword(result);
    calculateStrength(result);
  }, [length, options]);

  const calculateStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length > 8) score++;
    if (pwd.length > 12) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    let label = "Weak";
    let color = "bg-red-500";
    if (score >= 4) {
      label = "Strong";
      color = "bg-emerald-500";
    } else if (score >= 2) {
      label = "Medium";
      color = "bg-amber-500";
    }
    setStrength({ score, label, color });
  };

  useEffect(() => {
    generatePassword();
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const howToSteps = [
    { title: "Choose Options", description: "Select the character types you want (uppercase, numbers, etc.) and set the length." },
    { title: "Generate", description: "Click the refresh button to generate a new strong, secure password instantly." },
    { title: "Copy & Use", description: "Use the copy button to save your password. Remember to store it in a safe place." }
  ];

  const faqs = [
    { question: "Are these passwords secure?", answer: "Yes, we use the window.crypto API which provides cryptographically strong random values." },
    { question: "Is my password stored?", answer: "Never. Your password is generated entirely in your browser and is not sent to any server." },
    { question: "What makes a password strong?", answer: "A mix of length (at least 12 characters) and variety (uppercase, numbers, and symbols) is key." },
    { question: "Why should I use this generator?", answer: "Randomly generated passwords are much harder for hackers to crack than human-created ones." }
  ];

  const benefits = [
    "Generate unbreakable passwords in milliseconds.",
    "Customize complexity based on website requirements.",
    "Completely private - zero information is shared or stored.",
    "Real-time strength meter for instant visual feedback."
  ];

  return (
    <ToolLayout 
      tool={tool} 
      howToSteps={howToSteps} 
      faqs={faqs} 
      benefits={benefits}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-3xl mx-auto space-y-8">
        <Breadcrumbs items={[{ label: "Password Generator" }]} />

        {/* Result Area */}
        <div className="bg-white dark:bg-slate-900 rounded-4xl p-6 shadow-2xl border border-slate-100 dark:border-slate-800 hover-shadow transition-all duration-500">
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-lg group-hover:bg-primary/10 transition-colors" />
            <div className="relative flex flex-col sm:flex-row items-center gap-4 bg-slate-50 dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden">
              <input 
                type="text" 
                readOnly 
                value={password}
                className="flex-grow bg-transparent border-none focus:outline-none text-xl sm:text-2xl font-mono text-center sm:text-left text-slate-900 dark:text-white"
              />
              <div className="flex items-center gap-2">
                <button 
                  onClick={generatePassword}
                  className="p-4 bg-white dark:bg-slate-900 text-slate-500 hover:text-primary rounded-2xl shadow-sm hover:shadow-md transition-all active:rotate-180 duration-500"
                >
                  <RefreshCw className="w-6 h-6" />
                </button>
                <button 
                  onClick={copyToClipboard}
                  className={`flex items-center gap-2 px-8 py-4 ${copied ? "bg-emerald-500" : "bg-primary"} text-white rounded-2xl font-black shadow-lg transition-all active:scale-95`}
                >
                  {copied ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  <span>{copied ? "Copied!" : "Copy"}</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className={`w-4 h-4 ${strength.color === "bg-emerald-500" ? "text-emerald-500" : "text-slate-400"}`} />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Strength: </span>
              <span className={`text-xs font-black uppercase tracking-widest ${strength.color.replace('bg-', 'text-')}`}>{strength.label}</span>
            </div>
            <div className="flex gap-1.5 flex-wrap justify-center">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className={`h-1.5 w-8 rounded-full transition-all duration-500 ${i <= strength.score ? strength.color : "bg-slate-100 dark:bg-slate-800"}`} />
              ))}
            </div>
          </div>
        </div>

        {/* Configuration Area */}
        <div className="bg-white dark:bg-slate-900 rounded-4xl p-8 shadow-2xl border border-slate-100 dark:border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <label className="font-display font-black text-slate-900 dark:text-white">Password Length</label>
                <span className="text-primary font-black text-2xl">{length}</span>
              </div>
              <input 
                type="range" 
                min="6" 
                max="50" 
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[10px] font-bold text-slate-400 tracking-widest uppercase">
                <span>Short</span>
                <span>Insane</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <OptionToggle label="Uppercase" active={options.uppercase} onClick={() => setOptions({...options, uppercase: !options.uppercase})} />
              <OptionToggle label="Lowercase" active={options.lowercase} onClick={() => setOptions({...options, lowercase: !options.lowercase})} />
              <OptionToggle label="Numbers" active={options.numbers} onClick={() => setOptions({...options, numbers: !options.numbers})} />
              <OptionToggle label="Symbols" active={options.symbols} onClick={() => setOptions({...options, symbols: !options.symbols})} />
            </div>
          </div>
        </div>

        <EducationalContent 
          title="The Science of Strong Passwords"
          content={[
            "In an age of increasing cyber threats, using 'password123' is no longer an option. Hackers use sophisticated 'brute-force' attacks that can crack simple passwords in seconds. A truly <strong>Secure Password</strong> must be random, long, and complex.",
            "TurboTools' <strong>Strong Password Generator</strong> uses the cryptographically secure <code>window.crypto</code> API to ensure that every character is chosen with absolute randomness. By combining uppercase letters, numbers, and symbols, you create a password that would take modern supercomputers billions of years to guess.",
            "Privacy is paramount. Unlike other online generators, we don't store your passwords. Everything is generated on your local machine, ensuring that not even we know what your new secret key is."
          ]}
          benefits={[
            "Maximum Entropy: Every password is generated with true cryptographic randomness.",
            "Length Customization: Support for up to 50 characters for ultra-secure master keys.",
            "No Server Logs: Your passwords exist only in your browser's memory.",
            "Instant Validation: Visual strength meter helps you optimize complexity."
          ]}
          faqs={[
            {
              question: "Is it safe to use an online password generator?",
              answer: "Yes, as long as it handles generation client-side. Our tool never sends your password to a server, making it just as safe as generating one on an offline computer."
            },
            {
              question: "How long should a strong password be?",
              answer: "For most accounts, 12-16 characters is sufficient. For critical infrastructure or master passwords, we recommend 24 characters or more."
            }
          ]}
        />
      </div>
    </ToolLayout>
  );
}

function OptionToggle({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between group ${
        active 
          ? "bg-primary/5 border-primary text-primary" 
          : "bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-800 text-slate-400"
      }`}
    >
      <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest truncate mr-2">{label}</span>
      <div className={`w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center transition-all ${active ? "bg-primary text-white" : "bg-slate-200 dark:bg-slate-700"}`}>
        {active && <CheckCircle className="w-3.5 h-3.5" />}
      </div>
    </button>
  );
}
