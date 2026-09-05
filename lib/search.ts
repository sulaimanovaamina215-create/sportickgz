import type { CatalogProduct } from "@/data/catalogKY";

/**
 * Catalogue search that tolerates the ways people actually type:
 * mixed Cyrillic/Latin ("forma" vs "форма"), any word order, and small typos.
 *
 * Everything is folded to a common Latin form before comparing, so the same
 * index answers queries in Kyrgyz, Russian and English.
 */

const CYRILLIC_TO_LATIN: Record<string, string> = {
    а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z",
    и: "i", й: "i", к: "k", л: "l", м: "m", н: "n", ң: "n", о: "o", ө: "o",
    п: "p", р: "r", с: "s", т: "t", у: "u", ү: "u", ф: "f", х: "h", ц: "c",
    ч: "ch", ш: "sh", щ: "sh", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
    һ: "h", ғ: "g", қ: "k", ұ: "u",
};

export function fold(text: string): string {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .split("")
        .map((char) => CYRILLIC_TO_LATIN[char] ?? char)
        .join("")
        .replace(/[^a-z0-9]+/g, " ")
        .trim();
}

function tokenize(text: string): string[] {
    const folded = fold(text);
    return folded ? folded.split(" ") : [];
}

/**
 * Damerau-Levenshtein distance, or -1 once it is certain the distance exceeds
 * `max`. Transpositions count as one edit because swapped letters ("форам")
 * are one of the most common typing mistakes.
 */
function boundedDistance(a: string, b: string, max: number): number {
    if (Math.abs(a.length - b.length) > max) return -1;
    if (a === b) return 0;

    let beforePrevious: number[] = [];
    let previous = Array.from({ length: b.length + 1 }, (_, i) => i);

    for (let i = 1; i <= a.length; i++) {
        const current = [i];
        let rowBest = i;

        for (let j = 1; j <= b.length; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            let value = Math.min(
                previous[j] + 1,
                current[j - 1] + 1,
                previous[j - 1] + cost,
            );

            if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
                value = Math.min(value, beforePrevious[j - 2] + 1);
            }

            current.push(value);
            if (value < rowBest) rowBest = value;
        }

        if (rowBest > max) return -1;
        beforePrevious = previous;
        previous = current;
    }

    const distance = previous[b.length];
    return distance > max ? -1 : distance;
}

function typoBudget(token: string): number {
    if (token.length <= 3) return 0;
    if (token.length <= 5) return 1;
    return 2;
}

/** 0 means "no match"; higher is a closer match. */
function tokenScore(queryToken: string, docToken: string): number {
    if (docToken === queryToken) return 1;
    if (docToken.startsWith(queryToken)) return 0.9;
    if (docToken.length >= 4 && queryToken.startsWith(docToken)) return 0.7;
    if (queryToken.length >= 3 && docToken.includes(queryToken)) return 0.65;

    const budget = typoBudget(queryToken);
    if (budget === 0) return 0;

    const distance = boundedDistance(queryToken, docToken, budget);
    if (distance < 0) return 0;

    return 0.5 * (1 - distance / (queryToken.length + 1));
}

type IndexedField = { tokens: string[]; weight: number };

type IndexedProduct = {
    product: CatalogProduct;
    fields: IndexedField[];
    foldedTitle: string;
};

export function buildIndex(products: CatalogProduct[]): IndexedProduct[] {
    return products.map((product) => ({
        product,
        foldedTitle: fold(product.title || ""),
        fields: [
            { tokens: tokenize(product.title || ""), weight: 3 },
            { tokens: tokenize(product.category || ""), weight: 2.2 },
            { tokens: (product.keywords || []).flatMap(tokenize), weight: 1.3 },
            { tokens: tokenize((product.sizes || []).join(" ")), weight: 0.9 },
            { tokens: tokenize(String(product.price ?? "")), weight: 0.9 },
        ],
    }));
}

export type SearchHit = { product: CatalogProduct; score: number };

export function searchProducts(index: IndexedProduct[], query: string): SearchHit[] {
    const queryTokens = tokenize(query);
    if (queryTokens.length === 0) return [];

    const foldedQuery = fold(query);
    const hits: SearchHit[] = [];

    for (const entry of index) {
        let total = 0;
        let matchedEveryToken = true;

        for (const queryToken of queryTokens) {
            let best = 0;

            for (const field of entry.fields) {
                for (const docToken of field.tokens) {
                    const score = field.weight * tokenScore(queryToken, docToken);
                    if (score > best) best = score;
                }
            }

            if (best === 0) {
                matchedEveryToken = false;
                break;
            }
            total += best;
        }

        if (!matchedEveryToken) continue;

        if (entry.foldedTitle.startsWith(foldedQuery)) total += 2.5;
        else if (entry.foldedTitle.includes(foldedQuery)) total += 1.5;

        hits.push({ product: entry.product, score: total });
    }

    return hits.sort((a, b) => b.score - a.score || a.product.id - b.product.id);
}

export type Suggestion =
    | { type: "category"; label: string; count: number }
    | { type: "product"; label: string; count: number; category: string; photo: string; price: string };

export function buildSuggestions(
    index: IndexedProduct[],
    query: string,
    limit = 8,
): Suggestion[] {
    const hits = searchProducts(index, query);
    if (hits.length === 0) return [];

    const categories = new Map<string, number>();
    const titles = new Map<string, { count: number; product: CatalogProduct; score: number }>();

    for (const hit of hits) {
        const { category, title } = hit.product;
        categories.set(category, (categories.get(category) || 0) + 1);

        const existing = titles.get(title);
        if (existing) {
            existing.count += 1;
            existing.score = Math.max(existing.score, hit.score);
        } else {
            titles.set(title, { count: 1, product: hit.product, score: hit.score });
        }
    }

    const categorySuggestions: Suggestion[] = [...categories.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([label, count]) => ({ type: "category", label, count }));

    const productSuggestions: Suggestion[] = [...titles.entries()]
        .sort((a, b) => b[1].score - a[1].score)
        .slice(0, limit - categorySuggestions.length)
        .map(([label, info]) => ({
            type: "product",
            label,
            count: info.count,
            category: info.product.category,
            photo: info.product.photo,
            price: info.product.price,
        }));

    return [...categorySuggestions, ...productSuggestions];
}

/** Closest catalogue word to a query that returned nothing, for a "did you mean" hint. */
export function suggestCorrection(products: CatalogProduct[], query: string): string | null {
    const queryTokens = tokenize(query);
    if (queryTokens.length === 0) return null;

    const vocabulary = new Map<string, string>();
    for (const product of products) {
        for (const source of [product.title, product.category, ...(product.keywords || [])]) {
            if (!source) continue;
            for (const word of source.split(/[\s,/()]+/)) {
                const folded = fold(word);
                if (folded.length >= 3 && !vocabulary.has(folded)) vocabulary.set(folded, word);
            }
        }
    }

    let best: { word: string; distance: number } | null = null;

    for (const queryToken of queryTokens) {
        const budget = Math.max(1, Math.min(3, Math.floor(queryToken.length / 2)));

        for (const [folded, original] of vocabulary) {
            const distance = boundedDistance(queryToken, folded, budget);
            if (distance <= 0) continue;
            if (!best || distance < best.distance) best = { word: original, distance };
        }
    }

    return best ? best.word : null;
}

/** Splits `text` so the parts matching `query` can be emphasised. */
export function highlightParts(text: string, query: string): Array<{ text: string; match: boolean }> {
    const needles = query
        .toLowerCase()
        .split(/[\s,/()]+/)
        .map((part) => part.trim())
        .filter((part) => part.length >= 2);

    if (needles.length === 0) return [{ text, match: false }];

    const lower = text.toLowerCase();
    const flags = new Array(text.length).fill(false);

    for (const needle of needles) {
        let from = 0;
        for (;;) {
            const at = lower.indexOf(needle, from);
            if (at === -1) break;
            for (let i = at; i < at + needle.length; i++) flags[i] = true;
            from = at + needle.length;
        }
    }

    const parts: Array<{ text: string; match: boolean }> = [];
    let cursor = 0;

    while (cursor < text.length) {
        const match = flags[cursor];
        let end = cursor;
        while (end < text.length && flags[end] === match) end++;
        parts.push({ text: text.slice(cursor, end), match });
        cursor = end;
    }

    return parts;
}
