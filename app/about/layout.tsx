import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "О нас",
    description: "SPORTIC KGZ — команда спортивного магазина в Бишкеке. Экипировка оптом и в розницу по Кыргызстану.",
    alternates: { canonical: "/about" },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return children;
}
