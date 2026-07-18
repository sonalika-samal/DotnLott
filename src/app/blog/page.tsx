import type { Metadata } from 'next';
import BlogClient from './BlogClient';

export const metadata: Metadata = {
  title: 'Automation & AI Blog | DotnLott Resources',
  description: 'Read our engineering articles and tutorials on workflow automation, n8n databases, custom AI chatbot integration, and headless Next.js web development.',
  keywords: 'n8n automation blog, AI vector database guides, custom website speed, business automation tutorials, DotnLott resources',
  openGraph: {
    title: 'Automation & AI Blog | DotnLott Resources',
    description: 'Read our engineering articles and tutorials on workflow automation, AI integration, and high-performance website development.',
    type: 'website',
    images: [{ url: '/logo-v2.png', width: 512, height: 512, alt: 'DotnLott Logo' }],
  },
};

export default function Page() {
  return <BlogClient />;
}
