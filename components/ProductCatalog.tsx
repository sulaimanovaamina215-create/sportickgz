"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronLeft, ChevronRight, Search, X, Tag } from "lucide-react";
import { catalogKY, type CatalogProduct } from "@/data/catalogKY";
import { formatPrice } from "@/lib/currency";
import { buildIndex, buildSuggestions, highlightParts, searchProducts, suggestCorrection } from "@/lib/search";
import DemNetworkBackground from "@/components/DemNetworkBackground";
import ProductZoomModal, { type ZoomAnchor } from "@/components/ProductZoomModal";

type Translation = {
    addToCart: string;
    inCart: string;
    searchPlaceholder: string;
    noResults: string;
    searchResults: string;
    categories: string;
    products: string;
    didYouMean: string;
    clear: string;
    found: (count: number) => string;
    noResultsHint: string;
};

const translations: Record<string, Translation> = {
    ky: {
        addToCart: "Себетке",
        inCart: "✓ Кошулду",
        searchPlaceholder: "Товар, түс же категория издөө...",
        noResults: "Товар табылган жок",
        searchResults: "Издөө натыйжалары",
        categories: "Категориялар",
        products: "Товарлар",
        didYouMean: "Мүмкүн ушул керек:",
        clear: "Тазалоо",
        found: (count) => `${count} товар табылды`,
        noResultsHint: "Башка сөз менен аракет кылып көрүңүз",
    },
    ru: {
        addToCart: "В корзину",
        inCart: "✓ Добавлено",
        searchPlaceholder: "Поиск товара, цвета или категории...",
        noResults: "Товар не найден",
        searchResults: "Результаты поиска",
        categories: "Категории",
        products: "Товары",
        didYouMean: "Возможно, вы имели в виду:",
        clear: "Очистить",
        found: (count) => `Найдено товаров: ${count}`,
        noResultsHint: "Попробуйте другой запрос",
    },
    en: {
        addToCart: "Add to cart",
        inCart: "✓ Added",
        searchPlaceholder: "Search products, colours or categories...",
        noResults: "No products found",
        searchResults: "Search Results",
        categories: "Categories",
        products: "Products",
        didYouMean: "Did you mean:",
        clear: "Clear",
        found: (count) => `${count} products found`,
        noResultsHint: "Try a different search term",
    },
};

const Highlighted = ({ text, query }: { text: string; query: string }) => (
    <>
        {highlightParts(text, query).map((part, index) =>
            part.match ? (
                <mark key={index} className="bg-blue-100 font-bold text-blue-800">
                    {part.text}
                </mark>
            ) : (
                <span key={index}>{part.text}</span>
            ),
        )}
    </>
);

const FORMA_CATEGORIES = new Set(["Формалар", "Формы", "Uniforms"]);
const BAG_CATEGORIES = new Set(["Сумка", "Bag"]);
const RAINCOAT_CATEGORIES = new Set(["Шамал өткөрбөс күрмө", "Ветровка", "Windbreaker"]);
const SCROLL_CATEGORIES = new Set([...FORMA_CATEGORIES, ...BAG_CATEGORIES, ...RAINCOAT_CATEGORIES]);

const ProductCard = ({ item, onAdd, isAdded, buttonText, inCartText, lang }: any) => {
    const [selectedSize, setSelectedSize] = useState(item.sizes && item.sizes.length > 0 ? item.sizes[0] : null);
    const [zoomOpen, setZoomOpen] = useState(false);
    const [zoomAnchor, setZoomAnchor] = useState<ZoomAnchor | null>(null);
    const photoRef = useRef<HTMLDivElement>(null);

    // Ушул товардын учурда тандалган размери себетте бар же жок экенин текшеребиз
    const cardKey = `${item.id}-${selectedSize || 'nosize'}`;
    const itemIsAdded = isAdded(cardKey);

    const openZoom = () => {
        const rect = photoRef.current?.getBoundingClientRect();
        if (rect) {
            setZoomAnchor({
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height,
            });
        } else {
            setZoomAnchor(null);
        }
        setZoomOpen(true);
    };

    return (
        <>
        <div className="group flex flex-col justify-between border border-gray-100 p-3 rounded-xl shadow-lg bg-white h-full">
            <div>
                <div
                    ref={photoRef}
                    className="relative aspect-[3/4] overflow-hidden rounded-lg mb-3 bg-gray-100 cursor-zoom-in"
                    onClick={openZoom}
                >
                    <Image src={item.photo} fill sizes="180px" alt={item.title || "product"} className="object-contain" />
                </div>
                <h4 className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[40px] mb-2">{item.title}</h4>

                {/* РАЗМЕРЛЕР */}
                {item.sizes && item.sizes.length > 0 && (
                    <div className="mb-2">
                        <div className="flex flex-wrap gap-1">
                            {item.sizes.map((size: string, idx: number) => (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => setSelectedSize(size)}
                                    className={`px-2 py-0.5 text-xs font-bold rounded border transition-all ${
                                        selectedSize === size
                                            ? "bg-blue-600 text-white border-blue-600 shadow"
                                            : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                                    }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                <span className="text-xs font-bold text-blue-600 leading-tight">{formatPrice(item.price, lang, "")}</span>
                <button
                    onClick={() => onAdd({ ...item, selectedSize })}
                    className={`px-2.5 py-1 rounded-lg text-white text-[11px] font-bold transition-all ${
                        itemIsAdded ? "bg-green-600 hover:bg-green-700" : "bg-gray-900 hover:bg-gray-800"
                    }`}
                >
                    {itemIsAdded ? inCartText : buttonText}
                </button>
            </div>
        </div>

        <ProductZoomModal
            open={zoomOpen}
            src={item.photo}
            alt={item.title || "product"}
            anchor={zoomAnchor}
            onClose={() => {
                setZoomOpen(false);
                setZoomAnchor(null);
            }}
        />
        </>
    );
};

const ProductCatalog = () => {
    const { lang } = useLanguage();
    const { addToCart } = useCart();
    const [addedStates, setAddedStates] = useState<Record<string, boolean>>({});
    const [searchQuery, setSearchQuery] = useState("");
    const [isSuggestOpen, setIsSuggestOpen] = useState(false);
    const [activeSuggestion, setActiveSuggestion] = useState(-1);
    const rowRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const searchBoxRef = useRef<HTMLDivElement>(null);

    const currentLang = lang && catalogKY[lang] ? lang : "ky";
    const t = translations[currentLang] || translations.ky;

    const products = catalogKY[currentLang] || catalogKY.ky;

    const index = useMemo(() => buildIndex(products), [products]);
    const trimmedQuery = searchQuery.trim();
    const isSearching = trimmedQuery !== "";

    const filteredProducts = useMemo(
        () => (isSearching ? searchProducts(index, trimmedQuery).map((hit) => hit.product) : []),
        [index, trimmedQuery, isSearching],
    );

    const suggestions = useMemo(
        () => (isSearching ? buildSuggestions(index, trimmedQuery) : []),
        [index, trimmedQuery, isSearching],
    );

    const correction = useMemo(
        () => (isSearching && filteredProducts.length === 0 ? suggestCorrection(products, trimmedQuery) : null),
        [products, trimmedQuery, isSearching, filteredProducts.length],
    );

    // Search results stay grouped under their category headings, like the browse view.
    const groupedResults = useMemo(() => {
        const groups: Array<{ category: string; items: CatalogProduct[] }> = [];
        const byCategory = new Map<string, CatalogProduct[]>();

        for (const product of filteredProducts) {
            const existing = byCategory.get(product.category);
            if (existing) {
                existing.push(product);
            } else {
                const items = [product];
                byCategory.set(product.category, items);
                groups.push({ category: product.category, items });
            }
        }

        return groups;
    }, [filteredProducts]);

    useEffect(() => {
        setActiveSuggestion(-1);
    }, [trimmedQuery]);

    useEffect(() => {
        const onPointerDown = (event: MouseEvent) => {
            if (!searchBoxRef.current?.contains(event.target as Node)) setIsSuggestOpen(false);
        };
        document.addEventListener("mousedown", onPointerDown);
        return () => document.removeEventListener("mousedown", onPointerDown);
    }, []);

    const applySuggestion = (label: string) => {
        setSearchQuery(label);
        setIsSuggestOpen(false);
        setActiveSuggestion(-1);
    };

    const onSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Escape") {
            setIsSuggestOpen(false);
            return;
        }
        if (event.key === "Enter") {
            if (isSuggestOpen && activeSuggestion >= 0) {
                event.preventDefault();
                applySuggestion(suggestions[activeSuggestion].label);
            } else {
                setIsSuggestOpen(false);
            }
            return;
        }
        if (!suggestions.length) return;

        if (event.key === "ArrowDown") {
            event.preventDefault();
            setIsSuggestOpen(true);
            setActiveSuggestion((prev) => (prev + 1) % suggestions.length);
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            setIsSuggestOpen(true);
            setActiveSuggestion((prev) => (prev <= 0 ? suggestions.length - 1 : prev - 1));
        }
    };

    const handleAddToCart = (item: any) => {
        addToCart(item);
        const uniqueKey = `${item.id}-${item.selectedSize || 'nosize'}`;
        setAddedStates((prev) => ({ ...prev, [uniqueKey]: true }));
    };

    const checkIsAdded = (cardKey: string) => {
        return !!addedStates[cardKey];
    };

    const categories: string[] = Array.from(new Set(products.map((p: any) => p.category).filter(Boolean)));

    return (
        <section className="relative min-h-screen bg-white">
            {/* The video is clipped by its own wrapper so the suggestion list can overflow the banner. */}
            <div className="relative isolate z-20 h-[220px] w-full md:h-[320px]">
                <div className="absolute inset-0 overflow-hidden bg-black">
                    <DemNetworkBackground />
                </div>

                <div className="absolute inset-0 z-10 flex items-end pb-6 md:items-center md:pb-0">
                    <div className="w-full max-w-7xl mx-auto px-4">
                        <div ref={searchBoxRef} className="relative mx-auto max-w-2xl">
                            <div className="flex items-center gap-1 rounded-full border border-gray-200 bg-white p-1.5 pl-4 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
                                <Search size={18} className="shrink-0 text-gray-400" />
                                <input
                                    type="text"
                                    role="combobox"
                                    aria-expanded={isSuggestOpen && suggestions.length > 0}
                                    aria-controls="catalog-search-suggestions"
                                    aria-autocomplete="list"
                                    autoComplete="off"
                                    placeholder={t.searchPlaceholder}
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setIsSuggestOpen(true);
                                    }}
                                    onFocus={() => setIsSuggestOpen(true)}
                                    onKeyDown={onSearchKeyDown}
                                    className="w-full bg-transparent px-2 py-2 text-gray-800 outline-none placeholder:text-gray-400"
                                />
                                {isSearching && (
                                    <button
                                        type="button"
                                        aria-label={t.clear}
                                        onClick={() => {
                                            setSearchQuery("");
                                            setIsSuggestOpen(false);
                                        }}
                                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        <X size={18} />
                                    </button>
                                )}
                                <button
                                    type="button"
                                    aria-label={t.searchResults}
                                    onClick={() => setIsSuggestOpen(false)}
                                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white transition hover:bg-blue-700"
                                >
                                    <Search size={18} />
                                </button>
                            </div>

                            {isSuggestOpen && suggestions.length > 0 && (
                                <ul
                                    id="catalog-search-suggestions"
                                    role="listbox"
                                    className="absolute left-0 right-0 top-full z-30 mt-2 max-h-[22rem] overflow-y-auto rounded-2xl border border-gray-200 bg-white py-2 shadow-[0_20px_50px_rgba(0,0,0,0.25)]"
                                >
                                    {suggestions.map((suggestion, position) => {
                                        const isActive = position === activeSuggestion;
                                        const isFirstProduct =
                                            suggestion.type === "product" &&
                                            suggestions.findIndex((entry) => entry.type === "product") === position;

                                        return (
                                            <React.Fragment key={`${suggestion.type}-${suggestion.label}`}>
                                                {position === 0 && suggestion.type === "category" && (
                                                    <li className="px-4 pb-1 pt-1 text-[10px] font-black uppercase tracking-[0.18em] text-gray-400">
                                                        {t.categories}
                                                    </li>
                                                )}
                                                {isFirstProduct && (
                                                    <li className="mt-1 border-t border-gray-100 px-4 pb-1 pt-2 text-[10px] font-black uppercase tracking-[0.18em] text-gray-400">
                                                        {t.products}
                                                    </li>
                                                )}
                                                <li role="option" aria-selected={isActive}>
                                                    <button
                                                        type="button"
                                                        onMouseEnter={() => setActiveSuggestion(position)}
                                                        onClick={() => applySuggestion(suggestion.label)}
                                                        className={`flex w-full items-center gap-3 px-4 py-2 text-left transition ${
                                                            isActive ? "bg-blue-50" : "hover:bg-gray-50"
                                                        }`}
                                                    >
                                                        {suggestion.type === "category" ? (
                                                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                                                <Tag size={16} />
                                                            </span>
                                                        ) : (
                                                            <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                                                                <Image
                                                                    src={suggestion.photo}
                                                                    alt=""
                                                                    fill
                                                                    sizes="36px"
                                                                    className="object-contain"
                                                                />
                                                            </span>
                                                        )}
                                                        <span className="min-w-0 flex-1">
                                                            <span className="block truncate text-sm text-gray-800">
                                                                <Highlighted text={suggestion.label} query={trimmedQuery} />
                                                            </span>
                                                            {suggestion.type === "product" && (
                                                                <span className="block truncate text-xs text-gray-400">
                                                                    {suggestion.category} · {formatPrice(suggestion.price, currentLang, "")}
                                                                </span>
                                                            )}
                                                        </span>
                                                        <span className="shrink-0 text-xs font-bold text-gray-400">{suggestion.count}</span>
                                                    </button>
                                                </li>
                                            </React.Fragment>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 bg-white">
                {isSearching ? (
                    <div>
                        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
                            <h3 className="text-xl font-bold text-gray-900">{t.searchResults}</h3>
                            {filteredProducts.length > 0 && (
                                <span className="text-sm text-gray-500">{t.found(filteredProducts.length)}</span>
                            )}
                        </div>

                        {filteredProducts.length > 0 ? (
                            groupedResults.map((group) => (
                                <div key={group.category} className="mb-12">
                                    <div className="mb-4 flex items-baseline gap-2">
                                        <h4 className="text-base font-bold text-gray-900">{group.category}</h4>
                                        <span className="text-xs text-gray-400">{group.items.length}</span>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                        {group.items.map((item) => (
                                            <ProductCard
                                                key={item.id}
                                                item={item}
                                                onAdd={handleAddToCart}
                                                isAdded={checkIsAdded}
                                                buttonText={t.addToCart}
                                                inCartText={t.inCart}
                                                lang={currentLang}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-10 text-center">
                                <p className="text-lg font-bold text-gray-800">{t.noResults}</p>

                                {correction ? (
                                    <p className="mt-3 text-sm text-gray-500">
                                        {t.didYouMean}{" "}
                                        <button
                                            type="button"
                                            onClick={() => applySuggestion(correction)}
                                            className="font-bold text-blue-600 underline decoration-dotted hover:text-blue-700"
                                        >
                                            {correction}
                                        </button>
                                    </p>
                                ) : (
                                    <p className="mt-3 text-sm text-gray-500">{t.noResultsHint}</p>
                                )}

                                <div className="mt-6 flex flex-wrap justify-center gap-2">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat}
                                            type="button"
                                            onClick={() => applySuggestion(cat)}
                                            className="rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-xs font-bold text-gray-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    categories.map((cat: string) => {
                        const isScrollRow = SCROLL_CATEGORIES.has(cat);
                        const catItems = products.filter((p: any) => p.category === cat);

                        if (isScrollRow) {
                            return (
                                <div key={cat} className="mb-16 relative">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-xl font-bold text-gray-900">{cat}</h3>
                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => rowRefs.current[cat]?.scrollBy({ left: -280, behavior: "smooth" })}
                                                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0a192f] text-white shadow-[0_8px_22px_rgba(10,25,47,0.4)] ring-2 ring-red-600 transition hover:scale-110 hover:bg-red-600"
                                                aria-label="Previous"
                                            >
                                                <ChevronLeft size={20} />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => rowRefs.current[cat]?.scrollBy({ left: 280, behavior: "smooth" })}
                                                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0a192f] text-white shadow-[0_8px_22px_rgba(10,25,47,0.4)] ring-2 ring-red-600 transition hover:scale-110 hover:bg-red-600"
                                                aria-label="Next"
                                            >
                                                <ChevronRight size={20} />
                                            </button>
                                        </div>
                                    </div>
                                    <div
                                        ref={(el) => { rowRefs.current[cat] = el; }}
                                        className="flex gap-4 overflow-x-auto scroll-smooth pb-2 snap-x snap-mandatory"
                                        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                                    >
                                        {catItems.map((item: any) => (
                                            <div key={item.id} className="min-w-[180px] max-w-[180px] flex-shrink-0 snap-start">
                                                <ProductCard
                                                    item={item}
                                                    onAdd={handleAddToCart}
                                                    isAdded={checkIsAdded}
                                                    buttonText={t.addToCart}
                                                    inCartText={t.inCart}
                                                    lang={currentLang}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        }

                        return (
                        <div key={cat} className="mb-16 relative">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">{cat}</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                {catItems.map((item: any) => (
                                    <ProductCard
                                        key={item.id}
                                        item={item}
                                        onAdd={handleAddToCart}
                                        isAdded={checkIsAdded}
                                        buttonText={t.addToCart}
                                        inCartText={t.inCart}
                                        lang={currentLang}
                                    />
                                ))}
                            </div>
                        </div>
                        );
                    })
                )}
            </div>
        </section>
    );
};

export default ProductCatalog;