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
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
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