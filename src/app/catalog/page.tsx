import type { Metadata } from 'next';
import CatalogClient from './CatalogClient';

export const metadata: Metadata = {
  title: 'Automation Solutions & Pricing | DotnLott',
  description: 'Explore our standardized automation packages, custom AI builds, CRM sync tools, and web development pricing. Start scaling your business.',
  keywords: 'automation pricing, email automation, CRM sync, n8n integrations, web automation cost, DotnLott pricing',
  openGraph: {
    title: 'Automation Solutions & Pricing | DotnLott',
    description: 'Standardized automation packages, custom AI builds, and web development pricing for business growth.',
    type: 'website',
    images: [{ url: '/logo-v2.png', width: 512, height: 512, alt: 'DotnLott Logo' }],
  },
};

export default function Page() {
  return <CatalogClient />;
}
