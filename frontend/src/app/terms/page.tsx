import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Auxlify - Read our terms and conditions for using our free online tools.",
};

export default function TermsPage() {
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
          Terms of Service
        </h1>

        <p className="text-sm text-slate-500 mb-12">
          Last updated: March 19, 2026
        </p>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              By accessing or using Auxlify (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) website at auxlify.online, including all content, tools, and services available from the Site (collectively, the &quot;Service&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, do not use the Service.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              2. Description of Service
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Auxlify provides free online tools for:
            </p>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2">
              <li>Image processing (compression, resizing, background removal, cropping)</li>
              <li>Document conversion (PDF to Word, Word to PDF)</li>
              <li>Text tools (JSON formatting, password generation)</li>
              <li>Productivity tools (age calculator, OCR)</li>
            </ul>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
              All processing occurs locally in your browser. Your files are not uploaded to our servers.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              3. User Responsibilities
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              By using our Service, you agree to:
            </p>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2">
              <li>Use the Service only for lawful purposes</li>
              <li>Not use the Service to process content you do not have rights to</li>
              <li>Not attempt to hack, disrupt, or overload the Service</li>
              <li>Not use automated tools to access the Service without permission</li>
              <li>Provide accurate information when contacting us</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              4. Intellectual Property
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              <strong>Your Content:</strong> You retain all rights to the content you process using our tools. We do not claim any ownership over content you create or modify.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>Our Content:</strong> The Service, including the design, code, logos, and trademarks, are owned by Auxlify and protected by intellectual property laws. You may not use our trademarks without prior written consent.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              5. Disclaimer of Warranties
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              We do not warrant that: (i) the Service will be uninterrupted, secure, or error-free; (ii) the results obtained from the Service will be accurate or reliable; (iii) the quality of any content processed will meet your expectations.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              6. Limitation of Liability
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL AUXLIFY, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
            </p>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2">
              <li>Your access to or use of (or inability to access or use) the Service</li>
              <li>Any content obtained from the Service</li>
              <li>Unauthorized access, use, or alteration of your transmissions or content</li>
              <li>Technical issues or failures with the Service</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              7. Indemnification
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              You agree to defend, indemnify, and hold harmless Auxlify and its affiliates, licensors, and service providers from and against any claims, liabilities, damages, judgments, awards, losses, costs, and expenses arising out of or relating to your use of the Service or violation of these Terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              8. Governing Law
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the applicable laws, without regard to its conflict of law provisions. Any disputes shall be resolved in the competent courts of the applicable jurisdiction.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              9. Changes to Terms
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              We reserve the right to modify or replace these Terms at any time at our sole discretion. If a revision is material, we will provide at least 30 days&apos; notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              10. Contact Information
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              If you have any questions about these Terms, please contact us:
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
