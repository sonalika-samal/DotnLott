import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us | DotnLott AI Automation & Website Development',
  description: 'Get in touch with DotnLott. Reach out to Sonalika Samal & Abhishek Abhinav for custom AI workflow automation, CRM integrations, and website development.',
  keywords: 'contact DotnLott, AI automation inquiry, website development company contact, Sonalika Samal, Abhishek Abhinav, Bihar tech company, Odisha web developer',
  openGraph: {
    title: 'Contact Us | DotnLott AI Automation & Website Development',
    description: 'Get in touch with DotnLott. Reach out to Sonalika Samal & Abhishek Abhinav for custom AI workflow automation, CRM integrations, and website development.',
    type: 'website',
  },
};

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  'name': 'Contact DotnLott',
  'description': 'Contact DotnLott for AI automation, CRM workflow integrations, and custom website development.',
  'mainEntity': {
    '@type': 'Organization',
    'name': 'DotnLott',
    'legalName': 'A2Z Version Private Limited',
    'email': 'connect@dotnlott.com',
    'telephone': '+91-78469-69508',
    'address': [
      {
        '@type': 'PostalAddress',
        'addressLocality': 'Bihar',
        'addressCountry': 'IN',
        'name': 'Registered Office',
      },
      {
        '@type': 'PostalAddress',
        'addressLocality': 'Odisha',
        'addressCountry': 'IN',
        'name': 'Operational Office',
      },
    ],
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <ContactClient />
    </>
  );
}
