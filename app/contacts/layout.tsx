import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Контакты",
    description:
        "Магазин SPORTIC KGZ: Бишкек, пр. Чуй 186. Оптом: Дордой, рынок Джунхай. WhatsApp +996 700 880 059.",
    alternates: { canonical: "/contacts" },
};

export default function ContactsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
