"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import BenefitsSection from "@/components/BenefitsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import Team from "@/components/Team";
import ProductCatalog from "@/components/ProductCatalog";
import Wholesale from "@/components/Wholesale";
import Contacts from "@/components/Contacts";
import Cart from "@/components/Cart";
import SalesSection from "@/components/SalesSection";
export default function Home() {
    const [activeTab, setActiveTab] = useState<string | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const tab = new URLSearchParams(window.location.search).get("tab");
        if (tab) setActiveTab(tab);
    }, []);

    if (!isMounted) return null;

    return (
        <main className="w-full max-w-full overflow-x-hidden">
            <Header activeTab={activeTab} setActiveTab={setActiveTab} />

            {activeTab === "about" ? (
                <div className="min-h-screen">
                    <Team />
                </div>
            ) : activeTab === "catalog" ? (
                <div>
                    <div>
                        <ProductCatalog />
                    </div>
                </div>
            ) : activeTab === "wholesale" ? (
                <div className="min-h-screen">
                    <Wholesale />
                </div>
            ) : activeTab === "contacts" ? (
                <div className="min-h-screen">
                    <Contacts />
                </div>
            ) : activeTab === "cart" ? (
                <div className="min-h-screen">
                    <Cart />
                </div>
            ) : (
                <>
                    <HeroSection />
                    <SalesSection />
                    <BenefitsSection />
                    <TestimonialsSection />
                </>
            )}

            <Footer setActiveTab={setActiveTab} />
        </main>
    );
}