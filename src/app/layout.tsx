import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/hooks/useAuth';
import { NotificationProvider } from '@/contexts/NotificationContext';

export const metadata: Metadata = {
  title: 'Digital Project Marketplace - Buy & Sell Digital Projects',
  description: 'The premier platform for buying and selling digital projects, applications, websites, and software solutions. Connect with talented developers and entrepreneurs.',
  keywords: 'digital projects, buy projects, sell projects, applications, websites, software solutions, SaaS, marketplace',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="font-tajawal bg-soft-white">
        <AuthProvider>
          <NotificationProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </NotificationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}