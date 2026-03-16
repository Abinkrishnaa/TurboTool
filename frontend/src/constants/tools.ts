import { 
  Eraser, 
  BoxSelect, 
  Maximize, 
  RefreshCcw, 
  FileType, 
  Image as ImageIcon,
  Type, 
  Hash, 
  ShieldCheck, 
  Calendar,
  Crop,
  UserSquare,
  Calculator,
  Code,
  Binary,
  Youtube,
  FileStack,
  Sparkles,
  FileCode
} from "lucide-react";

export interface Tool {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  icon: any;
  href: string;
  category: "Image" | "Text" | "Developer" | "Calculator";
  keywords: string[];
}

export const TOOLS: Tool[] = [
  {
    id: "bg-remover",
    name: "Background Remover",
    description: "Remove image backgrounds instantly for free using AI.",
    longDescription: "Our AI-powered tool allows you to remove the background from any image in seconds. Perfect for product photos, social media, and more.",
    icon: Eraser,
    href: "/remove-background-from-image",
    category: "Image",
    keywords: ["remove background", "transparent image", "bg remover", "free background removal"]
  },
  {
    id: "compressor",
    name: "Image Compressor",
    description: "Reduce image size without losing quality.",
    longDescription: "Fast and secure image compression. Optimize your images for the web to improve loading speeds and save storage.",
    icon: BoxSelect,
    href: "/compress-image-online",
    category: "Image",
    keywords: ["compress image", "reduce photo size", "image optimization", "kb to mb"]
  },
  {
    id: "resizer",
    name: "Image Resizer",
    description: "Change dimensions of your images quickly.",
    longDescription: "Resize your images to any custom resolution or use our presets for social media like Instagram, Twitter, and Facebook.",
    icon: Maximize,
    href: "/resize-image-online",
    category: "Image",
    keywords: ["resize image", "change image size", "image dimensions", "crop image"]
  },
  {
    id: "converter",
    name: "Image Converter",
    description: "Convert between JPG, PNG, and WEBP formats.",
    longDescription: "Universal image format converter. Switch between modern formats like WEBP for better performance or JPG for compatibility.",
    icon: RefreshCcw,
    href: "/png-to-jpg-converter",
    category: "Image",
    keywords: ["convert image", "png to jpg", "jpg to png", "webp converter"]
  },
  {
    id: "img-to-pdf",
    name: "Image to PDF Converter",
    description: "Convert Images to PDF instantly.",
    longDescription: "Merge multiple JPG, PNG, or WEBP files into a single, high-quality PDF document. 100% private and secure.",
    icon: FileType,
    href: "/image-to-pdf-converter?mode=img-to-pdf",
    category: "Image",
    keywords: ["image to pdf", "convert photo to pdf", "jpg to pdf", "png to pdf", "pdf converter"]
  },
  {
    id: "pdf-to-img",
    name: "PDF to Image Converter",
    description: "Extract images from PDF documents.",
    longDescription: "Extract high-fidelity images from any PDF file in seconds. Convert pages or specific elements into JPG/PNG formats.",
    icon: ImageIcon,
    href: "/image-to-pdf-converter?mode=pdf-to-img",
    category: "Image",
    keywords: ["pdf to image", "extract images from pdf", "pdf to jpg", "pdf to png", "pdf extractor"]
  },
  {
    id: "yt-downloader",
    name: "YouTube Thumbnail Downloader",
    description: "Download YouTube video thumbnails in 4K, 1080p, and HD.",
    longDescription: "Get high-quality thumbnails from any YouTube video in one click. Just paste the link and download the original high-resolution image instantly. Ideal for creators and designers.",
    icon: Youtube,
    href: "/youtube-thumbnail-downloader",
    category: "Image",
    keywords: ["youtube thumbnail downloader", "download youtube thumbnail", "get youtube thumbnail", "yt thumbnail hd", "4k youtube thumbnail"]
  },
  {
    id: "json-formatter",
    name: "JSON Formatter",
    description: "Prettify and validate your JSON data.",
    longDescription: "Make your JSON readable. Our formatter handles indentation, nested structures, and alerts you to syntax errors.",
    icon: Code,
    href: "/json-formatter",
    category: "Developer",
    keywords: ["json formatter", "pretty print json", "json validator", "beautify json"]
  },
  {
    id: "pw-gen",
    name: "Password Generator",
    description: "Generate secure, random passwords instantly.",
    longDescription: "Create strong, unbreakable passwords with customizable lengths and character types. Your passwords are never stored.",
    icon: ShieldCheck,
    href: "/password-generator",
    category: "Developer",
    keywords: ["password generator", "secure password", "random password", "strong password"]
  },
  {
    id: "age-calc",
    name: "Age Calculator",
    description: "Calculate your exact age in years, months, and days.",
    longDescription: "Find out exactly how old you are. Our calculator provides years, months, days, hours, and minutes since your date of birth. Perfect for official forms and applications.",
    icon: Calendar,
    href: "/age-calculator",
    category: "Calculator",
    keywords: ["age calculator", "calculate age", "how old am i", "dob calculator"]
  },
  {
    id: "img-cropper",
    name: "Image Cropper",
    description: "Crop images to any size accurately.",
    longDescription: "A professional-grade image cropper. Select from popular social media aspect ratios or crop your images to any custom dimensions with high-fidelity output.",
    icon: Crop,
    href: "/crop-image-online",
    category: "Image",
    keywords: ["crop image", "image cropper", "crop photo", "online photo editor"]
  },
  {
    id: "ocr",
    name: "Image to Text Converter",
    description: "Extract text from images and screenshots instantly.",
    longDescription: "Our professional OCR tool allows you to extract text from images, scanned documents, and screenshots for free. High-precision text recognition that runs entirely in your browser.",
    icon: FileType,
    href: "/image-to-text-converter",
    category: "Text",
    keywords: ["image to text", "ocr online", "extract text from image", "photo to text"]
  },
  {
    id: "pdf-to-word",
    name: "PDF to Word Converter",
    description: "Convert PDF documents to editable Word files.",
    longDescription: "Our professional-grade PDF to Word converter allows you to transform your PDF documents into fully editable DOCX files. Perfectly preserves layout and formatting.",
    icon: FileType,
    href: "/word-pdf-converter?mode=pdf-to-word",
    category: "Text",
    keywords: ["pdf to word", "pdf to docx", "convert pdf to editable word", "free online pdf converter"]
  },
  {
    id: "word-to-pdf",
    name: "Word to PDF Converter",
    description: "Convert Word documents to high-quality PDF files.",
    longDescription: "Transform your DOCX files into professional PDF documents instantly. 100% private and secure processing in your browser.",
    icon: FileCode,
    href: "/word-pdf-converter?mode=word-to-pdf",
    category: "Text",
    keywords: ["word to pdf", "docx to pdf", "convert word to pdf", "online word to pdf"]
  },
  {
    id: "ai-humanizer",
    name: "AI Text Humanizer",
    description: "Convert AI Generated Text into Natural Human Writing.",
    longDescription: "Our professional AI text humanizer rewrites robotic or AI-generated text to sound natural, conversational, and human-written while preserving the original meaning. Improve readability and remove robotic patterns instantly.",
    icon: UserSquare,
    href: "/ai-text-humanizer",
    category: "Text",
    keywords: ["ai text humanizer", "convert ai text to human", "humanize ai writing", "remove robotic language", "improve readability"]
  }
];
