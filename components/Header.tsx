"use client";
import { useCart } from "@/context/CartContext";
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ShoppingCart } from 'lucide-react';

interface HeaderProps {
    activeTab: string | null;
    setActiveTab: (tab: string | null) => void;
}

const translations = {
    ky: { about: "Биз жөнүндө", catalog: "Бренд DEM", wholesale: "Каталог", contacts: "Байланыш", cart: "Себет" },
    ru: { about: "О нас", catalog: "Бренд DEM", wholesale: "Каталог", contacts: "Контакты", cart: "Корзина" },
    en: { about: "About us", catalog: "DEM brand", wholesale: "Catalog", contacts: "Contacts", cart: "Cart" }
};

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
    const { lang, setLang } = useLanguage();
    const t = translations[lang as keyof typeof translations];
    const [isOpen, setIsOpen] = useState(false);
    const { cart } = useCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    const handleNav = (tab: string | null) => {
        setActiveTab(tab);
        setIsOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 w-full max-w-full border-b border-white/10 bg-[#0a192f]/80 px-4 py-4 shadow-lg backdrop-blur-md md:px-5 md:py-5">
            <div className="flex items-center justify-between">
                <div className="text-2xl font-black tracking-tighter text-white cursor-pointer" onClick={() => handleNav(null)}>
                    SPORTIC<span className="text-red-600">KGZ</span>
                </div>

                <button className="md:hidden text-white text-2xl" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? '✕' : '☰'}
                </button>

                <nav className="hidden md:flex gap-2 text-white items-center">
                    {['about', 'catalog', 'wholesale', 'contacts'].map((tab) => (
                        <button key={tab} onClick={() => handleNav(tab)} className={`px-4 py-2 text-base font-bold uppercase italic transition-all duration-300 ${activeTab === tab ? 'border border-white rounded-lg text-white' : 'text-white/85 hover:text-white'}`}>
                            {t[tab as keyof typeof t]}
                        </button>
                    ))}
                </nav>

                {/* КОМПЬЮТЕР версиясы: Тил которгуч жана Цифрасы бар Корзина */}
                <div className="hidden md:flex items-center gap-4">
                    <select value={lang} onChange={(e) => setLang(e.target.value)} className="bg-transparent text-white border border-white/20 rounded-md p-1 outline-none cursor-pointer">
                        <option value="ky" className="text-black">KG</option>
                        <option value="ru" className="text-black">RU</option>
                        <option value="en" className="text-black">EN</option>
                    </select>

                    <button onClick={() => handleNav('cart')} className="relative flex items-center justify-center h-10 w-10 text-white font-black transition-all duration-300 skew-x-[-15deg] hover:text-red-600 border border-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                        <span className="skew-x-[15deg]"><ShoppingCart size={22} /></span>
                        {totalItems > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                                {totalItems}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden mt-5 flex flex-col gap-2 text-white pb-5 border-t border-white/10 pt-5 text-center font-bold uppercase italic text-base">
                    {['about', 'catalog', 'wholesale', 'contacts'].map((tab) => (
                        <button key={tab} onClick={() => handleNav(tab)} className={`py-2 px-4 rounded-md transition-all ${activeTab === tab ? 'bg-gray-800' : 'hover:bg-gray-800/50'}`}>
                            {t[tab as keyof typeof t]}
                        </button>
                    ))}

                    {/* МОБИЛДИК версия: Тил которгуч жана Цифрасы бар Корзина */}
                    <div className="flex justify-center items-center gap-4 pt-4 border-t border-white/10">
                        <select value={lang} onChange={(e) => setLang(e.target.value)} className="bg-transparent text-white border border-white/20 rounded-md px-2 py-1">
                            <option value="ky" className="text-black">KG</option>
                            <option value="ru" className="text-black">RU</option>
                            <option value="en" className="text-black">EN</option>
                        </select>
                        <button onClick={() => handleNav("cart")} className="relative p-3 text-white transition-all hover:text-red-600 border border-white/10 rounded-full">
                            <ShoppingCart size={24} />
                            {totalItems > 0 && (
                                <span className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
