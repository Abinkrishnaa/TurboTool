export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <h1 className="text-4xl md:text-5xl font-display font-black text-slate-900 dark:text-white mb-8">Privacy Policy</h1>
      <div className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 space-y-8">
        <section>
          <p>
            At <strong>TurboTool</strong>, your privacy is our top priority. This Privacy Policy outlines how we handle your data when you use our free online utilities.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">1. Local Processing (Privacy by Design)</h2>
          <p>
            The most important thing to know about TurboTool is that <strong>we do not upload your files, images, or text to our servers</strong>. All processing—including background removal, image compression, and text formatting—happens entirely within your web browser using modern technologies like WebAssembly, Canvas API, and Client-side AI libraries. Your data never leaves your device.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">2. Information We Collect</h2>
          <p>We believe in minimal data collection. We do not require account registration, and we do not collect any personal information (such as names, email addresses, or phone numbers) unless you explicitly provide them through our contact forms.</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Usage Data:</strong> We use basic analytics tools (like Google Analytics) to understand which tools are most popular. This data is fully anonymized and helps us improve our service.</li>
            <li><strong>Cookies:</strong> We use cookies to remember your theme preferences (Dark/Light mode) and to ensure the site functions correctly.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">3. Advertising & Cookies</h2>
          <p>We use Google AdSense to serve advertisements on our site. Google uses cookies to serve ads based on your visit to this site and other sites on the Internet.</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to your sites and/or other sites on the Internet.</li>
            <li>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Ads Settings</a>.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">4. Data Security</h2>
          <p>Since your files are processed locally, we do not store them. However, we take reasonable measures to protect the integrity of our website and ensure a safe browsing experience for all users.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">5. Changes to This Policy</h2>
          <p>We may update our Privacy Policy from time to time. The latest version will always be available on this page.</p>
        </section>

        <section className="pt-8 border-t border-slate-100 dark:border-slate-800">
          <p className="text-sm italic">Last updated: March 14, 2026</p>
        </section>
      </div>
    </div>
  );
}
