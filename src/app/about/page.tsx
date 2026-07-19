import type { Metadata } from 'next';
import AboutClient from './AboutClient';
import { faqsList } from './faqs';

export const metadata: Metadata = {
  title: 'About Us & FAQs | DotnLott Automation',
  description: 'Meet Sonalika Samal and Abhishek Abhinav, the founders of DotnLott. Learn about our private limited registration (CIN), secure setups, and FAQ answers.',
  keywords: 'about DotnLott, Sonalika Samal, Abhishek Abhinav, automation agency FAQs, private limited company CIN, Cuttack web development, startup leadership',
  openGraph: {
    title: 'About Us & FAQs | DotnLott Automation',
    description: 'Meet Sonalika Samal and Abhishek Abhinav, the founders of DotnLott. Learn about our private limited registration (CIN), secure setups, and FAQ answers.',
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
