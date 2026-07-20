import type { Metadata } from 'next';
import AboutClient from './AboutClient';
import { faqsList } from './faqs';

export const metadata: Metadata = {
  title: 'About DotnLott | AI Automation & Workflow Solutions Company',
  description: 'DotnLott builds affordable AI automation & workflow solutions for startups and SMEs. Backed by A2Z Version Pvt Ltd. Explore our story and services.',
  keywords: 'AI automation company, business process automation, workflow automation solutions, affordable AI automation India, AI agents, chatbot development, CRM automation, WhatsApp automation, Google Workspace automation',
  openGraph: {
    title: 'About DotnLott | AI Automation & Workflow Solutions Company',
    description: 'DotnLott builds affordable AI automation & workflow solutions for startups and SMEs. Backed by A2Z Version Pvt Ltd. Explore our story and services.',
    type: 'website',
    url: 'https://dotnlott.com/about',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  'name': 'DotnLott',
  'legalName': 'A2Z Version Private Limited',
  'url': 'https://dotnlott.com',
  'logo': 'https://dotnlott.com/logo-v2.png',
  'description': 'DotnLott is an AI Automation & Workflow Solutions company helping startups and SMEs automate repetitive work, streamline operations, and scale faster.',
  'foundingDate': '2026',
  'founders': [
    {
      '@type': 'Person',
      'name': 'Sonalika Samal',
      'jobTitle': 'Founder & Systems Architect',
    },
    {
      '@type': 'Person',
      'name': 'Abhishek Abhinav',
      'jobTitle': 'Founder & Software Engineer',
    },
  ],
  'address': [
    {
      '@type': 'PostalAddress',
      'addressLocality': 'Bihar',
      'addressCountry': 'IN',
      'name': 'Head Office',
    },
    {
      '@type': 'PostalAddress',
      'addressLocality': 'Odisha',
      'addressCountry': 'IN',
      'name': 'Operational Office',
    },
  ],
  'sameAs': [
    'https://www.facebook.com/DotnLott/',
    'https://www.instagram.com/dotnlott_',
    'https://www.linkedin.com/company/dotnlott',
  ],
};

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

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AboutClient />
    </>
  );
}
