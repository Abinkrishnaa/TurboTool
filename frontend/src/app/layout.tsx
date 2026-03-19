import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ClientLayoutManager from "@/components/ClientLayoutManager";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "Auxlify - Professional Free Online Utilities",
    template: "%s | Auxlify",
  },
  description: "Fast, privacy-first tools that run directly in your browser. Compress images, format JSON, count words, and more without any data leaving your device.",
  keywords: ["online tools", "privacy first", "free utilities", "image compressor", "json formatter", "developer tools"],
  authors: [{ name: "Auxlify Team" }],
  creator: "Auxlify",
  publisher: "Auxlify",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://auxlify.online"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://auxlify.online",
    siteName: "Auxlify",
    title: "Auxlify - Professional Free Online Utilities",
    description: "Fast, privacy-first tools that run directly in your browser.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Auxlify - Professional Free Online Utilities",
      },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Auxlify",
  },
  twitter: {
    card: "summary_large_image",
    title: "Auxlify - Professional Free Online Utilities",
    description: "Fast, privacy-first tools that run directly in your browser.",
    images: ["/og-image.png"],
    creator: "@turbotool",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://auxlify.online/#website",
        "url": "https://auxlify.online",
        "name": "Auxlify",
        "description": "Professional, privacy-first web utilities and productivity tools.",
        "publisher": {
          "@id": "https://auxlify.online/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://auxlify.online/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Organization",
        "@id": "https://auxlify.online/#organization",
        "name": "Auxlify",
        "url": "https://auxlify.online",
        "logo": {
          "@type": "ImageObject",
          "url": "https://auxlify.online/icon.png"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "octaacebusiness@gmail.com",
          "contactType": "customer support"
        }
      }
    ]
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/icon.png" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Y3Y4RC1JGM"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Y3Y4RC1JGM');
          `}
        </Script>
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 flex flex-col min-h-screen`}
      >
        <ClientLayoutManager>
          {children}
        </ClientLayoutManager>
      </body>
    </html>
  );
}
