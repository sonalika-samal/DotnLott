import type { Metadata } from 'next';
import PortfolioClient from './PortfolioClient';

export const metadata: Metadata = {
  title: 'Case Studies & Automation Results | DotnLott',
  description: 'Review our custom web development and workflow automation case studies. Real metrics and response rates achieved for enterprise clients globally.',
  keywords: 'workflow automation case studies, CRM integration portfolio, custom AI app portfolio, DotnLott portfolio, web app results',
  openGraph: {
    title: 'Case Studies & Automation Results | DotnLott',
    description: 'Review our custom web development and workflow automation case studies. Real metrics and response rates achieved for enterprise clients globally.',
    type: 'website',
    images: [{ url: '/portfolio-og.png', width: 1200, height: 630, alt: 'DotnLott Custom Case Studies' }],
  },
};

export default function Page() {
  return <PortfolioClient />;
}
