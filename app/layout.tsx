import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import dynamic from 'next/dynamic';

const ClientConditionalLayout = dynamic(() => import('@/components/ClientConditionalLayout'), { 
  ssr: false 
});

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Agrob - Sustainable Future Insights',
  description: 'Discover the latest trends and insights in sustainable agriculture and farming practices.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientConditionalLayout>
          {children}
        </ClientConditionalLayout>
      </body>
    </html>
  );
}