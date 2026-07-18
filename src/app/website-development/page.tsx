import type { Metadata } from 'next';
import WebDevClient from './WebDevClient';

export const metadata: Metadata = {
  title: 'Custom Website Development | High-Performance Web Apps | DotnLott',
  description: 'Modern, fast, and SEO-optimized website development. We design premium custom web applications and business portfolios tailored to your brand.',
  keywords: 'website development, custom web app, React Nextjs developer, portfolio web design, business website, DotnLott web development',
  openGraph: {
    title: 'Custom Website Development | High-Performance Web Apps | DotnLott',
    description: 'Modern, fast, and SEO-optimized website development. We design premium custom web applications and business portfolios tailored to your brand.',
    type: 'website',
    images: [{ url: '/logo-v2.png', width: 512, height: 512, alt: 'DotnLott Logo' }],
  },
};

export default function Page() {
  return <WebDevClient />;
}
