"use client";

import SiteShell from "@/components/SiteShell";
import Team from "@/components/Team";

export default function AboutPage() {
    return (
        <SiteShell activeTab="about">
            <div className="min-h-screen">
                <Team />
            </div>
        </SiteShell>
    );
}
