"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { formatPrice } from "@/lib/currency";
import type { BallLang, VolleyballBall } from "@/data/volleyballBalls";

const copy = {
    ky: {
        eyebrow: "Волейбол",
        title: "Волейбол топтору",
        lead: "MOLTEN жана MIKASA топтору. Бишкек, Чүй 186.",
        size: "Standard",
        add: "Себетке",
        added: "Себетте",
        back: "Бардык топтор",
        catalog: "Каталог",
    },
    ru: {
        eyebrow: "Волейбол",
        title: "Волейбольные мячи",
        lead: "Мячи MOLTEN и MIKASA. Бишкек, пр. Чуй 186.",
        size: "Standard",
        add: "В корзину",
        added: "В корзине",
        back: "Все мячи",
        catalog: "Каталог",
    },
    en: {
        eyebrow: "Volleyball",
        title: "Volleyballs",
        lead: "MOLTEN and MIKASA balls. Bishkek, Chui 186.",
        size: "Standard",
        add: "Add to cart",
        added: "In cart",
        back: "All balls",
        catalog: "Catalog",
    },
};

function useBallLang(): BallLang {
    const { lang } = useLanguage();
    return lang === "ky" || lang === "en" ? lang : "ru";
}

export function VolleyballList({ balls }: { balls: VolleyballBall[] }) {
    const lang = useBallLang();
    const t = copy[lang];

    return (
        <section className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">
            <p className="text-xs font-black uppercase tracking-widest text-cyan-300">{t.eyebrow}</p>
            <h1 className="mt-3 text-3xl font-black uppercase text-white md:text-5xl">{t.title}</h1>
            <p className="mt-3 max-w-2xl text-sm text-white/80 md:text-base">{t.lead}</p>
            <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {balls.map((ball) => (
                    <li key={ball.slug} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
                        <Link href={`/volleyball/${ball.slug}/`} className="block">
                            <div className="relative aspect-square bg-slate-100">
                                <Image src={ball.photo} alt={ball.title[lang]} fill className="object-contain p-4" sizes="(max-width: 768px) 100vw, 33vw" />
                            </div>
                            <div className="p-4">
                                <h2 className="min-h-12 text-sm font-semibold text-slate-900">{ball.title[lang]}</h2>
                                <p className="mt-2 text-xl font-black text-blue-700">{formatPrice(ball.price, lang, "")}</p>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export function VolleyballProduct({ ball }: { ball: VolleyballBall }) {
    const lang = useBallLang();
    const t = copy[lang];
    const { addToCart, cart } = useCart();
    const added = cart.some((item) => item.id === ball.id);
    const title = ball.title[lang];

    return (
        <article className="mx-auto w-full max-w-5xl px-4 py-12 md:px-6">
            <nav className="mb-6 flex flex-wrap gap-3 text-sm font-bold text-white/70">
                <Link href="/catalog/" className="hover:text-white">{t.catalog}</Link>
                <span>/</span>
                <Link href="/volleyball/" className="hover:text-white">{t.back}</Link>
            </nav>
            <div className="grid items-center gap-8 rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl md:grid-cols-2 md:p-8">
                <div className="relative aspect-square rounded-2xl bg-slate-100">
                    <Image src={ball.photo} alt={title} fill className="object-contain p-6" sizes="(max-width: 768px) 100vw, 50vw" priority />
                </div>
                <div>
                    <p className="text-xs font-black uppercase tracking-widest text-cyan-600">{ball.brand}</p>
                    <h1 className="mt-2 text-2xl font-black text-slate-900 md:text-4xl">{title}</h1>
                    <p className="mt-4 text-sm leading-relaxed text-slate-600">{ball.description[lang]}</p>
                    <p className="mt-4 inline-block rounded-lg bg-cyan-600 px-3 py-1 text-xs font-bold text-white">{t.size}</p>
                    <p className="mt-4 text-3xl font-black text-blue-700">{formatPrice(ball.price, lang, "")}</p>
                    <button
                        type="button"
                        disabled={added}
                        onClick={() =>
                            addToCart({
                                id: ball.id,
                                title,
                                price: ball.price,
                                photo: ball.photo,
                                sizes: ["Standard"],
                                selectedSize: "Standard",
                            })
                        }
                        className={`mt-6 w-full rounded-xl border py-3 text-sm font-bold text-white ${
                            added ? "cursor-default border-emerald-600 bg-emerald-600" : "border-slate-900 bg-slate-950 hover:opacity-90"
                        }`}
                    >
                        {added ? t.added : t.add}
                    </button>
                </div>
            </div>
        </article>
    );
}
