import { Mail, MessageSquare, Twitter, Github } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-display font-black text-slate-900 dark:text-white mb-8 tracking-tight text-center">
          Get in <span className="text-primary">Touch</span>
        </h1>
        
        <p className="text-xl text-slate-500 dark:text-slate-400 mb-16 leading-relaxed text-center max-w-2xl mx-auto">
          Have a question, feedback, or a feature request? We'd love to hear from you. We're always looking to improve Auxlify.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <a href="mailto:octaacebusiness@gmail.com" className="group p-8 bg-white dark:bg-slate-900 rounded-4xl border border-slate-100 dark:border-slate-800 shadow-premium hover:border-primary/50 transition-all text-center">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Mail className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Email Us</h3>
            <p className="text-slate-500">octaacebusiness@gmail.com</p>
          </a>

          <div className="p-8 bg-white dark:bg-slate-900 rounded-4xl border border-slate-100 dark:border-slate-800 shadow-premium text-center">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Twitter className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Social Media</h3>
            <p className="text-slate-500">DM us @AuxlifyOnline</p>
          </div>
        </div>

        <div className="bg-slate-900 dark:bg-slate-800 rounded-4xl p-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="relative z-10">
            <h2 className="text-3xl font-display font-black text-white mb-8">Frequently asked about support</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <h4 className="font-bold text-primary">Is there a physical office?</h4>
                <p className="text-slate-400 text-sm">We are a fully remote team focused on building high-quality digital products from anywhere in the world.</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-primary">Response time?</h4>
                <p className="text-slate-400 text-sm">We try to respond to all inquiries within 24-48 hours. Thank you for your patience!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
