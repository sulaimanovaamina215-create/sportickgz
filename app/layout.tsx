import './globals.css';
import type { Viewport } from 'next';
import { LanguageProvider } from '@/context/LanguageContext';
import { CartProvider } from '@/context/CartContext';

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ky">
        <body className="overflow-x-hidden bg-[#070b14] antialiased">
        <LanguageProvider>
            <CartProvider>
                {children}
            </CartProvider>
        </LanguageProvider>
        </body>
        </html>
    );
}