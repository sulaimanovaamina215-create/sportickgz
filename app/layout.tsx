import './globals.css';
import type { Metadata, Viewport } from 'next';
import { LanguageProvider } from '@/context/LanguageContext';
import { CartProvider } from '@/context/CartContext';
import { organizationJsonLd, siteUrl } from '@/lib/seo';

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: 'SPORTIC KGZ — спортивная экипировка в Бишкеке',
        template: '%s | SPORTIC KGZ',
    },
    description:
        'SPORTIC KGZ (Sportic) — спортивная экипировка оптом и в розницу в Бишкеке. Футбольная и волейбольная форма, мячи, обувь, фитнес и бренд DEM. Магазин: пр. Чуй 186.',
    keywords: [
        'sportic',
        'sportic kg',
        'sportickgz',
        'спортивная экипировка Бишкек',
        'футбольная форма оптом',
        'спортивный магазин Бишкек',
        'DEM спорт',
        'форма для футбола Кыргызстан',
    ],
    alternates: {
        canonical: '/',
    },
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        type: 'website',
        locale: 'ru_RU',
        url: siteUrl,
        siteName: 'SPORTIC KGZ',
        title: 'SPORTIC KGZ — спортивная экипировка в Бишкеке',
        description:
            'Спортивная экипировка оптом и в розницу по Кыргызстану. Футбольная форма, мячи, обувь и бренд DEM.',
        images: [{ url: '/d1.png', width: 800, height: 1067, alt: 'SPORTIC KGZ' }],
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
        <html lang="ru">
            <body className="overflow-x-hidden bg-[#070b14] antialiased">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
                />
                <LanguageProvider>
                    <CartProvider>
                        {children}
                    </CartProvider>
                </LanguageProvider>
            </body>
        </html>
    );
}
