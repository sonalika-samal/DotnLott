import type { Metadata } from 'next';
import AIIntegrationClient from './AIIntegrationClient';

export const metadata: Metadata = {
  title: 'Custom AI Integrations & Autonomous Agents | DotnLott',
  description: 'Implement context-aware AI chatbots, semantic search vector databases, and autonomous background AI agents into your business software.',
  keywords: 'custom AI chatbots, autonomous AI agents, semantic search database, GPT Claude integration, AI consulting, DotnLott AI integration',
  openGraph: {
    title: 'Custom AI Integrations & Autonomous Agents | DotnLott',
    description: 'Implement context-aware AI chatbots, semantic search vector databases, and autonomous background AI agents into your business software.',
    type: 'website',
    images: [{ url: '/logo-v2.png', width: 512, height: 512, alt: 'DotnLott Logo' }],
  },
};

const aiDevFaqs = [
  {
    question: 'How does DotnLott train AI chatbots on custom company documents?',
    answer: 'We index your internal PDFs, documentation, and database files into a secure semantic vector database. The AI chatbot queries this database using RAG (Retrieval-Augmented Generation), answering support questions with accurate, company-approved data.',
  },
  {
    question: 'What are autonomous background AI agents?',
    answer: 'Autonomous AI agents are system processes that run continuously to monitor inbox queues, analyze screenshots, parse emails, drafts responses, and update spreadsheets without human supervision.',
  },
  {
    question: 'Is our corporate data safe when using LLM integrations?',
    answer: 'Yes. We configure private database vectors and implement strict access controls. By using API models (like Anthropic Claude and OpenAI APIs) with data-privacy guarantees, your inputs are never used to train public foundational models.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  'serviceType': 'Custom Artificial Intelligence Integration',
  'provider': {
    '@type': 'LocalBusiness',
    'name': 'DotnLott',
  },
  'areaServed': 'Worldwide',
  'hasOfferCatalog': {
    '@type': 'OfferCatalog',
    'name': 'AI Integration Catalog',
    'itemListElement': [
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Custom AI Chatbots',
          'description': 'Conversational context-aware bots trained on company documents (RAG).',
        },
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Semantic Knowledge Base vector setups',
          'description': 'High-speed search across corporate knowledge vaults (Notion, Google Drive).',
        },
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Autonomous Background AI Agents',
          'description': 'AI workers executing sheet analytics, outreach, and ticket drafting on schedule.',
        },
      },
    ],
  },
};

export default function Page() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': aiDevFaqs.map((faq) => ({
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
      <AIIntegrationClient />
    </>
  );
}
