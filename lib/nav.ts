export const tabRoutes = {
    about: "/about",
    catalog: "/dem",
    wholesale: "/catalog",
    contacts: "/contacts",
    cart: "/cart",
} as const;

export type NavTab = keyof typeof tabRoutes;

export function pathForTab(tab: string | null): string {
    if (!tab) return "/";
    return tabRoutes[tab as NavTab] ?? "/";
}

export function tabFromPath(pathname: string): NavTab | null {
    const normalized = pathname.replace(/\/$/, "") || "/";
    const entry = Object.entries(tabRoutes).find(([, path]) => path === normalized);
    return (entry?.[0] as NavTab | undefined) ?? null;
}
