"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Images, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

type ReviewItem = {
    name: string;
    text: string;
    banner: string;
    chatPhoto?: string;
};

const translations = {
    ky: {
        title: "Кардарлардын пикирлери",
        viewReview: "Отзывду көрүү",
        data: [
            { name: "ТОВАРДЫН САПАТЫ", text: "Команда үчүн балдарга форма алдык. Сапаты жакшы, өлчөмдөрү туура келди. Баасына карата такыр нормалдуу.", banner: "/reviews/quality-banner.png", chatPhoto: "/reviews/quality-chat.png" },
            { name: "БАА ЖАНА ТАНДОО", text: "Тандоо чын эле чоң. Арзан да, кымбатыраак да варианттар бар. Мен топторду жана форма алдым, баасы күткөндөн арзан болду.", banner: "/reviews/price-banner.png", chatPhoto: "/reviews/price-chat.png" },
            { name: "ЖЕТКИРҮҮ ЖАНА СЕРВИС", text: "Оштон заказ кылдым. Тез жооп беришти, сүрөт жиберишти, анан жөнөтүштү. Бир-эки күндөн кийин алдым, баары нормалдуу келди.", banner: "/reviews/delivery-banner-v2.png", chatPhoto: "/reviews/delivery-chat.png" },
            { name: "ДҮҢ САТЫП АЛУУ", text: "Мен алардан товарды сатууга алам. Көп алсаң баасы жакшы. Плюс көп товар бар, көпкө күтүүнүн кереги жок.", banner: "/reviews/wholesale-banner.png", chatPhoto: "/reviews/wholesale-chat.png" }
        ]
    },
    ru: {
        title: "Отзывы клиентов",
        viewReview: "Смотреть отзыв",
        data: [
            { name: "КАЧЕСТВО ТОВАРА", text: "Брали форму детям на команду. Качество хорошее, размеры подошли. За свою цену вообще нормально.", banner: "/reviews/quality-banner.png", chatPhoto: "/reviews/quality-chat.png" },
            { name: "ЦЕНА И ВЫБОР", text: "Выбор реально большой. Есть и дешевые варианты и подороже. Я взял мячи и форму, по цене получилось дешевле чем ожидал.", banner: "/reviews/price-banner.png", chatPhoto: "/reviews/price-chat.png" },
            { name: "ДОСТАВКА И СЕРВИС", text: "Заказывал в Ош. Ответили быстро, скинули фото, потом отправили. Через пару дней забрал, всё нормально пришло.", banner: "/reviews/delivery-banner-v2.png", chatPhoto: "/reviews/delivery-chat.png" },
            { name: "ОПТОВАЯ ЗАКУПКА", text: "Я беру у них товар на продажу. Если брать количеством цена хорошая. Плюс удобно что много товара есть в наличии, не надо долго ждать.", banner: "/reviews/wholesale-banner.png", chatPhoto: "/reviews/wholesale-chat.png" }
        ]
    },
    en: {
        title: "Customer Testimonials",
        viewReview: "View review",
        data: [
            { name: "PRODUCT QUALITY", text: "We bought uniforms for a kids team. Good quality, the sizes fit. For the price it's totally fine.", banner: "/reviews/quality-banner.png", chatPhoto: "/reviews/quality-chat.png" },
            { name: "PRICE AND SELECTION", text: "The selection is really big. There are cheap options and more expensive ones. I got balls and uniforms, and it came out cheaper than I expected.", banner: "/reviews/price-banner.png", chatPhoto: "/reviews/price-chat.png" },
            { name: "DELIVERY AND SERVICE", text: "I ordered to Osh. They replied quickly, sent photos, then shipped. I picked it up in a couple of days, everything arrived fine.", banner: "/reviews/delivery-banner-v2.png", chatPhoto: "/reviews/delivery-chat.png" },
            { name: "WHOLESALE PURCHASE", text: "I buy from them to resell. The price is good if you take quantity. Plus it's convenient that a lot of stock is available, no long wait.", banner: "/reviews/wholesale-banner.png", chatPhoto: "/reviews/wholesale-chat.png" }
        ]
    }
};

const TestimonialsSection = () => {
    const { lang } = useLanguage();
    const t = translations[lang as keyof typeof translations];
    const [preview, setPreview] = useState<ReviewItem | null>(null);

    return (
        <section className="relative py-24 overflow-hidden bg-slate-900">
            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-30">
                <source src="/medium.mp4" type="video/mp4" />
            </video>

            <div className="relative z-10 max-w-full m-auto px-5">
                <h2 className="text-5xl md:text-6xl font-black text-center text-white mb-20 tracking-tighter">
                    {t.title}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {t.data.map((item, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ rotate: 1, scale: 1.03 }}
                            className="p-4 rounded-[2.5rem]  backdrop-blur-md border border-white/20 text-white flex flex-col h-full"
                        >
                            <div className="mb-3 w-full overflow-hidden rounded-2xl bg-[#0a192f] shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
                                <img
                                    src={item.banner}
                                    alt={item.name}
                                    className="h-auto w-full object-contain"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => setPreview(item)}
                                className={`mb-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0a192f] py-3 text-sm font-bold text-white shadow-[0_8px_22px_rgba(10,25,47,0.4)] ring-2 ring-white transition hover:scale-[1.02] ${item.chatPhoto ? "hover:bg-blue-500 hover:shadow-[0_0_24px_rgba(59,130,246,0.85)]" : "hover:bg-red-600"}`}
                            >
                                <Images size={18} />
                                {t.viewReview}
                            </button>

                            <h3 className="mb-3 text-lg font-black tracking-tight">{item.name}</h3>
                            <p className="text-base font-medium flex-grow mb-6 leading-relaxed opacity-90">{item.text}</p>

                            <div className="flex items-center justify-end border-t border-white/10 pt-6">
                                <div className="flex gap-0.5 text-yellow-400 text-sm">★★★★★</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {preview && (
                <div
                    className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 p-4"
                    onClick={() => setPreview(null)}
                >
                    <div
                        className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={() => setPreview(null)}
                            className="absolute top-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#0a192f] text-white shadow-lg ring-2 ring-red-600 transition hover:bg-red-600"
                        >
                            <X size={18} />
                        </button>
                        {preview.chatPhoto && (
                            <img
                                src={preview.chatPhoto}
                                alt={preview.name}
                                className="h-auto w-full object-contain"
                            />
                        )}
                        <div className="p-6">
                            <h3 className="mb-2 text-center text-xl font-black tracking-tight text-[#0a192f]">
                                {preview.name}
                            </h3>
                            <div className="mb-4 flex justify-center gap-0.5 text-yellow-400 text-lg">★★★★★</div>
                            <p className="text-center text-base leading-relaxed text-slate-700">
                                {preview.text}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default TestimonialsSection;
