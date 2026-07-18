import type { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'Enterprise Workflow Automation & AI Web Apps | DotnLott',
  description: 'Enterprise-grade workflow automation, n8n integrations, custom AI web apps, and bespoke website development. Transform your manual processes with DotnLott.',
  keywords: 'workflow automation, n8n integrations, custom AI web apps, website development, lead outreach autopilot, Zoho CRM synchronizer, DotnLott',
  openGraph: {
    title: 'Enterprise Workflow Automation & AI Web Apps | DotnLott',
    description: 'Transform manual operations into blazing fast automatic workflows. Custom AI & Web development.',
    type: 'website',
    images: [{ url: '/logo-v2.png', width: 512, height: 512, alt: 'DotnLott Logo' }],
  },
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  'name': 'How DotnLott Automates & Deploys Your Systems',
  'description': 'Our 4-step process for analyzing, designing, deploying, and supporting custom business automations.',
  'step': [
    {
      '@type': 'HowToStep',
      'name': 'Discover (Requirements & Scoping)',
      'text': 'Identify repetitive tasks, map manual workflows, and document business rules to outline automation requirements.',
      'url': 'https://dotnlott.com/#process',
    },
    {
      '@type': 'HowToStep',
      'name': 'Design (Architecture & Prototyping)',
      'text': 'Draft visual flowcharts, setup custom webhooks, map APIs, and design database structures.',
      'url': 'https://dotnlott.com/#process',
    },
    {
      '@type': 'HowToStep',
      'name': 'Deploy (System Launch)',
      'text': 'Activate workflow suites on Managed Cloud or Dedicated VPS server arrays with full end-to-end testing.',
      'url': 'https://dotnlott.com/#process',
    },
    {
      '@type': 'HowToStep',
      'name': 'Support (Continuous Optimization)',
      'text': 'Monitor execution logs, update API versions, and offer proactive maintenance cycles to guarantee uptime.',
      'url': 'https://dotnlott.com/#process',
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <HomeClient />
    </>
  );
}
