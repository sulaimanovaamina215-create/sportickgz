import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Бренд DEM",
    description: "Спортивная экипировка бренда DEM в SPORTIC KGZ: форма, одежда и инвентарь в Бишкеке.",
    alternates: { canonical: "/dem" },
};

export default function DemLayout({ children }: { children: React.ReactNode }) {
    return children;
}
