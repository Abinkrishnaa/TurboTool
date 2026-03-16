"use client";

import { motion } from "framer-motion";
import { 
  Loader2, 
  Upload, 
  Sparkles, 
  CheckCircle, 
  Download,
  Cpu,
  RefreshCw
} from "lucide-react";

interface ProgressStatusProps {
  level: 1 | 2 | 3 | 4 | 5;
  progress: number;
  customMessage?: string;
  isClientSide?: boolean;
  isHeicConverting?: boolean;
}

export default function ProgressStatus({ 
  level, 
  progress, 
  customMessage,
  isClientSide = false,
  isHeicConverting = false
}: ProgressStatusProps) {
  
  const getStatusConfig = () => {
    if (isHeicConverting) {
      return {
        icon: RefreshCw,
        message: "Converting HEIC image...",
        color: "text-purple-600 dark:text-purple-400",
        bgColor: "bg-purple-50 dark:bg-purple-900/20",
        borderColor: "border-purple-200 dark:border-purple-800",
        progressColor: "bg-purple-600",
      };
    }

    const baseConfig = {
      1: {
        icon: Cpu,
        message: isClientSide 
          ? "Preparing your file..." 
          : "Server started. Preparing your file...",
        color: "text-blue-600 dark:text-blue-400",
        bgColor: "bg-blue-50 dark:bg-blue-900/20",
        borderColor: "border-blue-200 dark:border-blue-800",
        progressColor: "bg-blue-600",
      },
      2: {
        icon: Upload,
        message: "File uploaded successfully.",
        color: "text-blue-600 dark:text-blue-400",
        bgColor: "bg-blue-50 dark:bg-blue-900/20",
        borderColor: "border-blue-200 dark:border-blue-800",
        progressColor: "bg-blue-600",
      },
      3: {
        icon: Loader2,
        message: isClientSide 
          ? `Processing: ${progress}%` 
          : "Processing your file… please wait.",
        color: "text-orange-600 dark:text-orange-400",
        bgColor: "bg-orange-50 dark:bg-orange-900/20",
        borderColor: "border-orange-200 dark:border-orange-800",
        progressColor: "bg-orange-600",
      },
      4: {
        icon: Sparkles,
        message: "Almost ready. Finalizing your result...",
        color: "text-yellow-600 dark:text-yellow-400",
        bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
        borderColor: "border-yellow-200 dark:border-yellow-800",
        progressColor: "bg-yellow-600",
      },
      5: {
        icon: CheckCircle,
        message: isClientSide 
          ? "Complete! Your file is ready." 
          : "Your file is ready. Click below to download.",
        color: "text-green-600 dark:text-green-400",
        bgColor: "bg-green-50 dark:bg-green-900/20",
        borderColor: "border-green-200 dark:border-green-800",
        progressColor: "bg-green-600",
      },
    };

    return baseConfig[level];
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`w-full p-3 md:p-4 rounded-xl border-2 ${config.bgColor} ${config.borderColor}`}
    >
      <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
        <Icon className={`w-4 h-4 md:w-5 md:h-5 ${config.color} ${(level === 3 || isHeicConverting) ? 'animate-spin' : ''}`} />
        <span className={`text-sm md:text-base font-medium ${config.color}`}>
          {customMessage || config.message}
        </span>
      </div>
      
      <div className="relative w-full h-2 md:h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`absolute left-0 top-0 h-full ${config.progressColor} rounded-full`}
        />
      </div>
      
      <div className="flex justify-between mt-1.5 md:mt-2">
        <span className="text-xs md:text-xs font-medium text-slate-500 dark:text-slate-400">
          {progress}%
        </span>
        {level === 5 && (
          <span className="flex items-center gap-1 text-xs md:text-xs font-medium text-green-600 dark:text-green-400">
            <Download className="w-3 h-3 md:w-3.5 md:h-3.5" />
            Ready
          </span>
        )}
      </div>
    </motion.div>
  );
}
