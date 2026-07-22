import type { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'DotnLott | AI Workflow Automation & Custom Web Development',
  description: 'Enterprise-grade workflow automation, seamless integrations, custom AI web apps, and bespoke website development. Transform your manual processes with DotnLott.',
  keywords: 'workflow automation, custom integrations, custom AI web apps, website development, lead outreach autopilot, CRM synchronizer, DotnLott',
  openGraph: {
    title: 'DotnLott | AI Workflow Automation & Custom Web Development',
    description: 'Enterprise-grade workflow automation, seamless integrations, custom AI web apps, and bespoke website development. Transform your manual processes with DotnLott.',
    type: 'website',
    images: [{ url: '/home-og.png', width: 1200, height: 630, alt: 'DotnLott AI Workflow Automation' }],
  },
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  'name': 'Our 4-Step Process for Custom Business Automations',
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
