import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Волейбольные мячи MOLTEN и MIKASA",
    description:
        "Волейбольные мячи в Бишкеке: MOLTEN, MIKASA V200W, V300W, Official и FIV3. SPORTIC KGZ, пр. Чуй 186. Оптом и в розницу.",
    alternates: { canonical: "/volleyball/" },
    openGraph: {
        url: "/volleyball/",
        title: "Волейбольные мячи MOLTEN и MIKASA",
        description:
            "Волейбольные мячи в Бишкеке: MOLTEN, MIKASA V200W, V300W, Official и FIV3. SPORTIC KGZ, пр. Чуй 186.",
    },
    keywords: [
        "волейбольный мяч",
        "волейбол тобу",
        "Mikasa V200W",
        "Mikasa V300W",
        "Molten FIV3",
        "волейбол Бишкек",
    ],
};

export default function VolleyballLayout({ children }: { children: React.ReactNode }) {
    return children;
}
