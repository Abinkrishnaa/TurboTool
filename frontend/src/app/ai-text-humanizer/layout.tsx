import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Text Humanizer – Convert AI Text to Natural Human Writing Free',
  description: 'Rewrite AI generated text into natural human writing instantly. Free AI text humanizer tool that improves readability and removes robotic language.',
  keywords: ['ai text humanizer', 'humanize ai writing', 'ai text to human', 'natural human writing', 'improve text readability'],
  openGraph: {
    title: 'AI Text Humanizer – Convert AI Text to Natural Human Writing Free',
    description: 'Rewrite AI generated text into natural human writing instantly. Free AI text humanizer tool that improves readability and removes robotic language.',
    url: 'https://TurboTool.com/ai-text-humanizer',
    type: 'website',
  },
  alternates: {
    canonical: 'https://TurboTool.com/ai-text-humanizer',
  }
};

export default function AIHumanizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
