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

export default function Page() {
  return <DeploymentClient />;
}
