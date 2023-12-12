import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from './_components/footer';
import Navbar from './_components/navbar';
import CartProvider from './_components/providers';
import ShoppingCartModal from './_components/shopping-cart-modal';
import { Lora } from '@next/font/google';
import './globals.css';

const lora = Lora({
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ecommerce UNR',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={lora.className}>
        {/* Cart Provider has to wrap the root to provide state for the whole website */}
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <ShoppingCartModal />
            {children}
            <div className="mt-auto">
              <Footer />
            </div>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
