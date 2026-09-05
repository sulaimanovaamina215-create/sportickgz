"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

type LangText = { ky: string; ru: string; en: string };

type BallColor = {
    id: string;
    name: LangText;
    hex: string;
    photo?: string;
};

type SaleBall = {
    id: string;
    photo: string;
    title: LangText;
    colors: BallColor[];
};

export const saleBalls: SaleBall[] = [
    {
        id: "sale-ball-givova",
        photo: "/sales/balls/givova-trio.png",
        title: {
            ky: "Мяч GIVOVA",
            ru: "Мяч GIVOVA",
            en: "GIVOVA ball",
        },
        colors: [
            { id: "neon", name: { ky: "Неон", ru: "Неон", en: "Neon" }, hex: "#c8ff00" },
            { id: "blue", name: { ky: "Көк", ru: "Синий", en: "Blue" }, hex: "#1e3a8a" },
            { id: "lime", name: { ky: "Сары-жашыл", ru: "Лайм", en: "Lime" }, hex: "#a3e635" },
        ],
    },
    {
        id: "sale-ball-kipsta",
        photo: "/sales/balls/kipsta-trio.png",
        title: {
            ky: "Мяч KIPSTA",
            ru: "Мяч KIPSTA",
            en: "KIPSTA ball",
        },
        colors: [
            { id: "orange", name: { ky: "Кызгылт сары", ru: "Оранжевый", en: "Orange" }, hex: "#f97316" },
            { id: "yellow", name: { ky: "Сары", ru: "Жёлтый", en: "Yellow" }, hex: "#facc15" },
            { id: "white", name: { ky: "Ак", ru: "Белый", en: "White" }, hex: "#f5f5f5" },
        ],
    },
    {
        id: "sale-ball-nike",
        photo: "/sales/balls/nike-strike.png",
        title: {
            ky: "Nike Strike 20 21",
            ru: "Nike Strike 20 21",
            en: "Nike Strike 20 21",
        },
        colors: [
            { id: "yellow", name: { ky: "Сары", ru: "Жёлтый", en: "Yellow" }, hex: "#fde047" },
        ],
    },
    {
        id: "sale-ball-trionda",
        photo: "/sales/balls/adidas-trionda.png",
        title: {
            ky: "Adidas Trionda",
            ru: "Adidas Trionda",
            en: "Adidas Trionda",
        },
        colors: [
            {
                id: "mix",
                name: { ky: "Ак / кызыл / көк", ru: "Белый / красный / синий", en: "White / red / blue" },
                hex: "#ef4444",
            },
        ],
    },
    {
        id: "sale-ball-puma",
        photo: "/sales/balls/puma-caf.png",
        title: {
            ky: "Puma CAF Morocco 23",
            ru: "Puma CAF Morocco 23",
            en: "Puma CAF Morocco 23",
        },
        colors: [
            {
                id: "red-green",
                name: { ky: "Кызыл-жашыл", ru: "Красно-зелёный", en: "Red-green" },
                hex: "#dc2626",
            },
        ],
    },
    {
        id: "sale-ball-jabulani",
        photo: "/sales/balls/jabulani-orange.png",
        title: {
            ky: "Adidas Jabulani",
            ru: "Adidas Jabulani",
            en: "Adidas Jabulani",
        },
        colors: [
            {
                id: "orange",
                name: { ky: "Кызгылт сары", ru: "Оранжевый", en: "Orange" },
                hex: "#ea580c",
                photo: "/sales/balls/jabulani-orange.png",
            },
            {
                id: "yellow",
                name: { ky: "Сары", ru: "Жёлтый", en: "Yellow" },
                hex: "#eab308",
                photo: "/sales/balls/jabulani-yellow.png",
            },
        ],
    },
];

export const SALE_PRICE = "1000";

const copy = {
    ky: { add: "Себетке", added: "Кошулду", som: "сом", color: "Түс" },
    ru: { add: "В корзину", added: "В корзине", som: "сом", color: "Цвет" },
    en: { add: "Add to cart", added: "In cart", som: "KGS", color: "Color" },
};

export default function SalesProducts() {
    const { lang } = useLanguage();
    const { addToCart, cart } = useCart();
    const currentLang: keyof typeof copy = lang === "ky" || lang === "en" ? lang : "ru";
    const t = copy[currentLang];

    const initialColors = useMemo(() => {
        const map: Record<string, string> = {};
        saleBalls.forEach((ball) => {
            map[ball.id] = ball.colors[0].id;
        });
        return map;
    }, []);

    const [selectedColors, setSelectedColors] = useState<Record<string, string>>(initialColors);
    const [justAdded, setJustAdded] = useState<string | null>(null);

    const getColor = (ball: SaleBall) =>
        ball.colors.find((c) => c.id === selectedColors[ball.id]) || ball.colors[0];

    const handleAdd = (ball: SaleBall) => {
        const color = getColor(ball);
        const colorName = color.name[currentLang];
        const photo = color.photo || ball.photo;
        const colorNames = ball.colors.map((c) => c.name[currentLang]);

        addToCart({
            id: ball.id,
            title: ball.title[currentLang],
            price: SALE_PRICE,
            photo,
            sizes: colorNames,
            selectedSize: colorName,
            optionType: "color",
        });

        const key = `${ball.id}::${color.id}`;
        setJustAdded(key);
        window.setTimeout(() => setJustAdded((v) => (v === key ? null : v)), 1600);
    };

    const isInCart = (ball: SaleBall) => {
        const color = getColor(ball);
        const colorName = color.name[currentLang];
        const key = `${ball.id}::${color.id}`;
        return (
            justAdded === key ||
            cart.some((item) => item.id === ball.id && item.selectedSize === colorName)
        );
    };

    return (
        <div className="relative z-10 mx-auto max-w-6xl px-4 pb-10 pt-5 md:px-8 md:pb-12 md:pt-6">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
                {saleBalls.map((ball) => {
                    const color = getColor(ball);
                    const photo = color.photo || ball.photo;
                    const added = isInCart(ball);
                    const multi = ball.colors.length > 1;

                    return (
                        <article
                            key={ball.id}
                            className="group flex flex-col overflow-hidden border border-white/12 bg-[#070b14]/55 text-left shadow-[0_16px_40px_rgba(0,0,0,0.35)] backdrop-blur-sm transition duration-300 hover:border-red-500/50"
                        >
                            <div className="relative aspect-square overflow-hidden bg-[#0a192f]">
                                <Image
                                    src={photo}
                                    alt={ball.title[currentLang]}
                                    fill
                                    className="object-cover object-center transition duration-500 group-hover:scale-[1.04]"
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                />
                            </div>

                            <div className="flex flex-1 flex-col p-3 sm:p-3.5">
                                <h3 className="mb-2 line-clamp-2 min-h-[2.4em] text-xs font-black uppercase italic leading-snug tracking-tight text-white sm:text-[13px]">
                                    {ball.title[currentLang]}
                                </h3>

                                <div className="mb-2">
                                    <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/50">
                                        {t.color}
                                        {multi ? (
                                            <span className="ml-1 text-cyan-300/90">
                                                · {color.name[currentLang]}
                                            </span>
                                        ) : null}
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {ball.colors.map((c) => {
                                            const active = selectedColors[ball.id] === c.id;
                                            return (
                                                <button
                                                    key={c.id}
                                                    type="button"
                                                    title={c.name[currentLang]}
                                                    onClick={() =>
                                                        setSelectedColors((prev) => ({
                                                            ...prev,
                                                            [ball.id]: c.id,
                                                        }))
                                                    }
                                                    className={`h-4 w-4 rounded-full border-2 transition sm:h-[18px] sm:w-[18px] ${
                                                        active
                                                            ? "scale-110 border-white shadow-[0_0_0_1.5px_rgba(239,68,68,0.85)]"
                                                            : "border-white/25 hover:border-white/60"
                                                    }`}
                                                    style={{ backgroundColor: c.hex }}
                                                    aria-label={c.name[currentLang]}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>

                                <p className="mb-3 text-base font-black italic tracking-tight text-amber-300 sm:text-lg">
                                    {SALE_PRICE}{" "}
                                    <span className="text-[11px] font-bold uppercase not-italic tracking-wider text-white/55">
                                        {t.som}
                                    </span>
                                </p>

                                <button
                                    type="button"
                                    onClick={() => handleAdd(ball)}
                                    disabled={added}
                                    className={`relative mt-auto flex w-full items-center justify-center gap-2 overflow-hidden border px-3 py-2.5 text-[11px] font-black uppercase italic tracking-[0.14em] transition-all duration-300 active:scale-[0.98] sm:text-xs ${
                                        added
                                            ? "cursor-default border-emerald-400/50 bg-emerald-600 text-white"
                                            : "border-red-400/55 bg-red-600 text-white shadow-[0_0_22px_rgba(220,38,38,0.45)] hover:bg-red-500"
                                    }`}
                                >
                                    {added ? (
                                        <Check size={14} strokeWidth={3} />
                                    ) : (
                                        <ShoppingCart size={14} strokeWidth={2.5} />
                                    )}
                                    {added ? t.added : t.add}
                                </button>
                            </div>
                        </article>
                    );
                })}
            </div>
        </div>
    );
}

