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
    images: [{ url: '/logo-v2.png', width: 512, height: 512, alt: 'DotnLott Logo' }],
  },
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  'name': 'DotnLott',
  'legalName': 'A2Z Version Private Limited',
  'url': 'https://dotnlott.com',
  'logo': 'https://dotnlott.com/logo-v2.png',
  'foundingDate': '2026',
  'address': {
    '@type': 'PostalAddress',
    'addressLocality': 'Cuttack',
    'addressRegion': 'Odisha',
    'addressCountry': 'IN',
  },
  'contactPoint': [
    {
      '@type': 'ContactPoint',
      'telephone': '+91-78469-69508',
      'contactType': 'customer service',
      'email': 'connect@dotnlott.com',
      'availableLanguage': ['en', 'hi'],
    },
    {
      '@type': 'ContactPoint',
      'telephone': '+91-85441-21551',
      'contactType': 'technical support',
      'email': 'connect@dotnlott.com',
      'availableLanguage': ['en', 'hi'],
    },
  ],
  'sameAs': [
    'https://linkedin.com/company/dotnlott',
    'https://www.instagram.com/dotnlott_/',
    'https://www.facebook.com/share/19Hoq4dxVp/',
    'https://www.youtube.com/@DotnLott',
  ],
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  'name': 'DotnLott',
  'image': 'https://dotnlott.com/logo-v2.png',
  '@id': 'https://dotnlott.com/#localbusiness',
  'url': 'https://dotnlott.com',
  'telephone': '+917846969508',
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': 'Cuttack',
    'addressLocality': 'Cuttack',
    'addressRegion': 'Odisha',
    'postalCode': '753001',
    'addressCountry': 'IN',
  },
  'geo': {
    '@type': 'GeoCoordinates',
    'latitude': '20.4625',
    'longitude': '85.8793',
  },
  'openingHoursSpecification': {
    '@type': 'OpeningHoursSpecification',
    'dayOfWeek': [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    'opens': '09:00',
    'closes': '18:00',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-grow pt-24 overflow-x-hidden w-full">
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
