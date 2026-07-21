import type { Metadata } from 'next';
import WebDevServicesClient from './WebDevServicesClient';

export const metadata: Metadata = {
  title: 'Custom Website Engineering & Web App Studio | DotnLott',
  description: 'High-performance Next.js web applications, corporate brand portfolios, and headless e-commerce platforms engineered for sub-second speed.',
  keywords: 'website development, custom web app studio, Nextjs developer, headless ecommerce, portfolio web design, DotnLott web studio',
  openGraph: {
    title: 'Custom Website Engineering & Web App Studio | DotnLott',
    description: 'High-performance Next.js web applications, corporate brand portfolios, and headless e-commerce platforms engineered for sub-second speed.',
    type: 'website',
    images: [{ url: '/logo-v2.png', width: 512, height: 512, alt: 'DotnLott Logo' }],
  },
};

const webDevFaqs = [
  {
    question: 'How long does a custom website development project take?',
    answer: 'A standard custom business website takes 2 to 4 weeks, while complex web applications with database integrations and client portals typically take 4 to 8 weeks depending on the scope.',
  },
  {
    question: 'Do you build custom ecommerce systems?',
    answer: 'Yes. We build high-performance custom ecommerce storefronts using next-generation headless CMS architectures, connecting secure payment APIs like Razorpay, Stripe, and custom inventory databases.',
  },
  {
    question: 'What are the benefits of custom code over WordPress or Shopify?',
    answer: 'Custom bespoke sites provide near-instant loading speeds, higher conversion rates, robust security, and absolute design freedom. Furthermore, they are fully custom-integrated with automated database triggers and client notification hubs.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  'serviceType': 'Custom Website Design & Software Development',
  'provider': {
    '@type': 'LocalBusiness',
    'name': 'DotnLott',
  },
  'areaServed': 'Worldwide',
};

export default function WebsiteDevPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': webDevFaqs.map((faq) => ({
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <WebDevServicesClient />
    </>
  );
}
