import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date();
    return [
        { url: 'https://sportic.kg', lastModified, changeFrequency: 'weekly', priority: 1 },
        { url: 'https://sportic.kg/catalog', lastModified, changeFrequency: 'weekly', priority: 0.9 },
        { url: 'https://sportic.kg/dem', lastModified, changeFrequency: 'weekly', priority: 0.8 },
        { url: 'https://sportic.kg/sales', lastModified, changeFrequency: 'weekly', priority: 0.8 },
        { url: 'https://sportic.kg/about', lastModified, changeFrequency: 'monthly', priority: 0.6 },
        { url: 'https://sportic.kg/contacts', lastModified, changeFrequency: 'monthly', priority: 0.7 },
        { url: 'https://sportic.kg/volleyball', lastModified, changeFrequency: 'weekly', priority: 0.9 },
        { url: 'https://sportic.kg/volleyball/molten-green-red-white', lastModified, changeFrequency: 'weekly', priority: 0.8 },
        { url: 'https://sportic.kg/volleyball/v200w-yellow-blue', lastModified, changeFrequency: 'weekly', priority: 0.8 },
        { url: 'https://sportic.kg/volleyball/mikasa-v300w', lastModified, changeFrequency: 'weekly', priority: 0.8 },
        { url: 'https://sportic.kg/volleyball/mikasa-official', lastModified, changeFrequency: 'weekly', priority: 0.8 },
        { url: 'https://sportic.kg/volleyball/molten-fiv3', lastModified, changeFrequency: 'weekly', priority: 0.8 },
        { url: 'https://sportic.kg/volleyball/mikasa-v200w-original', lastModified, changeFrequency: 'weekly', priority: 0.8 },
    ];
}
