import SiteShell from "@/components/SiteShell";
import { VolleyballList } from "@/components/VolleyballBallsView";
import { volleyballBalls } from "@/data/volleyballBalls";
import { siteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function VolleyballPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Волейбольные мячи SPORTIC KGZ",
        itemListElement: volleyballBalls.map((ball, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${siteUrl}/volleyball/${ball.slug}/`,
            name: ball.title.ru,
        })),
    };

    return (
        <SiteShell activeTab="wholesale">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <VolleyballList balls={volleyballBalls} />
        </SiteShell>
    );
}
