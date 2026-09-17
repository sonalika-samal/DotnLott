import type { Metadata } from 'next';
import CareerClient from './CareerClient';

export const metadata: Metadata = {
  title: 'Careers & Open Roles | Join DotnLott AI & Web Studio',
  description:
    'Explore exciting career opportunities at DotnLott. We are hiring Sales and Business Development Associates, AI Automation Engineers, Full-Stack Web Developers, and UI/UX Designers.',
  keywords:
    'DotnLott careers, DotnLott jobs, sales and business development associate, AI automation engineer jobs, Next.js developer hiring, remote tech jobs India, Odisha tech careers',
  openGraph: {
    title: 'Careers & Open Roles | Join DotnLott AI & Web Studio',
    description:
      'Explore exciting career opportunities at DotnLott. Join our mission to build cutting-edge autonomous AI workflows and high-speed web products.',
    type: 'website',
  },
  alternates: {
    canonical: '/career',
  },
};

const careerSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  'name': 'Careers at DotnLott',
  'description':
    'Explore career opportunities at DotnLott. Apply for Sales & Business Development, AI Automation, Full Stack Development, and UI/UX Design positions.',
  'publisher': {
    '@type': 'Organization',
    'name': 'DotnLott',
    'legalName': 'A2Z Version Private Limited',
    'url': 'https://dotnlott.com',
    'email': 'connect@dotnlott.com',
    'telephone': '+91-78469-69508',
  },
};

export default function CareerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(careerSchema) }}
      />
      <CareerClient />
    </>
  );
}
