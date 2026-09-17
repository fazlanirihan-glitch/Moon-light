import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Chiplun Online Food Ordering | Moonlight Cafe, Fakta Biriyani & Shalimar',
  description:
    'Scan, choose your restaurant, browse menus, and place direct takeaway or dine-in orders on WhatsApp in Chiplun, Maharashtra.',
  keywords: ['Chiplun food ordering', 'Moonlight Cafe', 'Fakta Biriyani', 'Shalimar Cloud Restaurant', 'WhatsApp food ordering Chiplun'],
  openGraph: {
    title: 'Chiplun Online Food Ordering',
    description: 'Order food online from top restaurants in Chiplun directly to WhatsApp.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#FAF7F2',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FAF7F2] text-stone-900 antialiased selection:bg-amber-200 selection:text-stone-900">
        {children}
      </body>
    </html>
  );
}
