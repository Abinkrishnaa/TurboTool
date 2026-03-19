import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Secure Password Generator - Create Strong & Unbreakable Passwords | Auxlify",
  description: "Generate cryptographically secure passwords instantly. Completely private, browser-based generation. Customize length, symbols, and complexity for maximum safety.",
  keywords: ["password generator", "secure password", "random password creator", "strong password generator", "create password", "online password tool"],
  alternates: {
    canonical: "/password-generator",
  },
};

export default function PasswordGeneratorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
