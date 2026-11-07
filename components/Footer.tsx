"use client";
import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

interface FooterProps {
    setActiveTab: (tab: string | null) => void;
}

const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
    const { lang } = useLanguage();

    const translations: any = {
        ky: { menu: "Меню", team: "Биз жөнүндө", catalog: "Бренд DEM", wholesale: "Каталог", contacts: "Байланыш", social: "Биз социалдык тармактарда", desc: "" },
        ru: { menu: "Меню", team: "О нас", catalog: "Бренд DEM", wholesale: "Каталог", contacts: "Контакты", social: "Мы в социальных сетях", desc: "" },
        en: { menu: "Menu", team: "Our Team", catalog: "Brand DEM", wholesale: "Catalog", contacts: "Contacts", social: "Social Media", desc: "" }
    };

    const t = translations[lang] || translations['ru'];

    return (
        <footer className="w-full bg-[#05050A] text-white pt-16 pb-10 border-t border-white/10 relative overflow-hidden font-sans">

            {/* Артка неон жарык эффекттери (Спорттук кибер-стиль) */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[200px] bg-gradient-to-t from-blue-600/10 via-red-600/5 to-transparent blur-[100px] pointer-events-none"></div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 text-center md:text-left">

                    {/* Логотип жана кыскача маалымат */}
                    <div className="flex flex-col items-center md:items-start">
                        <div className="w-[180px] h-[70px] relative mb-3">
                            <Image src="/logo1.png" alt="SPORTICKGZ Logo" fill className="object-contain brightness-200" />
                        </div>
                        <p className="text-zinc-400 text-xs leading-relaxed max-w-xs">{t.desc}</p>
                    </div>

                    {/* Навигация / Меню */}
                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="font-black uppercase text-xs tracking-widest text-blue-400 mb-4 italic">{t.menu}</h3>
                        <ul className="space-y-3 text-sm font-bold text-zinc-300">
                            <li><button onClick={() => setActiveTab("about")} className="hover:text-red-500 transition-colors uppercase italic">{t.team}</button></li>
                            <li><button onClick={() => setActiveTab("catalog")} className="hover:text-red-500 transition-colors uppercase italic">{t.catalog}</button></li>
                            <li><button onClick={() => setActiveTab("wholesale")} className="hover:text-red-500 transition-colors uppercase italic">{t.wholesale}</button></li>
                        </ul>
                    </div>

                    {/* Байланыштар (WhatsApp) */}
                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="font-black uppercase text-xs tracking-widest text-blue-400 mb-4 italic">{t.contacts}</h3>
                        <div className="flex flex-col gap-3 w-full max-w-[240px] md:max-w-none">
                            <a href="https://wa.me/996700880059" target="_blank" rel="noopener noreferrer" title="WhatsApp аркылуу баарлашуу" className="flex items-center justify-center md:justify-start gap-3 bg-white/5 hover:bg-green-500/10 border border-white/10 hover:border-green-500/50 p-3 rounded-xl transition-all text-xs font-bold text-zinc-300 hover:text-green-400 group">
                                <svg className="w-5 h-5 text-green-500 flex-shrink-0 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                                <span>+996 700 880 059</span>
                            </a>
                            <a href="https://wa.me/996708880025" target="_blank" rel="noopener noreferrer" title="WhatsApp аркылуу баарлашуу" className="flex items-center justify-center md:justify-start gap-3 bg-white/5 hover:bg-green-500/10 border border-white/10 hover:border-green-500/50 p-3 rounded-xl transition-all text-xs font-bold text-zinc-300 hover:text-green-400 group">
                                <svg className="w-5 h-5 text-green-500 flex-shrink-0 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                                <span>+996 708 880 025</span>
                            </a>
                        </div>
                    </div>

                    {/* Социалдык тармактар (Telegram + Instagram) */}
                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="font-black uppercase text-xs tracking-widest text-blue-400 mb-4 italic">{t.social}</h3>
                        <div className="flex flex-col gap-2.5 w-full max-w-[240px] md:max-w-none">

                            {/* Telegram ссылкасы Instagram'дын алдына коюлду */}
                            <a href="https://t.me/sporticopt" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white/5 hover:bg-sky-500/10 border border-white/10 hover:border-sky-500/50 px-3.5 py-2.5 rounded-xl transition-all text-xs font-bold text-zinc-300 hover:text-sky-400 group">
                                <svg className="w-4 h-4 text-sky-400 flex-shrink-0 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2L2 9.5l8 3.5L13 21l3.5-8L21.5 2z"/></svg>
                                <span>sporticopt</span>
                            </a>

                            {/* Instagram баракчалары */}
                            {[
                                { link: "https://www.instagram.com/sportic_kgz_optom", name: "sportic_kgz_optom" },
                                { link: "https://www.instagram.com/sportic_kgz_official", name: "sportic_kgz_official" },
                                { link: "https://www.instagram.com/dem_sport_official", name: "dem_sport_official" }
                            ].map((item, i) => (
                                <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white/5 hover:bg-pink-500/10 border border-white/10 hover:border-pink-500/50 px-3.5 py-2.5 rounded-xl transition-all text-xs font-bold text-zinc-300 hover:text-pink-400 group">
                                    <svg className="w-4 h-4 text-pink-500 flex-shrink-0 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                                    <span>{item.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Copyright бөлүгү */}
                <div className="border-t border-white/10 mt-12 pt-6 text-center text-zinc-500 text-[11px] font-semibold tracking-wider">
                    <p>© SPORTICKGZ.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;