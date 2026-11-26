export const siteUrl = "https://sportic.kg";

const organizationId = `${siteUrl}/#organization`;

export const organizationJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebSite",
            "@id": `${siteUrl}/#website`,
            url: siteUrl,
            name: "SPORTIC KGZ",
            alternateName: ["SPORTICKGZ", "Sportic", "Sportic KG"],
            inLanguage: "ru",
            publisher: { "@id": organizationId },
        },
        {
            "@type": "SportingGoodsStore",
            "@id": organizationId,
            name: "SPORTIC KGZ",
            alternateName: ["SPORTICKGZ", "Sportic", "Sportic KG"],
            url: siteUrl,
            image: `${siteUrl}/logo1.png`,
            logo: {
                "@type": "ImageObject",
                url: `${siteUrl}/logo-mark.png`,
                width: 512,
                height: 512,
            },
            telephone: ["+996700880059", "+996708880025"],
            address: {
                "@type": "PostalAddress",
                streetAddress: "пр. Чуй 186",
                addressLocality: "Бишкек",
                addressCountry: "KG",
            },
            openingHours: "Mo-Su 09:00-21:00",
            areaServed: "KG",
            description:
                "Спортивная экипировка оптом и в розницу в Бишкеке: футбольная форма, мячи, обувь, фитнес и бренд DEM.",
            sameAs: [
                "https://t.me/sporticopt",
                "https://www.instagram.com/sportic_kgz_optom",
                "https://www.instagram.com/sportic_kgz_official",
                "https://www.instagram.com/dem_sport_official",
            ],
        },
    ],
};
