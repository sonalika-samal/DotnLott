import type { Metadata } from 'next';
import WebDevClient from '../website-development/WebDevClient';

export const metadata: Metadata = {
  title: 'Custom Website Development | High-Performance Web Apps | DotnLott Ad Landing',
  description: 'Modern, fast, and SEO-optimized website development. We design premium custom web applications and business portfolios tailored to your brand.',
};

export default function WebsiteDevLatestPage() {
  return <WebDevClient />;
}
