import type { Metadata } from 'next';
import AboutClient from './AboutClient';
import { faqsList } from './faqs';

export const metadata: Metadata = {
  title: 'About Us & FAQs | DotnLott Automation',
  description: 'Meet Sonalika Samal and the team behind DotnLott, understand our legal private limited infrastructure, and find answers to frequently asked questions about our automation services.',
  keywords: 'about DotnLott, Sonalika Samal founder, automation agency FAQs, workflow outsourcing, private limited company CIN, Cuttack automation',
  openGraph: {
    title: 'About Us & FAQs | DotnLott Automation',
    description: 'Meet Sonalika Samal and the team behind DotnLott. Learn about our private limited registration, secure setups, and service guarantees.',
    type: 'website',
    images: [{ url: '/logo-v2.png', width: 512, height: 512, alt: 'DotnLott Logo' }],
  },
};

export default function Page() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqsList.map((faq) => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AboutClient />
    </>
  );
}
