import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Каталог спортивной экипировки",
    description:
        "Каталог SPORTIC KGZ: футбольная и волейбольная форма, мячи, бокс, фитнес, обувь и рюкзаки оптом и в розницу в Бишкеке.",
    alternates: { canonical: "/catalog" },
};

export default function CatalogLayout({ children }: { children: React.ReactNode }) {
    return children;
}
