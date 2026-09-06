import './globals.css';
import type { Metadata, Viewport } from 'next';
import { LanguageProvider } from '@/context/LanguageContext';
import { CartProvider } from '@/context/CartContext';

export const metadata: Metadata = {
    metadataBase: new URL('https://sportic.kg'),
    title: 'SPORTICKGZ — спортивная экипировка',
    description: 'Спортивная экипировка оптом и в розницу по Кыргызстану.',
    alternates: {
        canonical: '/',
    },
};

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