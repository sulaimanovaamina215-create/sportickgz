'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext'; // Сиздин контекст
import Script from 'next/script';

type LanguageType = 'ky' | 'ru' | 'en';

const translations: Record<LanguageType, {
    bgText: string;
    sportBg: string;
    subtitle: string;
    title: string;
    description: string;
    addressLabel: string;
    addressValue1: string;
    addressValue2: string;
    phoneLabel: string;
    instagramLabel: string;
    hoursLabel: string;
    hoursWeekdays: string;
    hoursSaturday: string;
    hoursSunday: string;
    mapViewLarger: string;
}> = {
    ky: {
        bgText: "CONTACTS",
        sportBg: "SPORT",
        subtitle: "Байланыш",
        title: "Байланышуу",
        description: "Биз менен байланышыңыз. Суроолоруңуз болсо же кызматташтык жөнүндө сүйлөшүүнү кааласаңыз, биз ар дайым сизге жардам берүүгө даярбыз!",
        addressLabel: "Даректер",
        addressValue1: "Дүкөн: Бишкек ш., Чүй проспектиси 186",
        addressValue2: "Оптом: Дордой базары, «Джунхай» базары, 8-өтмөк, 37д-38д контейнер.",
        phoneLabel: "Телефондор жана WhatsApp",
        instagramLabel: "Instagram баракчалары",
        hoursLabel: "Иштөө убактысы",
        hoursWeekdays: "Дүкөн \n" +
            "09:00 - 21:00 (Дем алышсыз)",
        hoursSaturday: "Оптом \n" +
            "09:00 - 17:00 (Дем алышсыз)",
        hoursSunday: "",
        mapViewLarger: "Чоңураак картаны көрүү"
    },
    ru: {
        bgText: "КОНТАКТЫ",
        sportBg: "SPORT",
        subtitle: "Контакты",
        title: "Связаться с нами",
        description: "Свяжитесь с нами. Если у вас есть вопросы или вы хотите обсудить сотрудничество, мы всегда готовы помочь вам!",
        addressLabel: "Адреса",
        addressValue1: "Магазин: г. Бишкек, пр. Чуй 186",
        addressValue2: "Оптом: Рынок Дордой, рынок «Джунхай», 8-проход, контейнер 37д-38д.",
        phoneLabel: "Телефоны и WhatsApp",
        instagramLabel: "Страницы Instagram",
        hoursLabel: "Время работы",
        hoursWeekdays: "Магазин \n" +
            "09:00 - 21:00 (Без выходных)",
        hoursSaturday: "Оптом \n" +
            "09:00 - 17:00 (Без выходных)",
        hoursSunday: "",
        mapViewLarger: "Посмотреть увеличенную карту"
    },
    en: {
        bgText: "CONTACTS",
        sportBg: "SPORT",
        subtitle: "Contacts",
        title: "Contact Us",
        description: "Get in touch with us. If you have any questions or want to discuss cooperation, we are always ready to help you!",
        addressLabel: "Addresses",
        addressValue1: "Shop: 186 Chuy Ave, Bishkek",
        addressValue2: "Wholesale: Dordoi Bazaar, 8th Alley (Passage), Container 37d-38d.",
        phoneLabel: "Phones & WhatsApp",
        instagramLabel: "Instagram Profiles",
        hoursLabel: "Working Hours",
        hoursWeekdays: "Shop \n" +
            "09:00 - 21:00 (Open Daily)",
        hoursSaturday: "Wholesale \n" +
            "09:00 - 17:00 (Open Daily)",
        hoursSunday: "",
        mapViewLarger: "View larger map"
    }
};

export default function Contacts() {
    const { lang } = useLanguage();
    const currentLang: LanguageType = lang || 'ru';
    const t = translations[currentLang];
    const mapReady = useRef(false);

    const initMap = useCallback(() => {
        if (typeof window === "undefined" || mapReady.current) return;
        const DG = (window as any).DG;
        if (!DG) return;

        const run = () => {
            if (mapReady.current) return;
            const el = document.getElementById('map');
            if (!el || typeof DG.map !== "function") return;
            if ((el as any)._leaflet_id) {
                mapReady.current = true;
                return;
            }

            const shop: [number, number] = [42.87702, 74.57433];
            const wholesale: [number, number] = [42.93333, 74.62083];

            const map = DG.map('map', {
                center: shop,
                zoom: 12
            });
            // Raster JS API ключсуз 2ГИС тайлы бош калат — жерлер көрүнсүн деп OSM фон
            if (typeof DG.tileLayer === "function") {
                DG.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
                    maxZoom: 19,
                    attribution: "&copy; OpenStreetMap"
                }).addTo(map);
            }
            DG.marker(shop).addTo(map).bindPopup(t.addressValue1);
            DG.marker(wholesale).addTo(map).bindPopup(t.addressValue2);
            map.fitBounds([shop, wholesale], { padding: [40, 40] });
            el.querySelectorAll(".dg-attribution__warning-message").forEach((node) => {
                (node as HTMLElement).style.display = "none";
            });
            window.setTimeout(() => {
                el.querySelectorAll(".dg-attribution__warning-message").forEach((node) => {
                    (node as HTMLElement).style.display = "none";
                });
            }, 800);
            mapReady.current = true;
        };

        if (typeof DG.then === "function") {
            DG.then(run);
        } else {
            run();
        }
    }, [t.addressValue1, t.addressValue2]);

    useEffect(() => {
        initMap();
        const id = window.setInterval(() => {
            if (mapReady.current) {
                window.clearInterval(id);
                return;
            }
            initMap();
        }, 300);
        return () => window.clearInterval(id);
    }, [initMap]);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans relative overflow-hidden flex flex-col justify-between p-6 md:p-12 lg:p-20">

            {/* Фондогу чоң тексттер */}
            <div className="absolute left-[-5%] top-1/4 -translate-y-1/2 text-[#151515] font-black text-[10vw] select-none pointer-events-none uppercase tracking-wider vertical-text hidden lg:block" style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}>
                {t.bgText}
            </div>
            <div className="absolute right-[-2%] top-1/3 text-[#151515] font-black text-[12vw] select-none pointer-events-none uppercase tracking-widest hidden lg:block" style={{ writingMode: 'vertical-lr' }}>
                {t.sportBg}
            </div>

            <div className="max-w-7xl mx-auto w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                {/* Сол тарап: Байланыш маалыматтары */}
                <div className="lg:col-span-7 space-y-8">
                    <motion.div
                        key={currentLang}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <span className="text-red-600 font-bold uppercase tracking-widest text-sm block mb-2">
                          {t.subtitle}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight border-b-4 border-red-600 pb-4 inline-block">
                            {t.title}
                        </h1>
                        <p className="text-gray-400 mt-6 text-sm md:text-base max-w-md leading-relaxed">
                            {t.description}
                        </p>
                    </motion.div>

                    {/* Инфо тизмеси */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">

                        {/* 2 Дарек - Басканда Картадан ачылат */}
                        <div className="flex items-start gap-4 border-b border-zinc-800 pb-4 md:col-span-2">
                            <div className="p-3 bg-zinc-900 border border-red-600/30 rounded-lg text-red-500 shrink-0">
                                <MapPin size={20} />
                            </div>
                            <div className="space-y-1 w-full">
                                <h4 className="text-gray-400 text-xs font-semibold uppercase">{t.addressLabel}</h4>
                                <a
                                    href="https://www.google.com/maps/search/?api=1&query=Бишкек+Чуй+186"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm md:text-base border-b border-zinc-800 pb-4 font-medium text-zinc-200 block hover:text-red-500 hover:underline transition-colors"
                                >
                                    {t.addressValue1}
                                </a>
                                <a
                                    href="https://maps.app.goo.gl/RaZwbfvPrPvweRTs6?g_st=iwb"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm md:text-base py-2 font-medium text-zinc-200 block hover:text-red-500 hover:underline transition-colors"
                                >
                                    {t.addressValue2}
                                </a>
                            </div>
                        </div>
                        {/* Иштөө убактысы */}
                        <div className="flex items-start gap-4 md:col-span-2">
                            <div className="p-3 bg-zinc-900 border border-red-600/30 rounded-lg text-red-500 shrink-0">
                                <Clock size={20} />
                            </div>
                            <div>
                                <h4 className="text-gray-400 text-xs font-semibold uppercase">{t.hoursLabel}</h4>
                                <p className="text-sm md:text-base border-b border-zinc-800 pb-4 font-medium mt-0.5">{t.hoursWeekdays}</p>
                                <p className="font-medium border-b mt-6 border-zinc-800 pb-4   text-zinc-200 py-2 ">
                                    {t.hoursSaturday} <span className=" mx-2"></span> {t.hoursSunday}
                                </p>
                            </div>
                        </div>

                        {/* 3 Телефон (Басканда дароо WhatsApp чатка кирет) */}
                        <div className="flex items-start gap-4 border-b border-zinc-800 pb-4">
                            <div className="p-3 bg-zinc-900 border border-red-600/30 rounded-lg text-red-500 shrink-0">
                                <Phone size={20} />
                            </div>
                            <div className="space-y-1 w-full">
                                <h4 className="text-gray-400 text-xs font-semibold uppercase">{t.phoneLabel}</h4>

                                {/* 1-номер үчүн WhatsApp шилтемеси */}
                                <a
                                    href="https://wa.me/996700880059"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="WhatsApp аркылуу баарлашуу"
                                    className="text-sm font-medium  hover:text-green-500 hover:underline transition-colors flex items-center gap-2"
                                >
                                    +996 700 880 059
                                </a>

                                {/* 2-номер үчүн WhatsApp шилтемеси */}
                                <a
                                    href="https://wa.me/996708880025"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="WhatsApp аркылуу баарлашуу"
                                    className="text-sm font-medium hover:text-green-500 hover:underline transition-colors flex items-center gap-2"
                                >
                                    +996 708 880 025
                                </a>

                                {/* 3-номер үчүн WhatsApp шилтемеси */}
                                <a
                                    href="https://wa.me/996500852123"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="WhatsApp аркылуу баарлашуу"
                                    className="text-sm font-medium hover:text-green-500 hover:underline transition-colors flex items-center gap-2"
                                >
                                    +996 500 852 123
                                </a>
                            </div>
                        </div>

                        {/* 2 Instagram баракчасы */}
                        <div className="flex items-start gap-4 border-b border-zinc-800 pb-4">
                            <div className="p-3 bg-zinc-900 border border-red-600/30 rounded-lg text-red-500 shrink-0">
                                <Mail size={20} />
                            </div>
                            <div className="space-y-1 w-full">
                                <h4 className="text-gray-400 text-xs font-semibold uppercase">{t.instagramLabel}</h4>
                                <a href="https://www.instagram.com/sportic_kgz_official?igsh=MXR5NHdtZTN6ZTZqYw==" target="_blank" rel="noopener noreferrer" className="text-sm font-medium block text-zinc-300 hover:text-red-500 transition-colors">sportic_kgz_official </a>
                                <a href="https://www.instagram.com/sportic_kgz_optom?igsh=dTRzeW9jMDJkcHVk" target="_blank" rel="noopener noreferrer" className="text-sm font-medium block text-zinc-300 hover:text-red-500 transition-colors">sportic_kgz_optom </a>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Оң тарап: Арткы кара фон менен сулуу уйкаштырылган сүрөт бөлүгү */}
                <div className="lg:col-span-5 relative min-h-[420px] md:min-h-[560px] w-full flex items-center justify-center">

                    {/* Фондогу чоң "SPORT" жазуусу - Сүрөттүн артына жайгаштырылды (z-0) */}
                    <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 text-zinc-900/30 font-black text-[14vw] select-none pointer-events-none uppercase tracking-widest z-0" style={{ writingMode: 'vertical-lr' }}>
                        SPORT
                    </div>

                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-10">
                        <div className="h-[55%] w-[70%] rounded-full bg-red-600/25 blur-[80px]" />
                    </div>

                    {/* Футболчунун сүрөтү — эллипс, төрт бурчсуз */}
                    <div className="relative z-40 w-full max-w-[520px] aspect-[3/4]">
                        <img
                            src="/contacts-athletes-duo.png"
                            alt="Sportic KGZ Football"
                            className="h-full w-full select-none object-contain object-center pointer-events-none"
                            style={{
                                maskImage: 'radial-gradient(ellipse 78% 72% at 50% 48%, #000 32%, transparent 72%)',
                                WebkitMaskImage: 'radial-gradient(ellipse 78% 72% at 50% 48%, #000 32%, transparent 72%)',
                            }}
                        />
                    </div>
                </div>

            </div>

            <div className="max-w-7xl mx-auto w-full z-10 mt-12">
                <Script
                    src="https://maps.api.2gis.ru/2.0/loader.js?pkg=full"
                    strategy="afterInteractive"
                    onLoad={initMap}
                />

                {/* Карта үчүн контейнер */}
                <div id="map" className="w-full h-[350px] rounded-xl overflow-hidden border border-zinc-800 shadow-2xl bg-[#111] [&_.dg-attribution__warning-message]:hidden"></div>
            </div>
        </div>
    );
}