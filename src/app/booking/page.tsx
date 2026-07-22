import { redirect } from 'next/navigation';

export default function BookingPage() {
  redirect('/contact?booking=true#calendar-booking');
}
