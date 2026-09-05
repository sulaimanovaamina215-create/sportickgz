"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, ShieldCheck, Zap } from "lucide-react";
import { formatSomAmount } from "@/lib/currency";

interface CartItem {
    id: number | string;
    title: string;
    price: number;
    quantity: number;
    photo: string;
    selectedSize?: string;
    sizes?: string[];
    optionType?: "color" | "size";
}

export default function Cart() {
    const { cart, updateQuantity, removeFromCart, updateItemSize, sendOrder } = useCart() as {
        cart: CartItem[];
        updateQuantity: (id: string | number, qty: number) => void;
        removeFromCart: (id: string | number) => void;
        updateItemSize?: (id: string | number, newSize: string) => void;
        sendOrder: (name: string, phone: string) => boolean;
    };

    const { lang } = useLanguage() as { lang: 'kg' | 'ru' | 'en' };
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [whatsappSent, setWhatsappSent] = useState(false);

    const totalSum = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const availableSizes = ["S", "M", "L", "XL", "XXL", "Стандарт", "One Size"];

    // Тилдер үчүн котормолор сөздүгү
    const t = {
        kg: {
            cartTitle: "КОРЗИНА",
            items: "ТОВАР",
            size: "Размер:",
            color: "Түс:",
            totalSummary: "Заказдын жалпы маалыматы",
            itemCount: "Товарлар саны:",
            pcs: "даана",
            delivery: "Жеткирүү:",
            deliveryType: "Ыкчам / Стандарт",
            total: "ИТОГО:",
            namePlaceholder: "Атыңыз",
            phonePlaceholder: "Телефон номериңиз",
            confirmBtn: "ЗАКАЗДЫ ТАСТЫКТОО",
            currency: "сом"
        },
        ru: {
            cartTitle: "КОРЗИНА",
            items: "ТОВАРОВ",
            size: "Размер:",
            color: "Цвет:",
            totalSummary: "Итоговая информация",
            itemCount: "Количество товаров:",
            pcs: "шт.",
            delivery: "Доставка:",
            deliveryType: "Быстрая / Стандартная",
            total: "ИТОГО:",
            namePlaceholder: "Ваше имя",
            phonePlaceholder: "Номер телефона",
            confirmBtn: "ПОДТВЕРДИТЬ ЗАКАЗ",
            currency: "сом"
        },
        en: {
            cartTitle: "CART",
            items: "ITEMS",
            size: "Size:",
            color: "Color:",
            totalSummary: "Order Summary",
            itemCount: "Total items:",
            pcs: "pcs",
            delivery: "Delivery:",
            deliveryType: "Express / Standard",
            total: "TOTAL:",
            namePlaceholder: "Your Name",
            phonePlaceholder: "Phone Number",
            confirmBtn: "CONFIRM ORDER",
            currency: "$"
        }
    };

    const currentLang = t[lang] || t.ru;

    const handleOrder = () => {
        const sent = sendOrder(name, phone);
        if (!sent) return;
        setWhatsappSent(true);
    };

    return (
        <div className="relative min-h-screen bg-[#05050A] text-white py-12 px-4 sm:px-6 overflow-hidden font-sans">

            {/* ТРЕК (Спорттук стадион же гоночный катар сыяктуу динамикалык фон элементтери) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
                <div className="absolute -top-[40%] -left-[20%] w-[70vw] h-[70vw] rounded-full bg-blue-600/30 blur-[120px] animate-pulse"></div>
                <div className="absolute top-[30%] -right-[20%] w-[70vw] h-[70vw] rounded-full bg-red-600/20 blur-[150px] animate-pulse"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
            </div>

            {/* ЭКРАНГА ТОЛУК БАТКАН SPORTICKGZ АРТКЫ ЖАЗУУ (АК, КӨК, КЫЗЫЛ ГРАДИЕНТ) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 px-4">
                <span className="text-[12vw] sm:text-[13vw] font-black tracking-tighter uppercase italic drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-center bg-gradient-to-r from-white via-blue-500 to-red-600 bg-clip-text text-transparent opacity-15 transform -rotate-6">
                    SPORTICKGZ
                </span>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">

                {/* Товарлардын тизмеси */}
                <div className="lg:col-span-8 space-y-4">
                    <div className="flex items-center justify-between pb-4 border-b border-white/10">
                        <h1 className="text-2xl sm:text-3xl font-black italic tracking-wider flex items-center gap-3">
                            <Zap className="text-red-500 animate-bounce" size={28} />
                            <span>{currentLang.cartTitle}</span>
                        </h1>
                        <span className="text-xs font-bold tracking-widest px-3 py-1 bg-white/10 rounded-full border border-white/20 text-blue-400">
                            {cart.length} {currentLang.items}
                        </span>
                    </div>

                    <AnimatePresence>
                        {cart.map((item: CartItem, index: number) => (
                            <motion.div
                                key={`${item.id}-${item.selectedSize || index}`}
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="group relative bg-[#12131C]/80 backdrop-blur-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-5 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden"
                            >
                                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-500 via-white to-red-600"></div>

                                <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-xl overflow-hidden bg-black/40 border border-white/10">
                                    <Image src={item.photo} alt={item.title || "Product"} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>

                                <div className="flex-grow text-center sm:text-left">
                                    <h2 className="font-extrabold text-base sm:text-lg tracking-wide uppercase italic text-white/90">{item.title}</h2>

                                    <div className="flex items-center justify-center sm:justify-start gap-2 mt-3">
                                        <span className="text-xs uppercase font-bold text-zinc-400 tracking-wider">
                                            {item.optionType === "color" ? currentLang.color : currentLang.size}
                                        </span>
                                        <select
                                            value={item.selectedSize || ""}
                                            onChange={(e) => {
                                                if (updateItemSize) {
                                                    updateItemSize(item.id, e.target.value);
                                                }
                                            }}
                                            className="text-xs border border-white/20 rounded-lg px-3 py-1.5 bg-black/60 font-black text-blue-400 outline-none cursor-pointer hover:border-red-500 transition-colors shadow-inner"
                                        >
                                            {(item.sizes && item.sizes.length > 0 ? item.sizes : availableSizes).map((size) => (
                                                <option key={size} value={size} className="bg-zinc-900 text-white">
                                                    {size}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 bg-black/40 p-1.5 rounded-xl border border-white/10">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-blue-600 rounded-lg font-black transition-colors"
                                    >
                                        <Minus size={14} />
                                    </button>
                                    <span className="w-6 text-center font-black text-sm text-blue-400">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-blue-600 rounded-lg font-black transition-colors"
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>

                                <div className="text-right min-w-[100px]">
                                    <span className="font-black text-lg sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-red-500 italic">
                                        {formatSomAmount(item.price * item.quantity, lang)}
                                    </span>
                                </div>

                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="absolute top-3 right-3 sm:relative sm:top-auto sm:right-auto text-zinc-500 hover:text-red-500 p-2 transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Итого панели */}
                <motion.div
                    className="lg:col-span-4 lg:sticky lg:top-6 bg-[#12131C]/90 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-white to-red-600"></div>

                    <h3 className="text-xl font-black italic uppercase tracking-wider mb-6 flex items-center gap-2 text-white">
                        <span>{currentLang.totalSummary}</span>
                    </h3>

                    <div className="space-y-3 mb-6 text-sm text-zinc-400 font-medium">
                        <div className="flex justify-between">
                            <span>{currentLang.itemCount}</span>
                            <span className="font-bold text-white">{cart.length} {currentLang.pcs}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>{currentLang.delivery}</span>
                            <span className="font-bold text-blue-400 uppercase italic">{currentLang.deliveryType}</span>
                        </div>
                        <div className="border-t border-white/10 pt-3 flex justify-between items-center text-lg">
                            <span className="font-black text-white italic">{currentLang.total}</span>
                            <span className="font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-red-500 italic">
                                {formatSomAmount(totalSum, lang)}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-3 mb-6">
                        <input
                            className="w-full p-4 bg-black/60 border border-white/15 rounded-xl outline-none text-sm font-bold text-white placeholder-zinc-500 focus:border-blue-500 transition-colors shadow-inner"
                            placeholder={currentLang.namePlaceholder}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            className="w-full p-4 bg-black/60 border border-white/15 rounded-xl outline-none text-sm font-bold text-white placeholder-zinc-500 focus:border-red-500 transition-colors shadow-inner"
                            placeholder={currentLang.phonePlaceholder}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    <button
                        title="WhatsApp аркылуу баарлашуу"
                        onClick={handleOrder}
                        className="w-full py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-red-600 text-white font-black uppercase italic tracking-wider rounded-xl hover:opacity-90 active:scale-[0.98] transition-all text-sm shadow-[0_10px_30px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2"
                    >
                        <ShieldCheck size={18} />
                        <span>{whatsappSent ? "Отправлено через WhatsApp" : "Отправить через WhatsApp"}</span>
                    </button>
                </motion.div>

            </div>
        </div>
    );
}