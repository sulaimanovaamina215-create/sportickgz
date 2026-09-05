"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const copy = {
    ky: {
        hot: "Ысык акция",
        title: "Супер акция",
        only: "Бардыгы",
        kit: "Балдардын футбол формасы + топ",
        note: "Профессионалдык экипировка — саны чектелген!",
        open: "Акцияларды көрүү",
        som: "сом",
    },
    ru: {
        hot: "Горячая акция",
        title: "Супер акция",
        only: "Всего за",
        kit: "Детская футбольная форма + мяч",
        note: "Профессиональная экипировка по самым выгодным ценам. Количество ограничено!",
        open: "Смотреть акции",
        som: "сом",
    },
    en: {
        hot: "Hot deal",
        title: "Super sale",
        only: "Only",
        kit: "Kids football kit + ball",
        note: "Pro gear at the best prices. Limited stock!",
        open: "View deals",
        som: "KGS",
    },
};

export default function SalesSection() {
    const { lang } = useLanguage();
    const currentLang: keyof typeof copy = lang === "ky" || lang === "en" ? lang : "ru";
    const t = copy[currentLang];

    return (
        <section className="w-full">
            <div
                className="relative flex flex-col items-center justify-center overflow-hidden border-y border-white/10 px-5 py-9 text-center md:px-14 md:py-11"
                style={{
                    background:
                        "linear-gradient(120deg, #070b14 0%, #0a192f 42%, #1a0a12 72%, #7f1d1d 100%)",
                }}
            >
                <div className="pointer-events-none absolute left-0 top-0 h-56 w-56 rounded-full bg-red-600/35 blur-[90px] md:-left-20" />
                <div className="pointer-events-none absolute right-0 bottom-0 h-52 w-52 rounded-full bg-cyan-400/20 blur-[80px] md:-right-16" />
                <div
                    className="pointer-events-none absolute inset-0 opacity-50"
                    style={{
                        background:
                            "radial-gradient(circle at 75% 25%, rgba(255,80,80,0.28), transparent 55%)",
                    }}
                />

                <div className="relative z-10 w-full max-w-3xl">
                    <span className="mb-3 inline-block animate-text-blink border-b-2 border-red-500 pb-0.5 text-[10px] font-bold uppercase tracking-[0.28em] text-red-400">
                        {t.hot}
                    </span>

                    <h2 className="mb-3 flex flex-col items-center">
                        <span className="block text-2xl font-black uppercase italic leading-none tracking-tight text-white sm:text-3xl md:text-4xl">
                            {t.title}
                        </span>

                        <span className="mt-3 flex flex-wrap items-baseline justify-center gap-x-2 gap-y-0.5">
                            <span className="text-xs font-bold uppercase tracking-[0.22em] text-white/70 sm:text-sm">
                                {t.only}
                            </span>
                            <span className="bg-gradient-to-b from-yellow-200 via-amber-300 to-red-500 bg-clip-text text-4xl font-black italic leading-none text-transparent drop-shadow-[0_0_18px_rgba(239,68,68,0.55)] sm:text-5xl md:text-6xl">
                                1000
                            </span>
                            <span className="text-lg font-black uppercase italic tracking-tight text-amber-300 sm:text-2xl md:text-3xl">
                                {t.som}
                            </span>
                        </span>

                        <span className="mt-3 text-sm font-black uppercase italic leading-snug tracking-tight text-white sm:text-base md:text-lg">
                            {t.kit}
                        </span>
                    </h2>

                    <p className="mb-6 text-xs font-semibold tracking-wide text-white/65 sm:text-sm">
                        {t.note}
                    </p>

                    <Link href="/sales" className="inline-block group">
                        <span className="relative inline-flex items-center justify-center overflow-hidden border border-red-400/60 bg-red-600 px-8 py-3 text-xs font-black uppercase italic tracking-[0.18em] text-white shadow-[0_0_28px_rgba(220,38,38,0.55)] transition-all duration-300 group-hover:bg-red-500 group-hover:shadow-[0_0_40px_rgba(239,68,68,0.75)] group-active:scale-95 sm:text-sm">
                            <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-500 group-hover:translate-x-[220%]" />
                            {t.open}
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
