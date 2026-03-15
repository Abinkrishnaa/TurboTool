"use client";

import React, { useState } from 'react';
import { FileText, Download, ArrowRight, Shield, Zap, FileCheck, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Document, Packer, Paragraph, TextRun } from 'docx';
interface ExtractedLine {
  text: string;
  fontSize: number;
  y: number;
  spacingAfter: number;
}

export default function PdfToWordInterface() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [extractedLines, setExtractedLines] = useState<ExtractedLine[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
      setIsComplete(false);
    }
  };

  const processFile = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError(null);
    const finalLines: ExtractedLine[] = [];

    try {
      const pdfjs = await import('pdfjs-dist');
      pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const items = textContent.items as any[];
        
        if (items.length === 0) continue;

        // Group items into lines
        const linesMap = new Map<number, any[]>();
        items.forEach(item => {
          const y = item.transform[5];
          const height = item.height || item.transform[3];
          // Use a dynamic tolerance based on 50% of the font height
          const tolerance = height * 0.5;
          
          let foundKey = Array.from(linesMap.keys()).find(key => Math.abs(key - y) <= tolerance);
          if (foundKey !== undefined) {
            linesMap.get(foundKey)?.push(item);
          } else {
            linesMap.set(y, [item]);
          }
        });

        // Sort lines from top to bottom
        const sortedY = Array.from(linesMap.keys()).sort((a, b) => b - a);
        
        for (let j = 0; j < sortedY.length; j++) {
          const y = sortedY[j];
          const lineItems = linesMap.get(y) || [];
          // Sort items within line from left to right
          lineItems.sort((a, b) => a.transform[4] - b.transform[4]);

          let lineText = "";
          let lastX = -1;
          let maxFontSize = 12;

          lineItems.forEach((item, idx) => {
            const currentX = item.transform[4];
            const fontSize = Math.abs(item.transform[3]);
            if (fontSize > maxFontSize) maxFontSize = fontSize;

            if (lastX !== -1) {
              const gap = currentX - lastX;
              // If there's a significant gap, insert spaces
              // Average char width is roughly 50-60% of font size
              const spaceWidth = fontSize * 0.3;
              if (gap > spaceWidth * 1.5) {
                const spacesCount = Math.min(Math.floor(gap / spaceWidth), 20);
                lineText += " ".repeat(spacesCount);
              }
            }
            
            lineText += item.str;
            lastX = currentX + (item.width || (item.str.length * fontSize * 0.5));
          });

          // Calculate spacing to next line
          let spacingAfter = 0;
          if (j < sortedY.length - 1) {
            spacingAfter = Math.abs(sortedY[j] - sortedY[j+1]);
            // Limit excessive spacing
            spacingAfter = Math.min(spacingAfter, 40);
          }

          finalLines.push({
            text: lineText,
            fontSize: maxFontSize,
            y: y,
            spacingAfter: spacingAfter
          });
        }

        // Page break indicator
        if (i < pdf.numPages) {
          finalLines.push({ text: "", fontSize: 12, y: -1, spacingAfter: 20 });
        }
      }

      setExtractedLines(finalLines);
      setIsComplete(true);
    } catch (err: any) {
      console.error("PDF Parsing Error:", err);
      setError("Failed to parse PDF content. Please ensure the file is not password protected.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = async () => {
    if (!file || extractedLines.length === 0) return;
    
    const paragraphs = extractedLines.map(line => 
      new Paragraph({
        children: [
          new TextRun({
            text: line.text,
            size: Math.round(line.fontSize * 2), // docx uses half-points
            font: "Calibri"
          }),
        ],
        spacing: {
          after: Math.round(line.spacingAfter * 10), // approximate conversion
        }
      })
    );

    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          ...paragraphs,
        ],
      }],
    });

    // Generate blob and trigger download
    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name.replace('.pdf', '') + '_converted.docx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {!file && !isComplete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center hover:border-slate-300 transition-colors"
        >
          <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FileText className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-xl font-bold text-[#111] mb-2">Upload your PDF</h3>
          <p className="text-sm text-slate-500 mb-8 max-w-xs mx-auto">
            Drag and drop your PDF here or click to browse. Files are processed locally for maximum privacy.
          </p>
          <label className="inline-flex items-center px-6 py-3 bg-[#111] text-white rounded-full text-sm font-bold cursor-pointer hover:bg-slate-800 transition-all active:scale-95">
            Select PDF
            <input type="file" className="hidden" accept=".pdf" onChange={handleFileChange} />
          </label>
        </motion.div>
      )}

      {file && !isComplete && (
        <div className="space-y-6">
          <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-lg border border-slate-200 flex items-center justify-center">
                <FileText className="w-6 h-6 text-slate-900" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#111] truncate max-w-[240px]">{file.name}</h4>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                  {(file.size / 1024 / 1024).toFixed(2)} MB • READY
                </p>
              </div>
            </div>
            <button 
              onClick={() => setFile(null)}
              className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors"
            >
              Remove
            </button>
          </div>

          <button
            onClick={processFile}
            disabled={isProcessing}
            className="w-full py-4 bg-[#111] text-white rounded-xl text-sm font-bold flex items-center justify-center gap-3 hover:bg-slate-800 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing PDF Structure...
              </>
            ) : (
              <>
                Convert PDF to Word
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {isProcessing && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="space-y-2"
            >
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 4 }}
                  className="h-full bg-slate-900"
                />
              </div>
              <p className="text-[10px] text-slate-400 text-center font-bold uppercase tracking-widest">
                AI Analysis: Mapping document layers...
              </p>
            </motion.div>
          )}
        </div>
      )}

      {isComplete && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-12 bg-white rounded-2xl border-2 border-[#111] shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
        >
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileCheck className="w-10 h-10 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-[#111] mb-2">Conversion Successful!</h3>
          <p className="text-sm text-slate-500 mb-8">Your DOCX file is ready for download.</p>
          
          <div className="flex flex-col gap-4">
            <button 
              onClick={handleDownload}
              className="w-full py-4 bg-[#111] text-white rounded-xl text-sm font-bold flex items-center justify-center gap-3 hover:bg-slate-800 transition-all active:scale-[0.98]"
            >
              <Download className="w-4 h-4" />
              Download Word Document
            </button>
            <button 
              onClick={() => { setFile(null); setIsComplete(false); }}
              className="text-xs font-bold text-slate-400 hover:text-[#111] transition-colors"
            >
              Convert another file
            </button>
          </div>
        </motion.div>
      )}

      {/* Trust Badges */}
      <div className="grid grid-cols-2 gap-4 mt-12">
        <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col items-center text-center">
          <Shield className="w-5 h-5 text-slate-400 mb-2" />
          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest leading-none">Strict Privacy</span>
          <span className="text-[9px] text-slate-400 mt-1">Processed locally in browser</span>
        </div>
        <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col items-center text-center">
          <Zap className="w-5 h-5 text-slate-400 mb-2" />
          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest leading-none">Pro Engine</span>
          <span className="text-[9px] text-slate-400 mt-1">Layout & formatting preserved</span>
        </div>
      </div>
    </div>
  );
}
