"use client";

import SiteShell from "@/components/SiteShell";
import Wholesale from "@/components/Wholesale";

export default function CatalogPage() {
    return (
        <SiteShell activeTab="wholesale">
            <div className="min-h-screen">
                <Wholesale />
            </div>
        </SiteShell>
    );
}
