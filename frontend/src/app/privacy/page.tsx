import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Auxlify - Learn how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-8">
          Privacy Policy
        </h1>

        <p className="text-sm text-slate-500 mb-12">
          Last updated: March 19, 2026
        </p>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              1. Introduction
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Auxlify ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website auxlify.online, including any other media form, media channel, mobile website, or mobile application connected or related thereto (collectively, the "Site").
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              2. Information We Collect
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              We collect information that you provide directly to us, such as:
            </p>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 mb-4">
              <li>Contact information (if you contact us via email)</li>
              <li>Feedback and correspondence you provide</li>
            </ul>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              <strong>Note:</strong> Our tools process data locally in your browser. Images and files you upload are not stored on our servers after processing is complete.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              3. How We Use Your Information
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Respond to your comments and questions</li>
              <li>Monitor usage patterns and analytics</li>
              <li>Detect, prevent, and address technical issues</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              4. Cookies and Tracking Technologies
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              We use cookies and similar tracking technologies to track activity on our Site and hold certain information.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              <strong>Google Analytics:</strong> We use Google Analytics to understand how visitors interact with our Site. Google Analytics collects information such as pages visited, time spent on pages, and referral sources.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              You can opt-out of Google Analytics by installing the <a href="https://tools.google.com/dlpage/gaoptout" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a>.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              5. Third-Party Services
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              We may use third-party services that collect and monitor usage data:
            </p>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2">
              <li><strong>Google Analytics:</strong> For website analytics</li>
              <li><strong>Google Fonts:</strong> For typography</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              6. Data Security
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              We implement appropriate technical and organizational security measures to protect your information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              7. Your Rights
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2">
              <li>The right to access your personal data</li>
              <li>The right to correct inaccurate data</li>
              <li>The right to delete your personal data</li>
              <li>The right to object to processing</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              8. Children&apos;s Privacy
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Our Site is not intended for children under 13 years of age, and we do not knowingly collect personal information from children under 13.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              9. Links to Other Websites
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Our Site may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to read the privacy policies of any website you visit.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              10. Changes to This Policy
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              11. Contact Us
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6">
              <p className="text-slate-700 dark:text-slate-300 font-medium">Auxlify</p>
              <p className="text-slate-600 dark:text-slate-400">Email: octaacebusiness@gmail.com</p>
              <p className="text-slate-600 dark:text-slate-400">Website: https://auxlify.online</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
