"use client";

import SiteShell from "@/components/SiteShell";
import Cart from "@/components/Cart";

export default function CartPage() {
    return (
        <SiteShell activeTab="cart">
            <div className="min-h-screen">
                <Cart />
            </div>
        </SiteShell>
    );
}
