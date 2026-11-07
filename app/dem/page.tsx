"use client";

import SiteShell from "@/components/SiteShell";
import ProductCatalog from "@/components/ProductCatalog";

export default function DemPage() {
    return (
        <SiteShell activeTab="catalog">
            <ProductCatalog />
        </SiteShell>
    );
}
