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

export default function Page() {
  return <AIIntegrationClient />;
}
