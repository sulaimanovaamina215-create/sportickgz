export const KGS_PER_USD = 88;

export function formatPrice(price: unknown, lang: string, emptyText: string) {
    if (price === 0 || price === "0" || price === "" || price == null) return emptyText;
    const raw = String(price).trim();
    if (raw.includes("$")) return raw;
    if (/[A-Za-zА-Яа-яЁё]/.test(raw) && !/\d/.test(raw)) return raw;

    const numeric = Number(raw.replace(/[^\d.]/g, ""));
    if (!numeric) return emptyText;
    if (lang === "en") return `$${(numeric / KGS_PER_USD).toFixed(1)}`;
    return `${numeric} сом`;
}

export function formatSomAmount(amountKgs: number, lang: string) {
    if (lang === "en") return `$${(amountKgs / KGS_PER_USD).toFixed(1)}`;
    return `${amountKgs} сом`;
}

export function parseKgsPrice(price: unknown) {
    if (typeof price === "number") return price;
    const raw = String(price ?? "");
    const numeric = Number(raw.replace(/[^\d.]/g, ""));
    if (!numeric) return 0;
    if (raw.includes("$")) return Math.round(numeric * KGS_PER_USD);
    return numeric;
}
