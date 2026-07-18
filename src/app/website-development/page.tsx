import type { Metadata } from 'next';
import WebDevClient from './WebDevClient';

export const metadata: Metadata = {
  title: 'Custom Website Development | High-Performance Web Apps | DotnLott',
  description: 'Modern, fast, and SEO-optimized website development. We design premium custom web applications and business portfolios tailored to your brand.',
  keywords: 'website development, custom web app, React Nextjs developer, portfolio web design, business website, DotnLott web development',
  openGraph: {
    title: 'Custom Website Development | High-Performance Web Apps | DotnLott',
    description: 'Modern, fast, and SEO-optimized website development. We design premium custom web applications and business portfolios tailored to your brand.',
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
    answer: 'Custom Next.js sites provide near-instant loading speeds, higher conversion rates, robust security, and absolute design freedom. Furthermore, they are fully custom-integrated with automated database triggers and client notification hubs.',
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
  'hasOfferCatalog': {
    '@type': 'OfferCatalog',
    'name': 'Website Development Solutions',
    'itemListElement': [
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Corporate Portfolio Design',
          'description': 'Premium landing pages, business portfolio layouts with advanced micro-interactions.',
        },
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Headless E-commerce Solutions',
          'description': 'Tailored digital storefronts built on headless CMS, Stripe/Razorpay checkout grids.',
        },
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'SaaS & Web App Architectures',
          'description': 'Custom web applications, dashboards, client portals, databases.',
        },
      },
    ],
  },
};

export default function Page() {
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
      <WebDevClient />
    </>
  );
}
