import type { Metadata } from 'next';
import BookingClient from './BookingClient';

export const metadata: Metadata = {
  title: 'Book a Consultation | DotnLott Automation',
  description: "Schedule a 1-on-1 strategy call with our automation experts. Let's design a custom solution to scale your business operations.",
  keywords: 'book consultation, automation strategy call, workflow audit, custom software planning, DotnLott booking',
  openGraph: {
    title: 'Book a Consultation | DotnLott Automation',
    description: "Schedule a 1-on-1 strategy call with our automation experts. Let's design a custom solution to scale your business operations.",
    type: 'website',
    images: [{ url: '/logo-v2.png', width: 512, height: 512, alt: 'DotnLott Logo' }],
  },
};

export default function Page() {
  return <BookingClient />;
}
