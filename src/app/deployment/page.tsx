import type { Metadata } from 'next';
import DeploymentClient from './DeploymentClient';

export const metadata: Metadata = {
  title: 'Enterprise Deployment & Hosting Models | DotnLott',
  description: 'Secure, reliable cloud deployment and hosting. From VPS setups to autoscaling server clusters, we manage your software infrastructure.',
  keywords: 'managed cloud hosting, VPS deployment, AWS hosting, dedicated servers, system infrastructure, DotnLott deployment',
  openGraph: {
    title: 'Enterprise Deployment & Hosting Models | DotnLott',
    description: 'Secure, reliable cloud deployment and hosting. From VPS setups to autoscaling server clusters, we manage your software infrastructure.',
    type: 'website',
    images: [{ url: '/logo-v2.png', width: 512, height: 512, alt: 'DotnLott Logo' }],
  },
};

const deploymentFaqs = [
  {
    question: 'How is managed cloud different from dedicated deployment?',
    answer: 'Managed Cloud is hosted on DotnLott\'s shared secure infrastructure. We manage the servers, updates, backups, and security, allowing you to pay a lower monthly fee. Dedicated Deployment is hosted on a VPS owned entirely by you (AWS, Google Cloud, Hetzner, etc.). You have complete ownership of the code, database, and dedicated system resources.'
  },
  {
    question: 'Can I migrate from managed cloud to dedicated VPS later?',
    answer: 'Yes! We build all our automation suites using standardized modular code. If your business grows or your compliance needs change, you can seamlessly migrate your suites from our Managed Cloud to your own Dedicated VPS at any time.'
  },
  {
    question: 'Can you customize workflows inside the suites?',
    answer: 'Absolutely. While our suites come with standard best-practice integrations, we specialize in customizing them to fit your specific tools, forms, databases, and custom business rules. Customizations can be mapped during your onboarding phase.'
  },
  {
    question: 'Do you provide ongoing maintenance and SLA support?',
    answer: 'Yes. Managed Cloud includes standard maintenance and automatic updates. Dedicated deployments include 30 days of complimentary support, with the option to sign up for our Annual Maintenance Contract (AMC) for ongoing priority support and updates.'
  },
  {
    question: 'Can you integrate our existing software tools?',
    answer: 'Yes, we can connect with any modern tool that has an API, including Zoho, Salesforce, HubSpot, Google Sheets, Slack, WhatsApp, Stripe, Shopify, and custom legacy database software.'
  },
  {
    question: 'How long does implementation take?',
    answer: 'Standard suites deployed on Managed Cloud can be fully activated and integrated within 3 to 7 business days. Dedicated deployments or heavily customized enterprise workflows typically take 2 to 4 weeks depending on the complexity.'
  }
];

export default function Page() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': deploymentFaqs.map((faq) => ({
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
      <DeploymentClient />
    </>
  );
}
