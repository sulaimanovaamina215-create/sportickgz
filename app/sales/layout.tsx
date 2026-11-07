import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Акции",
    description: "Акции SPORTIC KGZ: детская футбольная форма, клубные комплекты и спортивная экипировка в Бишкеке.",
    alternates: { canonical: "/sales" },
};

export default function SalesLayout({ children }: { children: React.ReactNode }) {
    return children;
}
