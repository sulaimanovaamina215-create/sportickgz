export type BallLang = "ky" | "ru" | "en";

export type VolleyballBall = {
    id: number;
    slug: string;
    price: string;
    photo: string;
    brand: string;
    title: Record<BallLang, string>;
    description: Record<BallLang, string>;
};

const shop = {
    ky: "SPORTIC KGZ, Бишкек, Чүй 186. Оптом жана чекене.",
    ru: "SPORTIC KGZ, Бишкек, пр. Чуй 186. Оптом и в розницу.",
    en: "SPORTIC KGZ, Bishkek, Chui 186. Wholesale and retail.",
};

export const volleyballBalls: VolleyballBall[] = [
    {
        id: 191,
        slug: "molten-green-red-white",
        price: "1500",
        photo: "/catalog/voleibol.basketbol/top/1.png",
        brand: "Molten",
        title: {
            ky: "Волейбол тобу MOLTEN (жашыл, кызыл, ак)",
            ru: "Волейбольный мяч MOLTEN (зелёный, красный, белый)",
            en: "Molten volleyball (green, red, white)",
        },
        description: {
            ky: `Волейбол тобу MOLTEN, жашыл, кызыл жана ак. Standard өлчөм. Баасы 1500 сом. ${shop.ky}`,
            ru: `Волейбольный мяч MOLTEN, зелёный, красный и белый. Размер Standard. Цена 1500 сом. ${shop.ru}`,
            en: `Molten volleyball in green, red and white. Standard size. 1500 KGS. ${shop.en}`,
        },
    },
    {
        id: 192,
        slug: "v200w-yellow-blue",
        price: "1500",
        photo: "/catalog/voleibol.basketbol/top/2.png",
        brand: "Mikasa",
        title: {
            ky: "Волейбол тобу V200W (сары, көк)",
            ru: "Волейбольный мяч V200W (жёлтый, синий)",
            en: "V200W volleyball (yellow, blue)",
        },
        description: {
            ky: `Волейбол тобу V200W, сары жана көк. Standard өлчөм. Баасы 1500 сом. ${shop.ky}`,
            ru: `Волейбольный мяч V200W, жёлтый и синий. Размер Standard. Цена 1500 сом. ${shop.ru}`,
            en: `V200W volleyball in yellow and blue. Standard size. 1500 KGS. ${shop.en}`,
        },
    },
    {
        id: 193,
        slug: "mikasa-v300w",
        price: "6500",
        photo: "/catalog/voleibol.basketbol/top/3.png",
        brand: "Mikasa",
        title: {
            ky: "Волейбол тобу MIKASA V300W",
            ru: "Волейбольный мяч MIKASA V300W",
            en: "Mikasa V300W volleyball",
        },
        description: {
            ky: `Волейбол тобу MIKASA V300W. Standard өлчөм. Баасы 6500 сом. ${shop.ky}`,
            ru: `Волейбольный мяч MIKASA V300W. Размер Standard. Цена 6500 сом. ${shop.ru}`,
            en: `Mikasa V300W volleyball. Standard size. 6500 KGS. ${shop.en}`,
        },
    },
    {
        id: 8601,
        slug: "mikasa-official",
        price: "2500",
        photo: "/catalog/voleibol.basketbol/top/photo_5426881214078983078_y.jpg",
        brand: "Mikasa",
        title: {
            ky: "Волейбол тобу MIKASA Official",
            ru: "Волейбольный мяч MIKASA Official",
            en: "Mikasa Official volleyball",
        },
        description: {
            ky: `Волейбол тобу MIKASA Official. Standard өлчөм. Баасы 2500 сом. ${shop.ky}`,
            ru: `Волейбольный мяч MIKASA Official. Размер Standard. Цена 2500 сом. ${shop.ru}`,
            en: `Mikasa Official volleyball. Standard size. 2500 KGS. ${shop.en}`,
        },
    },
    {
        id: 8602,
        slug: "molten-fiv3",
        price: "6000",
        photo: "/catalog/voleibol.basketbol/top/photo_5426881214078983081_y.jpg",
        brand: "Molten",
        title: {
            ky: "Волейбол тобу MOLTEN FIV3",
            ru: "Волейбольный мяч MOLTEN FIV3",
            en: "Molten FIV3 volleyball",
        },
        description: {
            ky: `Волейбол тобу MOLTEN FIV3. Standard өлчөм. Баасы 6000 сом. ${shop.ky}`,
            ru: `Волейбольный мяч MOLTEN FIV3. Размер Standard. Цена 6000 сом. ${shop.ru}`,
            en: `Molten FIV3 volleyball. Standard size. 6000 KGS. ${shop.en}`,
        },
    },
    {
        id: 8600,
        slug: "mikasa-v200w-original",
        price: "9500",
        photo: "/catalog/voleibol.basketbol/top/photo_5426881214078983076_y.jpg",
        brand: "Mikasa",
        title: {
            ky: "Волейбол тобу MIKASA оригинал V200W",
            ru: "Волейбольный мяч MIKASA оригинал V200W",
            en: "Mikasa original V200W volleyball",
        },
        description: {
            ky: `Оригиналдуу волейбол тобу MIKASA V200W. Standard өлчөм. Баасы 9500 сом. ${shop.ky}`,
            ru: `Оригинальный волейбольный мяч MIKASA V200W. Размер Standard. Цена 9500 сом. ${shop.ru}`,
            en: `Original Mikasa V200W volleyball. Standard size. 9500 KGS. ${shop.en}`,
        },
    },
];

export function ballBySlug(slug: string) {
    return volleyballBalls.find((ball) => ball.slug === slug);
}

export function volleyballHref(id: number) {
    const ball = volleyballBalls.find((item) => item.id === id);
    return ball ? `/volleyball/${ball.slug}/` : null;
}
