import type { Metadata } from 'next';
import PortfolioClient from './PortfolioClient';

export const metadata: Metadata = {
  title: 'Case Studies & Portfolio | DotnLott Automation',
  description: 'Real-world examples of our workflow automations, CRM integrations, and custom AI applications. Verified time-saving and efficiency results.',
  keywords: 'workflow automation case studies, CRM integration portfolio, custom AI app portfolio, DotnLott portfolio',
  openGraph: {
    title: 'Case Studies & Portfolio | DotnLott Automation',
    description: 'Verified real-world business automations, custom AI tool developments, and workflow optimization results.',
    type: 'website',
    images: [{ url: '/logo-v2.png', width: 512, height: 512, alt: 'DotnLott Logo' }],
  },
};

export default function Page() {
  return <PortfolioClient />;
}
