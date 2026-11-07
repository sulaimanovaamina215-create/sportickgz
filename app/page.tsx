"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import BenefitsSection from "@/components/BenefitsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import SalesSection from "@/components/SalesSection";
import { pathForTab } from "@/lib/nav";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const tab = params.get("tab");
        if (!tab) return;
        params.delete("tab");
        const qs = params.toString();
        router.replace(`${pathForTab(tab)}${qs ? `?${qs}` : ""}`);
    }, [router]);

    const goToTab = (tab: string | null) => {
        router.push(pathForTab(tab));
    };

    return (
        <main className="w-full max-w-full overflow-x-hidden">
            <Header activeTab={null} setActiveTab={goToTab} />
            <HeroSection />
            <SalesSection />
            <BenefitsSection />
            <TestimonialsSection />
            <Footer setActiveTab={goToTab} />
        </main>
    );
}
