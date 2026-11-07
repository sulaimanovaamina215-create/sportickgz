"use client";

import SiteShell from "@/components/SiteShell";
import Contacts from "@/components/Contacts";

export default function ContactsPage() {
    return (
        <SiteShell activeTab="contacts">
            <div className="min-h-screen">
                <Contacts />
            </div>
        </SiteShell>
    );
}
