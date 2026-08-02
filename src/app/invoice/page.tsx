import type { Metadata } from 'next';
import InvoiceClient from './InvoiceClient';

export const metadata: Metadata = {
  title: 'Invoice Portal | DotnLott Internal Tools',
  description: 'Internal invoice generation tool for DotnLott (A2Z Version Private Limited). Generate, manage, and download sales and commercial invoices.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function InvoicePage() {
  return <InvoiceClient />;
}
