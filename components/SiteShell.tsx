"use client";

import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { pathForTab } from "@/lib/nav";

export default function SiteShell({
    activeTab,
    children,
}: {
    activeTab: string | null;
    children: React.ReactNode;
}) {
    const router = useRouter();
    const setActiveTab = (tab: string | null) => {
        router.push(pathForTab(tab));
    };

    return (
        <main className="w-full max-w-full overflow-x-hidden">
            <Header activeTab={activeTab} setActiveTab={setActiveTab} />
            {children}
            <Footer setActiveTab={setActiveTab} />
        </main>
    );
}
