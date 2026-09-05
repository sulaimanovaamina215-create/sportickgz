"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const promoSlides = [
    {
        src: "/catalog/fudbol/forma/klubforma/promo/spain-yamal.png",
        tag: { ky: "Жаңы коллекция", ru: "Новая коллекция", en: "New collection" },
        title: { ky: "Испания · Yamal 19", ru: "Испания · Yamal 19", en: "Spain · Yamal 19" },
        hint: { ky: "Балдардын клубдук формасы", ru: "Детская клубная форма", en: "Kids club kit" },
    },
    {
        src: "/catalog/fudbol/forma/klubforma/promo/real-mbappe.png",
        tag: { ky: "Хит сезона", ru: "Хит сезона", en: "Season hit" },
        title: { ky: "Real Madrid · Mbappé 10", ru: "Real Madrid · Mbappé 10", en: "Real Madrid · Mbappé 10" },
        hint: { ky: "Алдыңкы жана арткы көрүнүш", ru: "Вид спереди и сзади", en: "Front and back look" },
    },
    {
        src: "/catalog/fudbol/forma/klubforma/promo/portugal-ronaldo.png",
        tag: { ky: "Классика", ru: "Классика", en: "Classic" },
        title: { ky: "Португалия · Ronaldo 7", ru: "Португалия · Ronaldo 7", en: "Portugal · Ronaldo 7" },
        hint: { ky: "Студиялык кадр · балдар үчүн", ru: "Студийный кадр · для детей", en: "Studio shot · for kids" },
    },
    {
        src: "/catalog/fudbol/forma/klubforma/promo/nassr-ronaldo.png",
        tag: { ky: "Жарык стиль", ru: "Яркий стиль", en: "Bright style" },
        title: { ky: "Al Nassr · Ronaldo 7", ru: "Al Nassr · Ronaldo 7", en: "Al Nassr · Ronaldo 7" },
        hint: { ky: "Сары клубдук комплект", ru: "Жёлтый клубный комплект", en: "Yellow club set" },
    },
    {
        src: "/catalog/fudbol/forma/klubforma/promo/nassr-ronaldo-alt.png",
        tag: { ky: "Премиум вид", ru: "Премиум вид", en: "Premium look" },
        title: { ky: "Al Nassr · Ronaldo 7", ru: "Al Nassr · Ronaldo 7", en: "Al Nassr · Ronaldo 7" },
        hint: { ky: "Модалык кадр балдар үчүн", ru: "Модный кадр для детей", en: "Fashion kids campaign" },
    },
];

export const CLUB_KIT_CATALOG_HREF =
    "/?tab=wholesale&sport=%D0%A4%D1%83%D1%82%D0%B1%D0%BE%D0%BB&sub=%D0%9A%D0%BB%D1%83%D0%B1%D0%BD%D1%8B%D0%B5%20%D1%84%D0%BE%D1%80%D0%BC%D1%8B";

type Lang = "ky" | "ru" | "en";

type ClubKitPromoProps = {
    lang: Lang;
    catalogHref?: string;
    className?: string;
};

export default function ClubKitPromo({
    lang,
    catalogHref = CLUB_KIT_CATALOG_HREF,
    className = "mb-8",
}: ClubKitPromoProps) {
    const [index, setIndex] = useState(0);
    const slide = promoSlides[index];

    useEffect(() => {
        const id = window.setInterval(() => {
            setIndex((i) => (i + 1) % promoSlides.length);
        }, 4500);
        return () => window.clearInterval(id);
    }, []);

    const catalogLabel =
        lang === "ky"
            ? "Балдардын клубдук формалары"
            : lang === "en"
              ? "Kids club kits"
              : "Детские клубные формы";

    const catalogHint =
        lang === "ky"
            ? "Каталогго өтүү"
            : lang === "en"
              ? "Open catalog"
              : "Открыть каталог";

    return (
        <div
            className={`relative overflow-hidden rounded-[1.75rem] border border-[#0a192f]/15 bg-[#070b14] text-white shadow-[0_24px_60px_rgba(7,11,20,0.28)] ${className}`}
        >
            <div className="pointer-events-none absolute -left-16 top-0 h-56 w-56 rounded-full bg-red-600/25 blur-[90px]" />
            <div className="pointer-events-none absolute -right-10 bottom-0 h-48 w-48 rounded-full bg-cyan-400/15 blur-[80px]" />

            <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.15fr]">
                <div className="relative z-10 flex flex-col justify-between gap-8 px-6 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-11">
                    <div>
                        <p className="mb-3 text-[11px] font-black uppercase tracking-[0.34em] text-red-500">
                            SPORTIC<span className="text-white">KGZ</span>
                        </p>
                        <span className="mb-4 inline-block border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-300">
                            {slide.tag[lang]}
                        </span>

                        <Link
                            href={catalogHref}
                            className="group relative mt-1 inline-flex w-full max-w-md flex-col overflow-hidden border border-white/20 bg-gradient-to-r from-red-600 via-red-600 to-[#0a192f] px-5 py-4 text-left shadow-[0_0_32px_rgba(220,38,38,0.35)] transition-all duration-300 hover:border-red-300 hover:shadow-[0_0_44px_rgba(239,68,68,0.55)] sm:px-6 sm:py-5"
                        >
                            <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-500 group-hover:translate-x-[220%]" />
                            <span className="relative text-[10px] font-bold uppercase tracking-[0.22em] text-white/70">
                                {catalogHint}
                            </span>
                            <span className="relative mt-1 flex items-center justify-between gap-3 text-xl font-black uppercase italic leading-[0.95] tracking-tight text-white sm:text-2xl lg:text-[1.85rem]">
                                {catalogLabel}
                                <ArrowRight
                                    size={22}
                                    className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                                />
                            </span>
                        </Link>

                        <p className="mt-4 max-w-sm text-sm font-semibold leading-relaxed text-white/70 sm:text-base">
                            {lang === "ky"
                                ? "Дүйнөлүк клубдардын стилинде — алды жана арты бир кадрда. Балдар үчүн даяр комплекттер."
                                : lang === "en"
                                  ? "World-club style — front and back in one shot. Ready kits for kids."
                                  : "В стиле мировых клубов — перед и спина в одном кадре. Готовые комплекты для детей."}
                        </p>
                    </div>

                    <div>
                        <p className="text-lg font-black uppercase italic tracking-tight text-white sm:text-xl">
                            {slide.title[lang]}
                        </p>
                        <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-white/45">
                            {slide.hint[lang]}
                        </p>

                        <div className="mt-5 flex items-center gap-1.5">
                            {promoSlides.map((_, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => setIndex(i)}
                                    className={`h-1.5 rounded-full transition-all ${
                                        i === index ? "w-6 bg-red-500" : "w-1.5 bg-white/25 hover:bg-white/50"
                                    }`}
                                    aria-label={`Slide ${i + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="relative min-h-[320px] sm:min-h-[420px] lg:min-h-[520px]">
                    {promoSlides.map((item, i) => (
                        <div
                            key={item.src}
                            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                                i === index ? "opacity-100" : "pointer-events-none opacity-0"
                            }`}
                        >
                            <Image
                                src={item.src}
                                alt={item.title[lang]}
                                fill
                                priority={i === 0}
                                className="object-cover object-[center_20%]"
                                sizes="(max-width: 1024px) 100vw, 55vw"
                            />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#070b14] via-[#070b14]/25 to-transparent lg:via-[#070b14]/10" />
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#070b14]/80 to-transparent" />
                            <div className="pointer-events-none absolute left-4 top-4 h-5 w-5 border-l-2 border-t-2 border-red-600" />
                            <div className="pointer-events-none absolute bottom-4 right-4 h-5 w-5 border-b-2 border-r-2 border-white" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
