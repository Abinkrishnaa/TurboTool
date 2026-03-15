"use client";

import React, { useState } from 'react';
import { Youtube, Download, Link as LinkIcon, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function YoutubeThumbnailDownloader() {
  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const extractVideoId = (url: string) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  const handleGetThumbnail = () => {
    setError(null);
    setVideoId(null);
    
    if (!url.trim()) {
      setError("Please paste a YouTube link first.");
      return;
    }

    setIsLoading(true);
    
    // Slight delay for premium feel
    setTimeout(() => {
      const id = extractVideoId(url);
      if (id) {
        setVideoId(id);
      } else {
        setError("Invalid YouTube URL. Please check the link and try again.");
      }
      setIsLoading(false);
    }, 800);
  };

  const downloadImage = async (quality: 'maxresdefault' | 'hqdefault') => {
    if (!videoId) return;
    const imageUrl = `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
    
    setIsLoading(true);
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `youtube-thumbnail-${videoId}-${quality}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download failed", err);
      // Fallback: Open in new tab if blob fetch fails (usually CORS)
      window.open(imageUrl, '_blank');
      setError("Direct download blocked by browser. Please right-click and save the image in the new tab.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <label className="block text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-widest">
          YouTube Video Link
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow">
            <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="https://www.youtube.com/watch?v=..." 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#111] dark:focus:ring-white transition-all text-slate-900 dark:text-white"
            />
          </div>
          <button 
            onClick={handleGetThumbnail}
            disabled={isLoading}
            className="px-8 py-4 bg-[#111] dark:bg-white text-white dark:text-[#111] rounded-2xl text-sm font-bold whitespace-nowrap hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Youtube className="w-4 h-4" />
                Get Thumbnail
              </>
            )}
          </button>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 flex items-center gap-2 text-red-500 text-xs font-bold bg-red-50 dark:bg-red-900/10 p-3 rounded-xl"
            >
              <AlertCircle className="w-3.5 h-3.5" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Result Section */}
      <AnimatePresence>
        {videoId && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="relative group aspect-video rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl">
              <img 
                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} 
                alt="HQ Thumbnail" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                }}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button 
                onClick={() => downloadImage('maxresdefault')}
                className="flex items-center justify-between p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl group hover:border-[#111] dark:hover:border-white transition-all shadow-sm active:scale-[0.98]"
              >
                <div className="text-left">
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 leading-none">High Resolution</span>
                  <span className="text-lg font-black text-[#111] dark:text-white">4K / 1080p</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-[#111] dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-[#111] transition-all">
                  <Download className="w-5 h-5" />
                </div>
              </button>

              <button 
                onClick={() => downloadImage('hqdefault')}
                className="flex items-center justify-between p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl group hover:border-[#111] dark:hover:border-white transition-all shadow-sm active:scale-[0.98]"
              >
                <div className="text-left">
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 leading-none">Standard Quality</span>
                  <span className="text-lg font-black text-[#111] dark:text-white">HD (High Def)</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-[#111] dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-[#111] transition-all">
                  <Download className="w-5 h-5" />
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info Badges */}
      {!videoId && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-12">
          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Original 4K</span>
            <span className="text-sm font-bold text-slate-600 dark:text-slate-300 tracking-tight">Highest Resolution</span>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">100% Free</span>
            <span className="text-sm font-bold text-slate-600 dark:text-slate-300 tracking-tight">No Accounts</span>
          </div>
          <div className="hidden sm:block p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Quick 1-Click</span>
            <span className="text-sm font-bold text-slate-600 dark:text-slate-300 tracking-tight">Instant Download</span>
          </div>
        </div>
      )}
    </div>
  );
}
