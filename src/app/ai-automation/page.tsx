import type { Metadata } from 'next';
import CatalogClient from '../catalog/CatalogClient';

export const metadata: Metadata = {
  title: 'AI Automation Suites & Pricing | DotnLott',
  description: 'Explore DotnLott\'s catalog of 12 automated AI business suites and development pricing. Set up automated workflows, CRM sync tools, and custom AI chatbots.',
  keywords: 'AI automation pricing, email automation, CRM sync, workflow integrations, web automation cost, DotnLott pricing',
  openGraph: {
    title: 'AI Automation Suites & Pricing | DotnLott',
    description: 'Explore DotnLott\'s catalog of 12 automated AI business suites and development pricing. Set up automated workflows, CRM sync tools, and custom AI chatbots.',
    type: 'website',
    images: [{ url: '/catalog-og.png', width: 1200, height: 630, alt: 'DotnLott AI Automation Solutions Catalog' }],
  },
};

const catalogFaqs = [
  {
    question: 'How much does business workflow automation cost?',
    answer: 'Standardized automation suite setups at DotnLott start at ₹499 ($6) on our Managed Cloud model. Custom integrations are priced based on API complexity, webhook volume, and system requirements after a consultation call.',
  },
  {
    question: 'Can workflow automation connect our legacy CRM databases?',
    answer: 'Yes. We design custom connectors to sync legacy databases (SQL, Postgres, private REST APIs) with modern CRM systems, communication channels, and messaging endpoints to ensure absolute data consistency.',
  },
  {
    question: 'How long does it take to implement a standard automation suite?',
    answer: 'Standard suites deployed on our Managed Cloud can be fully configured, tested, and integrated with your current workspace tools within 3 to 7 business days.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  'serviceType': 'AI Workflow Automation Development',
  'provider': {
    '@type': 'LocalBusiness',
    'name': 'DotnLott',
  },
  'areaServed': 'Worldwide',
  'hasOfferCatalog': {
    '@type': 'OfferCatalog',
    'name': 'AI Automation Solutions',
    'itemListElement': [
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Email Marketing Automation Suite',
          'description': 'Prospecting, email validation, outbound cold outreach sequencing.',
        },
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Lead Routing & CRM Synchronizer',
          'description': 'Sync leads from forms/ads into your primary CRM databases.',
        },
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Office Productivity Automation Suite',
          'description': 'Shift checks, leave approvals, automated Slack and WhatsApp notifications.',
        },
      },
    ],
  },
};

export default function AiAutomationPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': catalogFaqs.map((faq) => ({
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
      <CatalogClient />
    </>
  );
}
