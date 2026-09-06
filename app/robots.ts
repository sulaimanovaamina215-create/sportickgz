import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
        },
        sitemap: 'https://sportic.kg/sitemap.xml',
        host: 'https://sportic.kg',
    };
}
