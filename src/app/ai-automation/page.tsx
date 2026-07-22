import type { Metadata } from 'next';
import AIAutomationClient from './AIAutomationClient';

export const metadata: Metadata = {
  title: 'Autonomous AI Systems & Workflow Automation | DotnLott',
  description: 'Enterprise-grade AI automation architectures. Connect your CRMs, databases, and communication channels into 24/7 autonomous autopilots.',
  keywords: 'AI agents for business, AI automation agency India, AI automation services India, AI agent development company, Business process automation AI, AI chatbot development company India, AI workflow automation for small business, CRM automation with AI, AI agents for customer support, AI powered business automation, Custom AI agent development India, AI automation consulting, AI agents pricing India, RPA vs AI agents, AI automation for sales teams, AI email automation, AI agents for lead generation, AI automation implementation partner, Enterprise AI automation solutions, AI automation systems, workflow automation, autonomous AI agents, CRM integration, database sync, enterprise AI',
  openGraph: {
    title: 'Autonomous AI Systems & Workflow Automation | DotnLott',
    description: 'Enterprise-grade AI automation architectures. Connect your CRMs, databases, and communication channels into 24/7 autonomous autopilots.',
    type: 'website',
    images: [{ url: '/catalog-og.png', width: 1200, height: 630, alt: 'DotnLott AI Automation Solutions' }],
  },
};

const catalogFaqs = [
  {
    question: 'How much does enterprise business workflow automation cost?',
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
      <AIAutomationClient />
    </>
  );
}
