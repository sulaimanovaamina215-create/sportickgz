"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { motion, useReducedMotion } from "framer-motion";
import ProductZoomModal, { type ZoomAnchor } from "@/components/ProductZoomModal";

const items = [
    {
        id: 1,
        src: "/d1.png",
        tag: { ky: "Хит", ru: "Хит", en: "Hit" },
        title: { ky: "Көк комплект", ru: "Синий комплект", en: "Blue kit" },
        hint: { ky: "Тренировка жана клуб", ru: "Тренировки и клуб", en: "Training and club" },
    },
    {
        id: 2,
        src: "/d2.png",
        tag: { ky: "Жаңы", ru: "Новинка", en: "New" },
        title: { ky: "Кара комплект", ru: "Чёрный комплект", en: "Black kit" },
        hint: { ky: "Студиялык кадр", ru: "Студийный кадр", en: "Studio look" },
    },
    {
        id: 3,
        src: "/d3.png",
        tag: { ky: "Классика", ru: "Классика", en: "Classic" },
        title: { ky: "Кызыл комплект", ru: "Красный комплект", en: "Red kit" },
        hint: { ky: "Жаркын стиль", ru: "Яркий стиль", en: "Bold style" },
    },
    {
        id: 4,
        src: "/d4.png",
        tag: { ky: "Премиум", ru: "Премиум", en: "Premium" },
        title: { ky: "Ак комплект", ru: "Белый комплект", en: "White kit" },
        hint: { ky: "Таза дизайн", ru: "Чистый дизайн", en: "Clean design" },
    },
];

const copy = {
    ky: {
        kicker: "Жаңы сезон",
        line1: "Биз",
        line2: "спортту",
        line3: "жеткиликтүү",
        line4: "кылабыз",
    },
    ru: {
        kicker: "Новый сезон",
        line1: "Мы",
        line2: "делаем спорт",
        line3: "доступным",
        line4: "каждому",
    },
    en: {
        kicker: "New season",
        line1: "We",
        line2: "make sport",
        line3: "accessible",
        line4: "to everyone",
    },
};

const HeroSection = () => {
    const { lang } = useLanguage();
    const reduceMotion = useReducedMotion();
    const currentLang: keyof typeof copy = lang === "ky" || lang === "en" ? lang : "ru";
    const t = copy[currentLang];

    const [index, setIndex] = useState(0);
    const [selectedItem, setSelectedItem] = useState<(typeof items)[number] | null>(null);
    const [zoomAnchor, setZoomAnchor] = useState<ZoomAnchor | null>(null);
    const promoRef = useRef<HTMLButtonElement>(null);
    const slide = items[index];

    useEffect(() => {
        if (reduceMotion) return;
        const id = window.setInterval(() => {
            setIndex((i) => (i + 1) % items.length);
        }, 4200);
        return () => window.clearInterval(id);
    }, [reduceMotion]);

    const openZoom = () => {
        const rect = promoRef.current?.getBoundingClientRect();
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
        setSelectedItem(items[index]);
    };

    return (
        <section className="relative flex w-full items-center overflow-hidden">
            {/* IMG3.mp4 has ~10% black letterbox baked into the top and bottom of the frame,
                so portrait viewports need more than 1.243x zoom to crop it out */}
            <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="absolute inset-0 z-0 h-full w-full scale-[1.3] object-cover"
            >
                <source src="/IMG3.mp4?v=h264" type="video/mp4" />
            </video>
            <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#070b14]/92 via-[#070b14]/55 to-[#070b14]/25" />
            <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#070b14]/80 via-transparent to-[#070b14]/35" />
            <div className="pointer-events-none absolute left-0 top-10 z-[1] h-72 w-72 rounded-full bg-red-600/20 blur-[100px] md:-left-24" />
            <div className="pointer-events-none absolute bottom-0 right-0 z-[1] h-80 w-80 rounded-full bg-blue-700/20 blur-[110px]" />

            <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-4 py-8 md:flex-row md:items-center md:justify-between md:gap-12 md:px-8 md:py-10">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55 }}
                    className="flex w-full max-w-md flex-col justify-center text-center md:text-left"
                >
                    <span className="mb-4 inline-block border-b-2 border-red-600 pb-1 text-[10px] font-bold uppercase tracking-[0.28em] text-red-500">
                        {t.kicker}
                    </span>
                    <h1 className="text-[1.85rem] font-black uppercase italic leading-[0.92] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.35rem]">
                        <span className="block text-white/90">{t.line1}</span>
                        <span className="block text-white">{t.line2}</span>
                        <span className="mt-1 block text-red-500">{t.line3}</span>
                        <span className="block text-white">{t.line4}</span>
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.55, delay: 0.1 }}
                    className="flex w-full max-w-[260px] shrink-0 flex-col justify-center text-white sm:max-w-[280px]"
                >
                    <span className="mb-2 inline-block self-start border border-white/20 bg-black/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-300 backdrop-blur-sm">
                        {slide.tag[currentLang]}
                    </span>

                    <button
                        ref={promoRef}
                        type="button"
                        onClick={openZoom}
                        className="relative block aspect-[3/4] w-full cursor-zoom-in overflow-hidden rounded-2xl text-left"
                    >
                        {items.map((item, i) => (
                            <div
                                key={item.id}
                                className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                                    i === index ? "opacity-100" : "pointer-events-none opacity-0"
                                }`}
                            >
                                <Image
                                    src={item.src}
                                    alt={item.title[currentLang]}
                                    fill
                                    priority={i === 0}
                                    className="object-cover object-center"
                                    sizes="280px"
                                />
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070b14]/70 via-transparent to-transparent" />
                                <div className="pointer-events-none absolute left-3 top-3 h-3.5 w-3.5 border-l-2 border-t-2 border-red-600" />
                                <div className="pointer-events-none absolute bottom-3 right-3 h-3.5 w-3.5 border-b-2 border-r-2 border-white" />
                            </div>
                        ))}
                    </button>

                    <div className="mt-3">
                        <p className="text-base font-black uppercase italic tracking-tight text-white sm:text-lg">
                            {slide.title[currentLang]}
                        </p>
                        <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white/55">
                            {slide.hint[currentLang]}
                        </p>

                        <div className="mt-3 flex gap-1.5">
                            {items.map((_, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => setIndex(i)}
                                    className={`h-1.5 rounded-full transition-all ${
                                        i === index
                                            ? "w-5 bg-red-500"
                                            : "w-1.5 bg-white/30 hover:bg-white/55"
                                    }`}
                                    aria-label={`Slide ${i + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            <ProductZoomModal
                open={Boolean(selectedItem)}
                src={selectedItem?.src || items[0].src}
                alt={selectedItem ? selectedItem.title[currentLang] : ""}
                anchor={zoomAnchor}
                onClose={() => {
                    setSelectedItem(null);
                    setZoomAnchor(null);
                }}
            />
        </section>
    );
};

export default HeroSection;
