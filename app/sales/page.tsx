"use client";

import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SalesProducts from "@/components/SalesProducts";
import ClubKitPromo from "@/components/ClubKitPromo";
import { useLanguage } from "@/context/LanguageContext";

export default function SalesPage() {
    const router = useRouter();
    const { lang } = useLanguage();
    const currentLang = lang === "ky" || lang === "en" ? lang : "ru";

    const setActiveTab = (tab: string | null) => {
        if (!tab) {
            router.push("/");
            return;
        }
        router.push(`/?tab=${tab}`);
    };

    return (
        <main className="min-h-screen bg-[#070b14]">
            <Header activeTab={null} setActiveTab={setActiveTab} />
            <div
                className="relative overflow-hidden"
                style={{
                    background:
                        "linear-gradient(120deg, #070b14 0%, #0a192f 42%, #1a0a12 72%, #7f1d1d 100%)",
                }}
            >
                <div className="pointer-events-none absolute -left-20 top-0 h-56 w-56 rounded-full bg-red-600/35 blur-[90px]" />
                <div className="pointer-events-none absolute -right-16 bottom-0 h-52 w-52 rounded-full bg-cyan-400/20 blur-[80px]" />

                <div className="relative z-10 mx-auto max-w-6xl px-4 pt-6 md:px-8 md:pt-8">
                    <ClubKitPromo lang={currentLang} className="mb-0" />
                </div>
                <SalesProducts />
            </div>
            <Footer setActiveTab={setActiveTab} />
        </main>
    );
}
