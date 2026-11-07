"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { catalogData } from "@/data/catalogData";
import { shoesData } from "@/data/shoesData";
import { fitnessData } from "@/data/fitnessData";
import { fudbolAccessories } from "@/data/fudbolAccessories";
import { extraCatalog } from "@/data/extraCatalog";
import { formatPrice } from "@/lib/currency";
import ProductZoomModal, { type ZoomAnchor } from "@/components/ProductZoomModal";
import ClubKitPromo from "@/components/ClubKitPromo";

const translations: any = {
    ky: {
        addToCart: "Себетке кошуу",
        inCart: "✓ Себетте",
        currency: "сом",
        catalogTitle: "Жеңиш даярдануудан башталат",
        catalogSubtitle: "",
        closeGallery: "Жабуу ✕",
        categoriesLabel: "Категориялар:",
        subCategoriesLabel: "Бөлүмдөр:",
        emptyCategory: "Бул бөлүмдө азырынча товарлар жок.",
        priceOnRequest: "Баасы суроо боюнча",

        catFootball: "Футбол",
        catVolleyball: "Волейбол",
        catCombat: "Бокс, ММА, Күрөш",
        catFitness: "Фитнес жана үй спорт жабдыктары",
        catMartialArts: "Тхэквондо жана дзюдо",
        catBackpack: "Рюкзактар",

        subForma: "Форма",
        subClubForma: "Балдардын клубдук формалары",
        subMiach: "Топтор",
        subObuv: "Бут кийимдер",
        subAccessories: "Аксессуарлар",
        subPerchatki: "Шлем жана мээлейлер",
        subGlovesHelmet: "Мээлей / Шлем",
        subRashguard: "Рашгарддар жана формалар",
        subBortsovki: "Күрөш бут кийими",
        subGanteri: "Gym гантель",
        subKovrik: "Көнүгүү төшөктөрү",
        subGum: "Бокс грушасы",
        subTkhondo: "Тхэквондо",
        subSparringPerchatki: "MMA",
        subDzudo: "Дзюдо",
        subNike: "Nike",
        subAdidas: "Adidas",
        subUnderArmour: "Under Armour",
        subMix: "Mix"
    },
    ru: {
        addToCart: "В корзину",
        inCart: "✓ В корзине",
        currency: "сом",
        catalogTitle: "ПОБЕДА НАЧИНАЕТСЯ С ПОДГОТОВКИ",
        catalogSubtitle: "",
        closeGallery: "Закрыть ✕",
        categoriesLabel: "Категории:",
        subCategoriesLabel: "Разделы:",
        emptyCategory: "В этом разделе пока нет товаров.",
        priceOnRequest: "Цена по запросу",

        catFootball: "Футбол",
        catVolleyball: "Волейбол",
        catCombat: "Бокс, ММА, Борьба",
        catFitness: "Фитнес, Домашний спорт",
        catMartialArts: "Тхэквондо, Дзюдо",
        catBackpack: "Рюкзаки",

        subForma: "Форма",
        subClubForma: "Детские клубные формы",
        subMiach: "Мяч",
        subObuv: "Обувь",
        subAccessories: "Аксессуары",
        subPerchatki: " шлем,перчатки",
        subGlovesHelmet: "Перчатки / Шлем",
        subRashguard: "Рашгарды, формы",
        subBortsovki: "Борьба   ",
        subGanteri: "Gym Гантель",
        subKovrik: "Коврик",
        subGum: "Боксерская Груша",
        subTkhondo: "Тхэквондо",
        subSparringPerchatki: "MMA",
        subDzudo: "Дзюдо",
        subNike: "Nike",
        subAdidas: "Adidas",
        subUnderArmour: "Under Armour",
        subMix: "Mix"
    },
    en: {
        addToCart: "Add to cart",
        inCart: "✓ In cart",
        currency: "$",
        catalogTitle: "VICTORY BEGINS WITH PREPARATION",
        catalogSubtitle: "",
        closeGallery: "Close ✕",
        categoriesLabel: "Categories:",
        subCategoriesLabel: "Sections:",
        emptyCategory: "No products in this section yet.",
        priceOnRequest: "Price on request",

        catFootball: "Football",
        catVolleyball: "Volleyball",
        catCombat: "Boxing, MMA, Wrestling",
        catFitness: "Fitness, Home Sport",
        catMartialArts: "Taekwondo, Judo",
        catBackpack: "Backpacks",

        subForma: "Kit",
        subClubForma: "Kids' Club Kits",
        subMiach: "Ball",
        subObuv: "Footwear",
        subAccessories: "Accessories",
        subPerchatki: "Helmet & gloves",
        subGlovesHelmet: "Gloves / Helmet",
        subRashguard: "Rashguards and kits",
        subBortsovki: "Wrestling shoes",
        subGanteri: "Gym Dumbbells",
        subKovrik: "Exercise mat",
        subGum: "Punching Bags",
        subTkhondo: "Taekwondo",
        subSparringPerchatki: "MMA",
        subDzudo: "Judo",
        subNike: "Nike",
        subAdidas: "Adidas",
        subUnderArmour: "Under Armour",
        subMix: "Mix"
    }
};

const formatCatalogPrice = (price: unknown, t: { priceOnRequest: string }, lang: string) =>
    formatPrice(price, lang, t.priceOnRequest);

const WholesalePage = () => {
    const { lang } = useLanguage();
    const { addToCart, cart } = useCart();

    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const sport = params.get("sport");
        const sub = params.get("sub");
        if (sport) setActiveCategory(sport);
        if (sub) setActiveSubCategory(sub);
    }, []);

    const currentLang = (lang && translations[lang]) ? lang : "ky";
    const t = translations[currentLang];

    const categories = [
        { name: "Футбол", label: t.catFootball },
        { name: "Волейбол", label: t.catVolleyball },
        { name: "Бокс, ММА, Борьба", label: t.catCombat },
        { name: "Фитнес, Домашний спорт", label: t.catFitness },
        { name: "Тхэквондо, Дзюдо", label: t.catMartialArts },
        { name: "Рюкзаки", label: t.catBackpack }
    ];

    const subCategoriesMap: { [key: string]: { key: string, label: string }[] } = {
        "Футбол": [
            { key: "Форма", label: t.subForma },
            { key: "Клубные формы", label: t.subClubForma },
            { key: "Мяч", label: t.subMiach },
            { key: "Обувь", label: t.subObuv },
            { key: "Аксессуары", label: t.subAccessories }
        ],
        "Волейбол": [
            { key: "Форма", label: t.subForma },
            { key: "Мяч", label: t.subMiach },
            { key: "Обувь", label: t.subObuv },
            { key: "Аксессуары", label: t.subAccessories }
        ],
        "Бокс, ММА, Борьба": [
            { key: "ММА Перчатки", label: t.subPerchatki },
            { key: "Рашгарды, формы", label: t.subRashguard },
            { key: "Борьба", label: t.subBortsovki },
            { key: "Аксессуары", label: t.subAccessories }
        ],
        "Фитнес, Домашний спорт": [
            { key: "Гантели", label: t.subGanteri },
            { key: "Коврик", label: t.subKovrik },
            { key: "GYM", label: t.subGum },
            { key: "Аксессуары", label: t.subAccessories }
        ],
        "Тхэквондо, Дзюдо": [
            { key: "Тхэквондо", label: t.subTkhondo },
            { key: "Дзюдо", label: t.subDzudo },
            { key: "Аксессуары", label: t.subAccessories }
        ],
        "Рюкзаки": [
            { key: "Nike", label: t.subNike },
            { key: "Adidas", label: t.subAdidas },
            { key: "Under Armour", label: t.subUnderArmour },
            { key: "Mix", label: t.subMix }
        ]
    };

    // Маалыматтарды алуу жана тилге жараша тандоо
    const baseProducts: any = (catalogData as Record<string, any>)[currentLang] || (catalogData as Record<string, any>)["ky"] || [];
    const currentShoesData: any = (shoesData as Record<string, any>)[currentLang] || (shoesData as Record<string, any>)["ky"] || [];
    const currentFitnessData: any = (fitnessData as Record<string, any>)[currentLang] || (fitnessData as Record<string, any>)["ky"] || [];

    // Футбол аксессуарларын алуу (fudbolAccessories.ts файлынын ичинде ky, ru, en структурасы бар болсо)
    const currentAccessoriesData: any = (fudbolAccessories as Record<string, any>)[currentLang] || (fudbolAccessories as Record<string, any>)["ky"] || [];

    const currentExtraData: any = (extraCatalog as Record<string, any>)[currentLang] || extraCatalog.ky || [];

    const formattedShoes: any = currentShoesData.map((shoe: any): any => ({
        ...shoe,
        category: "Футбол",
        subCategory: "Обувь",
        photoSides: true,
        openModal: true,
        hoverPhoto: shoe.photo,
    }));

    // Футбол аксессуарларына керектүү категорияларды кошуп формациялоо
    const formattedAccessories: any = currentAccessoriesData.map((item: any): any => ({
        ...item,
        category: "Футбол",
        subCategory: "Аксессуары",
        photoSides: true,
        openModal: true,
        hoverPhoto: item.photo,
    }));

    const attachGalleryHover = (items: any[]) => {
        const groups = new Map<string, number[]>();
        items.forEach((p, i) => {
            const key = `${p.category}::${p.subCategory}`;
            const list = groups.get(key) || [];
            list.push(i);
            groups.set(key, list);
        });
        return items.map((p, i) => {
            if (p.hoverPhoto && p.hoverPhoto !== p.photo) return p;
            const skipPair =
                ((p.category === "Футбол" || p.category === "Волейбол") &&
                    (p.subCategory === "Форма" || p.subCategory === "Клубные формы" || p.subCategory === "Мяч")) ||
                (p.category === "Футбол" && (p.subCategory === "Обувь" || p.subCategory === "Аксессуары")) ||
                (p.category === "Волейбол" && (p.subCategory === "Обувь" || p.subCategory === "Аксессуары")) ||
                (p.category === "Бокс, ММА, Борьба" && p.subCategory === "ММА Перчатки") ||
                (p.category === "Бокс, ММА, Борьба" && p.subCategory === "Рашгарды, формы") ||
                (p.category === "Бокс, ММА, Борьба" && p.subCategory === "Борьба") ||
                (p.category === "Бокс, ММА, Борьба" && p.subCategory === "Аксессуары") ||
                (p.category === "Тхэквондо, Дзюдо" && p.subCategory === "Аксессуары") ||
                (p.category === "Фитнес, Домашний спорт" && p.subCategory === "Гантели") ||
                (p.category === "Фитнес, Домашний спорт" && p.subCategory === "Коврик") ||
                (p.category === "Фитнес, Домашний спорт" && p.subCategory === "GYM") ||
                (p.category === "Фитнес, Домашний спорт" && p.subCategory === "Аксессуары") ||
                (p.category === "Рюкзаки" && p.subCategory === "Mix") ||
                p.photoSides;
            if (skipPair) return p;
            const idxs = groups.get(`${p.category}::${p.subCategory}`) || [];
            if (idxs.length < 2) return p;
            const pos = idxs.indexOf(i);
            const next = items[idxs[(pos + 1) % idxs.length]];
            if (!next?.photo || next.photo === p.photo) return p;
            return { ...p, hoverPhoto: next.photo };
        });
    };

    const products = attachGalleryHover([...baseProducts, ...formattedShoes, ...currentFitnessData, ...formattedAccessories, ...currentExtraData]);

    const handleCategoryClick = (cat: string) => {
        if (activeCategory === cat) {
            setActiveCategory(null);
            setActiveSubCategory(null);
        } else {
            setActiveCategory(cat);
            setActiveSubCategory(null);
        }
    };

    return (
        <section className="relative min-h-screen py-12 px-4 overflow-hidden bg-slate-900">
            {/* ФОН */}
            <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-50 scale-100 filter brightness-110 contrast-125"
                >
                    <source src="/Wholesale/medium.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-950/80 via-blue-900/40 to-blue-950/80"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-blue-950/60 to-slate-950/90"></div>
            </div>

            <div className="relative z-10 max-w-[1400px] mx-auto pb-16">
                {/* БАШ ЖАЗУУ */}
                <div className="text-center mb-10">
                    <span className="bg-cyan-500/20 border border-cyan-400 text-cyan-300 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-[0_0_15px_rgba(6,182,212,0.4)] animate-pulse">
                        ⚡ SPORT COLLECTION 2026
                    </span>
                    <h1 className="text-3xl md:text-5xl font-black text-white mt-4 mb-2 tracking-wide uppercase drop-shadow-[0_2px_10px_rgba(6,182,212,0.5)]">
                        {t.catalogTitle}
                    </h1>
                    <p className="text-white text-sm md:text-base font-medium tracking-wide">{t.catalogSubtitle}</p>
                </div>

                {/* НЕГИЗГИ КАТЕГОРИЯ КНОПКАЛАРЫ */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8 max-w-5xl mx-auto">
                    {categories.map((item, index: number) => {
                        const isActive = activeCategory === item.name;

                        return (
                            <button
                                key={index}
                                onClick={() => handleCategoryClick(item.name)}
                                className={`group flex flex-col rounded-xl overflow-hidden border transition-all duration-300 transform hover:scale-105 shadow-md ${
                                    isActive
                                        ? "border-cyan-400 ring-1 ring-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.6)]"
                                        : "border-cyan-500/30 hover:border-cyan-400"
                                }`}
                            >
                                <span className={`w-full min-h-[44px] flex items-center justify-center px-2 py-1.5 text-[11px] md:text-xs font-bold leading-tight text-center tracking-wide ${
                                    isActive ? "bg-cyan-500/40 text-white" : "bg-slate-950/90 text-white"
                                }`}>
                                    {item.label}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* ИЧКИ БӨЛҮМДӨРДҮН КАРТОЧКАЛАРЫ */}
                {activeCategory && !activeSubCategory && subCategoriesMap[activeCategory] && (
                    <div className="mb-12 animate-fadeIn">
                        <h2 className="text-xl md:text-2xl font-black text-white mb-6 uppercase flex items-center gap-3">
                            <span className="w-3 h-7 bg-cyan-400 rounded-full inline-block shadow-[0_0_10px_rgba(6,182,212,0.8)]"></span>
                            <span className="text-white">{activeCategory}</span> — <span className="text-cyan-300">{t.subCategoriesLabel}</span>
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full">
                            {subCategoriesMap[activeCategory].map((subCat, idx: number) => (
                                <div
                                    key={idx}
                                    onClick={() => setActiveSubCategory(subCat.key)}
                                    className="group cursor-pointer bg-slate-900/80 backdrop-blur-md border border-white rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] hover:border-cyan-400 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[140px]"
                                >
                                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                                        {subCat.label}
                                    </h3>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ГАЛЕРЕЯ БӨЛҮМҮ */}
                {activeSubCategory && (
                    <div className="w-full bg-white backdrop-blur-xl rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl border border-slate-300 transition-all animate-fadeIn text-slate-900">
                        <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-4">
                            <h3 className="text-2xl max-sm:text-base font-black text-slate-900 flex items-center gap-2 sm:gap-3">
                                <span className="w-2.5 sm:w-3 h-6 sm:h-8 bg-cyan-500 rounded-full inline-block shadow-[0_0_10px_rgba(6,182,212,0.8)]"></span>
                                <span>Галерея: <span className="text-blue-600">{activeSubCategory === "Гантели" ? "GYM / Гантели" : activeSubCategory === "ММА Перчатки" ? `${activeCategory} / Перчатки/ Шлем` : activeSubCategory === "Перчатки / Шлем" || activeSubCategory === "Дзюдо" ? "Бокс, ММА / Перчатки / Шлем" : `${activeCategory} / ${activeSubCategory}`}</span></span>
                            </h3>
                            <button
                                onClick={() => setActiveSubCategory(null)}
                                className="bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-700 border border-white px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-xl font-bold text-xs sm:text-sm transition shadow-md shrink-0"
                            >
                                {t.closeGallery}
                            </button>
                        </div>

                        {activeSubCategory === "Клубные формы" && (
                            <ClubKitPromo lang={currentLang as "ky" | "ru" | "en"} />
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full">
                            {products.filter((p: any) => p.category === activeCategory && p.subCategory === activeSubCategory).length > 0 ? (
                                products
                                    .filter((p: any) => p.category === activeCategory && p.subCategory === activeSubCategory)
                                    .map((item: any) => {
                                        const isItemInCart = cart.some((c: any) => c.id === item.id);
                                        return (
                                            <WholesaleCard
                                                key={item.id}
                                                item={item}
                                                onAdd={addToCart}
                                                isAdded={isItemInCart}
                                                t={t}
                                                lang={currentLang}
                                            />
                                        );
                                    })
                            ) : (
                                <div className="col-span-full py-12 text-center text-slate-500 font-semibold text-lg">
                                    {t.emptyCategory}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

const WholesaleCard = ({ item, onAdd, isAdded, t, lang }: any) => {
    const gallery: string[] =
        Array.isArray(item.gallery) && item.gallery.length > 1 ? item.gallery : [];
    const hasGallery = gallery.length > 1;
    const hasHover = !hasGallery && item.hoverPhoto && item.hoverPhoto !== item.photo;
    const showSides = Boolean(item.photoSides) && !hasHover && !hasGallery;
    const showFullPhoto =
        item.category === "Бокс, ММА, Борьба" &&
        item.subCategory === "ММА Перчатки" &&
        !hasHover &&
        !hasGallery;
    const photoRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [zoomAnchor, setZoomAnchor] = useState<ZoomAnchor | null>(null);
    const [galleryIndex, setGalleryIndex] = useState(0);
    const [selectedSize, setSelectedSize] = useState(item.sizes && item.sizes.length > 0 ? item.sizes[0] : null);

    const activePrice =
        selectedSize && item.priceBySize && item.priceBySize[selectedSize]
            ? item.priceBySize[selectedSize]
            : item.price;

    const cardSrc = isHovered && hasHover ? item.hoverPhoto : item.photo;
    const zoomSrc = hasGallery ? gallery[galleryIndex] : hasHover ? cardSrc : item.photo;
    const imageClass = `${item.photoFit === "contain" ? "object-contain p-2" : "object-cover"} transition-all duration-300`;
    const sidePos = (hovered: boolean) =>
        hovered ? "object-[82%_48%] scale-[1.12]" : "object-[18%_48%] scale-[1.08]";

    const openModal = () => {
        const rect = photoRef.current?.getBoundingClientRect();
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
        setGalleryIndex(0);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setGalleryIndex(0);
        setZoomAnchor(null);
    };

    const stepGallery = (dir: 1 | -1) => {
        if (!hasGallery) return;
        setGalleryIndex((i) => (i + dir + gallery.length) % gallery.length);
    };

    return (
        <>
        <div
            className="group flex flex-col justify-between border border-white p-3 pb-4 rounded-2xl transition-all hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)] bg-white hover:-translate-y-1 duration-300 w-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div>
                {showFullPhoto ? (
                <div
                    ref={photoRef}
                    className="relative mb-3 w-full cursor-zoom-in overflow-hidden rounded-xl border border-slate-200 bg-white"
                    style={{ height: 220 }}
                    onClick={openModal}
                >
                    <Image
                        src={item.photo}
                        fill
                        alt={item.title || "Product"}
                        className="object-contain p-1"
                        sizes="(max-width: 768px) 100vw, 33vw"
                    />
                </div>
                ) : (
                <div
                    ref={photoRef}
                    className="relative mb-3 aspect-[3/4] w-full cursor-zoom-in overflow-hidden rounded-xl border border-slate-200 bg-slate-100"
                    onClick={openModal}
                >
                    {showSides ? (
                    <Image
                        src={item.photo}
                        fill
                        alt={item.title || "Product"}
                        className={`object-cover transition-all duration-500 ease-out ${sidePos(isHovered)}`}
                        sizes="(max-width: 768px) 100vw, 20vw"
                    />
                    ) : hasHover ? (
                    <Image
                        src={cardSrc}
                        fill
                        alt={item.title || "Product"}
                        className={imageClass}
                        sizes="(max-width: 768px) 100vw, 20vw"
                    />
                    ) : (
                    <Image
                        src={item.photo}
                        fill
                        alt={item.title || "Product"}
                        className={`${imageClass} object-center`}
                        sizes="(max-width: 768px) 100vw, 20vw"
                    />
                    )}
                </div>
                )}

                <h4 className="text-sm font-semibold text-slate-900 line-clamp-2 min-h-[40px] mb-2">{item.title}</h4>

                {/* РАЗМЕРЛЕРДИ ЧЫГАРУУ ЖЕРИ */}
                {item.sizes && item.sizes.length > 0 && (
                    <div className="mb-2">
                        <div className="flex flex-wrap gap-1">
                            {item.sizes.map((size: string, idx: number) => (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => setSelectedSize(size)}
                                    className={`px-2 py-0.5 text-xs font-bold rounded border transition-all ${
                                        selectedSize === size
                                            ? "bg-cyan-600 text-white border-cyan-600 shadow"
                                            : "bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200"
                                    }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <span className="text-xl font-black text-blue-700 block mb-3 tracking-tight">{formatCatalogPrice(activePrice, t, lang)}</span>
            </div>

            <button
                onClick={() => onAdd({ ...item, price: activePrice, selectedSize })}
                disabled={isAdded}
                style={{ backgroundColor: isAdded ? '#059669' : '#030712', color: '#ffffff' }}
                className={`w-full py-2.5 rounded-xl text-sm font-bold border transition-all ${
                    isAdded
                        ? "border-emerald-600 cursor-default"
                        : "border-slate-900 hover:opacity-90 hover:scale-[1.03] active:scale-[0.98] shadow-lg"
                }`}
            >
                {isAdded ? t.inCart : t.addToCart}
            </button>
        </div>

        <ProductZoomModal
            open={modalOpen}
            src={zoomSrc}
            alt={item.title || "Product"}
            anchor={zoomAnchor}
            onClose={closeModal}
            gallery={hasGallery ? gallery : undefined}
            galleryIndex={galleryIndex}
            onGalleryStep={hasGallery ? stepGallery : undefined}
        />
        </>
    );
};

export default WholesalePage;
