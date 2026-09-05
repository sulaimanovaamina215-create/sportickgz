"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';
import { X, Play, Image as ImageIcon, MonitorSmartphone } from 'lucide-react';

const translations = {
    ky: [
        {
            title: "Сапат сертификаттары",
            desc: "Расмий тастыкталган документтер",
            show: "Сертификаттарды көрсөтүү ▼",
            hide: "Жашыруу ▲"
        },
        {
            title: "Биздин өнөктөштөр",
            desc: "Ишенимдүү кызматташтар",
            show: "Өнөктөштөрдү көрсөтүү ▼",
            hide: "Жашыруу ▲"
        },
        {
            title: "Тез жеткирүү",
            desc: "Кыргызстан боюнча оперативдүү",
            show: "Жеткирүүнү көрсөтүү ▼",
            hide: "Жашыруу ▲"
        }
    ],
    ru: [
        {
            title: "Сертификаты качества",
            desc: "Официально подтвержденные документы",
            show: "Показать сертификаты ▼",
            hide: "Скрыть ▲"
        },
        {
            title: "Наши партнеры",
            desc: "Надежные компаньоны и бренды",
            show: "Показать партнеров ▼",
            hide: "Скрыть ▲"
        },
        {
            title: "Быстрая доставка",
            desc: "Оперативно по всему КР",
            show: "Показать доставку ▼",
            hide: "Скрыть ▲"
        }
    ],
    en: [
        {
            title: "Quality Certificates",
            desc: "Officially verified documents",
            show: "Show certificates ▼",
            hide: "Hide ▲"
        },
        {
            title: "Our Partners",
            desc: "Trusted collaborators",
            show: "Show Partners ▼",
            hide: "Hide ▲"
        },
        {
            title: "Fast Delivery",
            desc: "Quick delivery across the country",
            show: "Show delivery ▼",
            hide: "Hide ▲"
        }
    ]
};

const deliveryClips = [
    { key: "site" as const, src: "", kind: "none" as const },
    { key: "work" as const, src: "/delivery/IMG_7587.jpg", kind: "image" as const },
    { key: "new" as const, src: "/delivery/IMG_1795.mp4", kind: "video" as const },
];

const deliveryClipTitles = {
    ky: ["Жеткирүү сайт аркылуу", "Кантип иштейбиз", "Жаңы келген товар"],
    ru: ["Доставка через сайт", "Как мы работаем", "Новое поступление"],
    en: ["Delivery via website", "How we work", "New arrivals"],
};

const mediaLabels = {
    ky: { video: "Видео", image: "Сүрөт", none: "Сайт" },
    ru: { video: "Видео", image: "Фото", none: "Сайт" },
    en: { video: "Video", image: "Photo", none: "Website" },
};

const clipIcons = { video: Play, image: ImageIcon, none: MonitorSmartphone };

const icons = ["📜", "🤝", "⚡"];

const partners = [
    { id: 1, name: 'Partner 1', logo: '/logo/1.png' },
    { id: 2, name: 'Академия футбола им. Асылбека Момунова', logo: '/logo/6.png' },
    { id: 3, name: 'Биздин Шоро Лига', logo: '/logo/4.png' },
    { id: 4, name: 'Muras United', logo: '/logo/7.png' },
    { id: 5, name: 'ILBIRS Football Club', logo: '/logo/ilbirs.png' },
    { id: 6, name: 'Pearl of Kyrgyzstan', logo: '/logo/pearl-zhemchuzhina.png' },
    { id: 7, name: 'Football Academy Champion', logo: '/logo/football-academy-champion.png' },
    { id: 8, name: 'НФСРБ', logo: '/logo/nfsrb.png' },
];

const certificates = [
    { src: "/certificates/kelme.png", alt: "KELME Official Distributor Certificate — SPORTICKGZ", brand: "KELME" },
    { src: "/certificates/molten.png", alt: "Molten Authorization Certificate — SPORTICKGZ", brand: "MOLTEN" },
    { src: "/certificates/mikasa.png", alt: "Mikasa Authorization Certificate — SPORTICKGZ", brand: "MIKASA" },
    { src: "/certificates/joma.png", alt: "JOMA Official Distributor Certificate — SPORTICKGZ", brand: "JOMA" },
    { src: "/certificates/kyrgyz-1.jpg", alt: "Күбөлүк / товардык белги № 21804", brand: "SPORTICKGZ" },
    { src: "/certificates/kyrgyz-2.jpg", alt: "Свидетельство на товарный знак SPORTIC.KGZ № 21804", brand: "SPORTICKGZ" },
    { src: "/certificates/games-1.jpg", alt: "Благодарственное письмо Pearl of Kyrgyzstan 2026", brand: "PEARL" },
    { src: "/certificates/pearl-of-1.jpg", alt: "Благодарственное письмо Pearl of Kyrgyzstan 2025", brand: "PEARL" },
    { src: "/certificates/sportic-award.png", alt: "Награда SPORTIC.KG — Дирекция по неолимпийским видам спорта 2025", brand: "AWARD" },
];

const BenefitsSection = () => {
    const { lang } = useLanguage();
    const t = translations[lang as keyof typeof translations];
    const clipTitles = deliveryClipTitles[lang as keyof typeof deliveryClipTitles] || deliveryClipTitles.ru;
    const labels = mediaLabels[lang as keyof typeof mediaLabels] || mediaLabels.ru;
    const [openPanel, setOpenPanel] = useState<"cert" | "partners" | "delivery" | null>(null);
    const [preview, setPreview] = useState<(typeof certificates)[number] | null>(null);
    const [activeClip, setActiveClip] = useState<(typeof deliveryClips)[number]["key"] | null>(null);
    const selectedClip = deliveryClips.find((item) => item.key === activeClip);
    const selectedClipTitle = selectedClip
        ? clipTitles[deliveryClips.findIndex((item) => item.key === selectedClip.key)]
        : "";

    const toggle = (panel: "cert" | "partners" | "delivery") => {
        setOpenPanel((prev) => {
            const next = prev === panel ? null : panel;
            if (next !== "delivery") setActiveClip(null);
            return next;
        });
    };

    return (
        <section className="py-20 md:py-24 bg-[#0a192f]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {t.map((item, index) => {
                        const panel = index === 0 ? "cert" : index === 1 ? "partners" : "delivery";
                        const isOpen = openPanel === panel;
                        return (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.03 }}
                                onClick={() => toggle(panel)}
                                className="bg-white p-6 sm:p-8 flex flex-col items-center text-center shadow-2xl transition-all cursor-pointer ring-offset-2 hover:ring-2 hover:ring-blue-500"
                                style={{
                                    borderRadius: "40px 0px 40px 0px"
                                }}
                            >
                                <div className="text-3xl sm:text-4xl mb-4 sm:mb-6 bg-slate-100 p-4 rounded-full">{icons[index]}</div>
                                <h3 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tighter mb-2 sm:mb-3">{item.title}</h3>
                                <p className="text-xs sm:text-sm text-slate-600 font-medium">{item.desc}</p>
                                <span className="text-xs sm:text-sm text-blue-600 mt-4 font-bold underline transition-colors">
                                    {isOpen ? item.hide : item.show}
                                </span>
                            </motion.div>
                        );
                    })}
                </div>

                {openPanel === "cert" && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7"
                    >
                        {certificates.map((cert) => (
                            <button
                                key={cert.src}
                                type="button"
                                onClick={() => setPreview(cert)}
                                className="group text-left"
                            >
                                <div className="rounded-[22px] bg-gradient-to-br from-[#d4af37] via-[#8a6d2b] to-[#d4af37] p-[1.5px] shadow-[0_18px_40px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:-translate-y-1">
                                    <div className="rounded-[20.5px] bg-[#071422] p-3 sm:p-4">
                                        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-[#f6f1e4]">
                                            <div className="pointer-events-none absolute inset-2 z-10 border border-[#d4af37]/45" />
                                            <Image
                                                src={cert.src}
                                                alt={cert.alt}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                                className="object-contain p-3"
                                            />
                                        </div>
                                        <div className="mt-3 text-center">
                                            <p className="text-[10px] font-black tracking-[0.28em] text-[#d4af37] uppercase">
                                                {cert.brand}
                                            </p>
                                            <p className="mt-1 text-xs font-black tracking-tighter text-white">
                                                SPORTIC<span className="text-red-600">KGZ</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </motion.div>
                )}

                {openPanel === "partners" && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="mt-8 sm:mt-12 overflow-hidden relative w-full py-6 sm:py-8"
                    >
                        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#0a192f] to-transparent z-10 pointer-events-none"></div>
                        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#0a192f] to-transparent z-10 pointer-events-none"></div>

                        <div className="flex animate-marquee space-x-8 sm:space-x-14 items-center">
                            {[...partners, ...partners, ...partners].map((partner, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center justify-center min-w-[200px] sm:min-w-[240px] h-[90px] sm:h-[110px] px-6 py-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all duration-300 shrink-0"
                                >
                                    <Image
                                        src={partner.logo}
                                        alt={partner.name}
                                        width={160}
                                        height={70}
                                        className="object-contain h-14 sm:h-20 w-auto transition duration-300 filter drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                                    />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {openPanel === "delivery" && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="mt-8 sm:mt-12 space-y-4 sm:space-y-6"
                    >
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
                            {deliveryClips.map((clip, index) => {
                                const isActive = activeClip === clip.key;
                                const Icon = clipIcons[clip.kind];
                                return (
                                    <button
                                        key={clip.key}
                                        type="button"
                                        onClick={() => setActiveClip((prev) => (prev === clip.key ? null : clip.key))}
                                        className={`group flex items-center gap-3.5 rounded-2xl border p-4 text-left transition-all duration-300 ${
                                            isActive
                                                ? "border-cyan-400/70 bg-cyan-400/10 shadow-[0_0_28px_rgba(34,211,238,0.28)]"
                                                : "border-white/10 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.07]"
                                        }`}
                                    >
                                        <span
                                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                                                isActive
                                                    ? "bg-cyan-400 text-[#071422]"
                                                    : "bg-white/10 text-cyan-300 group-hover:bg-white/15"
                                            }`}
                                        >
                                            <Icon size={18} />
                                        </span>
                                        <span className="min-w-0">
                                            <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-cyan-300/80">
                                                {labels[clip.kind]}
                                            </span>
                                            <span className="block text-sm font-bold leading-snug text-white">
                                                {clipTitles[index]}
                                            </span>
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {selectedClip && selectedClip.kind !== "none" && (
                            <motion.div
                                key={selectedClip.key}
                                initial={{ opacity: 0, scale: 0.96 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                                className="mx-auto w-full max-w-[300px] sm:max-w-[330px]"
                            >
                                <div className="rounded-[26px] bg-gradient-to-br from-cyan-400/70 via-blue-500/35 to-cyan-400/70 p-[1.5px] shadow-[0_20px_50px_rgba(8,47,73,0.55)]">
                                    <div className="rounded-[24.5px] bg-[#071422] p-2.5">
                                        <div className="mb-2.5 flex items-center justify-between gap-2 pl-1.5">
                                            <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.22em] text-cyan-300">
                                                {selectedClip.kind === "video" ? <Play size={11} /> : <ImageIcon size={11} />}
                                                {labels[selectedClip.kind]}
                                            </span>
                                            <button
                                                type="button"
                                                aria-label="Close"
                                                onClick={() => setActiveClip(null)}
                                                className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/70 transition hover:bg-red-600 hover:text-white"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>

                                        <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[18px] bg-black">
                                            {selectedClip.kind === "video" ? (
                                                <video
                                                    key={selectedClip.src}
                                                    controls
                                                    playsInline
                                                    autoPlay
                                                    loop
                                                    muted
                                                    preload="metadata"
                                                    className="h-full w-full object-cover"
                                                >
                                                    <source src={selectedClip.src} type="video/mp4" />
                                                </video>
                                            ) : (
                                                <Image
                                                    src={selectedClip.src}
                                                    alt={selectedClipTitle}
                                                    fill
                                                    sizes="330px"
                                                    className="object-cover"
                                                />
                                            )}
                                            <div className="pointer-events-none absolute inset-0 rounded-[18px] ring-1 ring-inset ring-white/15" />
                                        </div>

                                        <p className="mt-2.5 text-center text-[11px] font-bold uppercase tracking-[0.16em] text-white/60">
                                            {selectedClipTitle}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </div>

            {preview && (
                <div
                    className="fixed inset-0 z-[80] flex items-center justify-center bg-[#03080f]/90 p-4 backdrop-blur-sm"
                    onClick={() => setPreview(null)}
                >
                    <button
                        type="button"
                        aria-label="Close"
                        className="absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-[#0a192f] text-white shadow-lg ring-2 ring-red-600 transition hover:bg-red-600"
                        onClick={() => setPreview(null)}
                    >
                        <X size={22} />
                    </button>
                    <div
                        className="relative w-full max-w-5xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="rounded-[24px] bg-gradient-to-br from-[#d4af37] via-[#8a6d2b] to-[#d4af37] p-[2px] shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
                            <div className="rounded-[22px] bg-[#071422] px-4 pb-5 pt-4 sm:px-6 sm:pb-6">
                                <div className="mb-4 flex items-center justify-between gap-3">
                                    <p className="text-lg font-black tracking-tighter text-white">
                                        SPORTIC<span className="text-red-600">KGZ</span>
                                    </p>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#d4af37]">
                                        {preview.brand} · Official
                                    </p>
                                </div>
                                <div className="relative mx-auto h-[78vh] w-full overflow-hidden rounded-xl bg-[#f6f1e4]">
                                    <Image
                                        src={preview.src}
                                        alt={preview.alt}
                                        fill
                                        sizes="100vw"
                                        className="object-contain p-3 sm:p-5"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default BenefitsSection;
