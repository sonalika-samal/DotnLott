import type { Metadata } from 'next';
import { Outfit, Inter } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/ui/FloatingWhatsApp';
import './globals.css';

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'DotnLott | Business Workflow Automation & Custom Web Apps',
  description: 'Enterprise-grade workflow automation, n8n integration, AI-powered solutions, and custom website development. Registered Pvt Ltd company serving globally.',
  keywords: 'workflow automation, n8n integrations, custom AI web apps, website development, lead outreach autopilot, Zoho CRM synchronizer, DotnLott',
  openGraph: {
    title: 'DotnLott | Business Workflow Automation & Custom Web Apps',
    description: 'Transform manual operations into blazing fast automatic workflows. Custom AI & Web development.',
    type: 'website',
    images: [{ url: '/logo.png', width: 512, height: 512, alt: 'DotnLott Logo' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f8fafc] text-slate-900 font-sans selection:bg-brand-purple/20 selection:text-slate-900">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-grow pt-24">
          {children}
        </main>

        {/* Footer */}
        <Footer />

        {/* WhatsApp Float */}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
