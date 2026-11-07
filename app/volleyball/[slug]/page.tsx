import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteShell from "@/components/SiteShell";
import { VolleyballProduct } from "@/components/VolleyballBallsView";
import { ballBySlug, volleyballBalls } from "@/data/volleyballBalls";
import { siteUrl } from "@/lib/seo";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
    return volleyballBalls.map((ball) => ({ slug: ball.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const ball = ballBySlug(slug);
    if (!ball) return {};
    return {
        title: ball.title.ru,
        description: ball.description.ru,
        alternates: { canonical: `/volleyball/${ball.slug}/` },
        openGraph: {
            url: `/volleyball/${ball.slug}/`,
            title: ball.title.ru,
            description: ball.description.ru,
            images: [{ url: ball.photo, alt: ball.title.ru }],
        },
    };
}

export default async function VolleyballBallPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const ball = ballBySlug(slug);
    if (!ball) notFound();

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: ball.title.ru,
        description: ball.description.ru,
        image: `${siteUrl}${ball.photo}`,
        sku: ball.slug,
        brand: { "@type": "Brand", name: ball.brand },
        offers: {
            "@type": "Offer",
            url: `${siteUrl}/volleyball/${ball.slug}/`,
            priceCurrency: "KGS",
            price: ball.price,
            availability: "https://schema.org/InStock",
            seller: { "@type": "SportingGoodsStore", name: "SPORTIC KGZ" },
        },
    };

    return (
        <SiteShell activeTab="wholesale">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <VolleyballProduct ball={ball} />
        </SiteShell>
    );
}
