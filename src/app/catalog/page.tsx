import type { Metadata } from 'next';
import CatalogClient from './CatalogClient';

export const metadata: Metadata = {
  title: 'Automation Solutions & Pricing | DotnLott',
  description: 'Explore our standardized automation packages, custom AI builds, CRM sync tools, and web development pricing. Start scaling your business.',
  keywords: 'automation pricing, email automation, CRM sync, n8n integrations, web automation cost, DotnLott pricing',
  openGraph: {
    title: 'Automation Solutions & Pricing | DotnLott',
    description: 'Standardized automation packages, custom AI builds, and web development pricing for business growth.',
    type: 'website',
    images: [{ url: '/logo-v2.png', width: 512, height: 512, alt: 'DotnLott Logo' }],
  },
};

const catalogFaqs = [
  {
    question: 'How much does business workflow automation cost?',
    answer: 'Standardized automation suite setups at DotnLott start at ₹499 ($6) on our Managed Cloud model. Custom integrations are priced based on API complexity, webhook volume, and system requirements after a consultation call.',
  },
  {
    question: 'Can workflow automation connect our legacy CRM databases?',
    answer: 'Yes. We design custom connectors to sync legacy databases (SQL, Postgres, private REST APIs) with modern platforms like Zoho, Slack, and WhatsApp to ensure absolute data consistency.',
  },
  {
    question: 'How long does it take to implement a standard automation suite?',
    answer: 'Standard suites deployed on our Managed Cloud can be fully configured, tested, and integrated with your current workspace tools within 3 to 7 business days.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  'serviceType': 'Workflow Automation Development',
  'provider': {
    '@type': 'LocalBusiness',
    'name': 'DotnLott',
  },
  'areaServed': 'Worldwide',
  'hasOfferCatalog': {
    '@type': 'OfferCatalog',
    'name': 'Automation Solutions',
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
          'description': 'Sync leads from forms/ads into Zoho, Salesforce or HubSpot CRMs.',
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

export default function Page() {
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
