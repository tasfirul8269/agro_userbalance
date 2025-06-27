'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface ClientConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ClientConditionalLayout({ children }: ClientConditionalLayoutProps) {
  const pathname = usePathname();
  
  // Check if current path is an admin route
  const isAdminRoute = pathname?.startsWith('/admin') || pathname?.startsWith('/admin-');
  
  if (isAdminRoute) {
    // For admin routes, render only the children without header/footer
    return (
      <main className="min-h-screen">
        {children}
      </main>
    );
  }
  
  // For regular routes, render with header and footer
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}