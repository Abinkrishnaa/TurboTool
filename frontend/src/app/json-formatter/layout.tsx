import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Formatter - Prettify, Validate & Minify JSON Online | TurboTool",
  description: "Make your JSON data readable. Professional formatter with syntax validation, minification, and real-time previews. 100% private, browser-based processing.",
  keywords: ["json formatter", "pretty print json", "json validator", "beautify json", "minify json", "json parser"],
  alternates: {
    canonical: "/json-formatter",
  },
};

export default function JsonFormatterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
