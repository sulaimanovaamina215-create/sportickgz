export type CatalogProduct = {
    id: number;
    category: string;
    title: string;
    photo: string;
    price: string;
    sizes?: string[];
    keywords?: string[];
};

type Lang = "ky" | "ru" | "en";
type ByLang<T> = Record<Lang, T>;

type Kind = "kit" | "halfzip" | "windbreaker" | "socks" | "bag" | "bib";
type ColorKey = "blue" | "black" | "red" | "cyan" | "yellow" | "lime" | "white" | "orange";
type Variant = "adultsKids" | "crop";

const LANGS: Lang[] = ["ky", "ru", "en"];

const BRAND_KEYWORDS = ["dem", "дем", "sportic", "спортик", "sportickgz"];

const colorNames: Record<ColorKey, ByLang<string>> = {
    blue: { ky: "көк", ru: "синий", en: "blue" },
    black: { ky: "кара", ru: "чёрный", en: "black" },
    red: { ky: "кызыл", ru: "красный", en: "red" },
    cyan: { ky: "асман көк", ru: "голубой", en: "light blue" },
    yellow: { ky: "сары", ru: "жёлтый", en: "yellow" },
    lime: { ky: "салат", ru: "салатовый", en: "lime" },
    white: { ky: "ак", ru: "белый", en: "white" },
    orange: { ky: "кызгылт сары", ru: "оранжевый", en: "orange" },
};

const variantLabels: Record<Variant, ByLang<string>> = {
    adultsKids: { ky: "чоңдор жана балдар", ru: "взрослые и детские", en: "adults and kids" },
    crop: { ky: "кесүү, жазуусу жок", ru: "обрезка без надписи", en: "crop, no text" },
};

const kinds: Record<
    Kind,
    {
        category: ByLang<string>;
        title: ByLang<string>;
        price: ByLang<string>;
        sizes?: ByLang<string[]>;
        keywords: string[];
    }
> = {
    kit: {
        category: { ky: "Формалар", ru: "Формы", en: "Uniforms" },
        title: { ky: "Футбол формасы", ru: "Футбольная форма", en: "Football kit" },
        price: { ky: "1000с", ru: "1000р", en: "35$" },
        sizes: {
            ky: ["S", "M", "L", "XL", "XXL"],
            ru: ["S", "M", "L", "XL", "XXL"],
            en: ["S", "M", "L", "XL", "XXL"],
        },
        keywords: ["футболка", "майка", "джерси", "комплект", "jersey", "soccer", "футбол", "football"],
    },
    halfzip: {
        category: { ky: "Жарым сыдырма", ru: "Полузамок", en: "Half-zip" },
        title: { ky: "Машыгуу кийими", ru: "Тренировочная форма", en: "Training top" },
        price: { ky: "3000с", ru: "3000р", en: "35$" },
        sizes: {
            ky: ["S", "M", "L", "XL", "XXL"],
            ru: ["S", "M", "L", "XL", "XXL"],
            en: ["S", "M", "L", "XL", "XXL"],
        },
        keywords: ["кофта", "свитшот", "реглан", "олимпийка", "тренировка", "машыгуу", "training", "sweatshirt"],
    },
    windbreaker: {
        category: { ky: "Шамал өткөрбөс күрмө", ru: "Ветровка", en: "Windbreaker" },
        title: { ky: "Ветровка", ru: "Дождевик", en: "Raincoat" },
        price: { ky: "3000с", ru: "3000р", en: "35$" },
        sizes: {
            ky: ["S", "M", "L", "XL", "XXL"],
            ru: ["S", "M", "L", "XL", "XXL"],
            en: ["S", "M", "L", "XL", "XXL"],
        },
        keywords: ["куртка", "плащ", "күрмө", "жаан", "дождь", "jacket", "rain", "непромокаемая"],
    },
    socks: {
        category: { ky: "DEM гетрилери", ru: "Гетры DEM", en: "DEM football socks" },
        title: { ky: "DEM гетри", ru: "Гетры DEM", en: "DEM socks" },
        price: { ky: "200с", ru: "200р", en: "3$" },
        sizes: { ky: ["Стандарт"], ru: ["Стандарт"], en: ["Standard"] },
        keywords: ["гетры", "гетри", "гетра", "гольфы", "носки", "socks", "стандарт", "standard"],
    },
    bag: {
        category: { ky: "Сумка", ru: "Сумка", en: "Bag" },
        title: { ky: "Спорт сумка", ru: "Спортивная сумка", en: "Sports bag" },
        price: { ky: "3500с", ru: "3500р", en: "40$" },
        keywords: ["сумка", "сумкасы", "баул", "bag", "duffel", "спортивная", "стандарт", "standard"],
    },
    bib: {
        category: { ky: "Аксессуарлар", ru: "Аксессуары", en: "Accessories" },
        title: { ky: "Манишка", ru: "Манишка", en: "Training bib" },
        price: { ky: "350с", ru: "350", en: "4$" },
        sizes: { ky: ["M", "XL", "3XL"], ru: ["M", "XL", "3XL"], en: ["M", "XL", "3XL"] },
        keywords: ["манишка", "манишки", "манишкалар", "накидка", "безрукавка", "жилетка", "bib", "pinnie", "vest"],
    },
};

type SourceItem = {
    id: number;
    kind: Kind;
    photo: string;
    colors: ColorKey[];
    variant?: Variant;
};

// Colours were sampled from each product photo; an empty list means the item is multi-coloured.
const sources: SourceItem[] = [
    { id: 1, kind: "kit", photo: "/dem/forma/forma1.png", colors: ["blue"] },
    { id: 2, kind: "kit", photo: "/dem/forma/forma2.png", colors: ["black"] },
    { id: 3, kind: "kit", photo: "/dem/forma/forma3.png", colors: ["red", "black"] },
    { id: 4, kind: "kit", photo: "/dem/forma/forma4.png", colors: ["red", "black"] },
    { id: 5, kind: "kit", photo: "/dem/forma/forma5.png", colors: ["black"] },
    { id: 6, kind: "kit", photo: "/dem/forma/forma6.png", colors: ["red", "black"] },
    { id: 7, kind: "kit", photo: "/dem/forma/forma7.png", colors: ["cyan", "black"] },
    { id: 8, kind: "kit", photo: "/dem/forma/forma8.png", colors: ["black", "yellow"] },
    { id: 9, kind: "kit", photo: "/dem/forma/forma9.png", colors: ["blue"] },
    { id: 10, kind: "kit", photo: "/dem/forma/forma10.png", colors: ["red"] },
    { id: 11, kind: "kit", photo: "/dem/forma/forma11.png", colors: ["blue"] },
    { id: 12, kind: "kit", photo: "/dem/forma/forma12.png", colors: ["black"] },
    { id: 13, kind: "kit", photo: "/dem/forma/img1.png", colors: ["lime"] },
    { id: 14, kind: "kit", photo: "/dem/forma/img3.png", colors: ["blue"] },
    { id: 15, kind: "kit", photo: "/dem/forma/img6.png", colors: [] },

    { id: 16, kind: "halfzip", photo: "/half/h1.png", colors: ["black", "red"] },
    { id: 17, kind: "halfzip", photo: "/half/h2.png", colors: ["red"] },
    { id: 18, kind: "halfzip", photo: "/half/h3.png", colors: ["black", "blue"] },
    { id: 19, kind: "halfzip", photo: "/half/h4.png", colors: ["blue", "black"] },
    { id: 20, kind: "halfzip", photo: "/half/h5.png", colors: ["red"] },

    { id: 21, kind: "windbreaker", photo: "/raincoat/r1.png", colors: ["black", "blue"] },
    { id: 22, kind: "windbreaker", photo: "/raincoat/r2.png", colors: ["black"] },
    { id: 23, kind: "windbreaker", photo: "/raincoat/r3.png", colors: ["black"] },
    { id: 24, kind: "windbreaker", photo: "/raincoat/r4.png", colors: ["blue", "black"] },
    { id: 25, kind: "windbreaker", photo: "/raincoat/r5.png", colors: ["black"] },

    { id: 26, kind: "socks", photo: "/dem/n1.png", colors: [], variant: "adultsKids" },
    { id: 27, kind: "socks", photo: "/dem/n2.png", colors: [], variant: "adultsKids" },
    { id: 28, kind: "socks", photo: "/dem/n3.png", colors: ["black", "red"], variant: "crop" },
    { id: 29, kind: "socks", photo: "/dem/n4.png", colors: [], variant: "crop" },

    { id: 30, kind: "bag", photo: "/catalog/bag/1.png", colors: ["blue", "orange"] },
    { id: 31, kind: "bag", photo: "/catalog/bag/2.png", colors: ["orange", "black"] },
    { id: 32, kind: "bag", photo: "/catalog/bag/3.png", colors: ["blue", "orange"] },
    { id: 33, kind: "bag", photo: "/catalog/bag/4.png", colors: ["blue"] },
    { id: 34, kind: "bag", photo: "/catalog/bag/5.png", colors: ["blue", "black"] },
    { id: 35, kind: "bag", photo: "/catalog/bag/6.png", colors: ["blue", "orange"] },
    { id: 36, kind: "bag", photo: "/catalog/bag/7.png", colors: ["black"] },
    { id: 37, kind: "bag", photo: "/catalog/bag/8.png", colors: ["black", "blue"] },
    { id: 38, kind: "bag", photo: "/catalog/bag/9.png", colors: ["black", "blue"] },
    { id: 39, kind: "bag", photo: "/catalog/bag/10.png", colors: ["black", "orange"] },

    { id: 44, kind: "bib", photo: "/dem/acsessuar/m1.png", colors: ["lime"] },
    { id: 45, kind: "bib", photo: "/dem/acsessuar/m2.png", colors: ["yellow"] },
    { id: 46, kind: "bib", photo: "/dem/acsessuar/m3.png", colors: ["red"] },
    { id: 47, kind: "bib", photo: "/dem/acsessuar/m4.png", colors: ["white"] },
    { id: 48, kind: "bib", photo: "/dem/acsessuar/m5.png", colors: ["blue"] },
];

function buildProduct(item: SourceItem, lang: Lang): CatalogProduct {
    const kind = kinds[item.kind];

    const details = [
        item.variant ? variantLabels[item.variant][lang] : "",
        item.colors.map((color) => colorNames[color][lang]).join("/"),
    ].filter(Boolean);

    // Every language gets the other languages' words as keywords, so a shopper typing
    // "форма" still finds the item while the site is in English.
    const keywords = [
        ...kind.keywords,
        ...BRAND_KEYWORDS,
        ...LANGS.flatMap((other) => [kind.title[other], kind.category[other]]),
        ...item.colors.flatMap((color) => LANGS.map((other) => colorNames[color][other])),
        ...(item.variant ? LANGS.map((other) => variantLabels[item.variant!][other]) : []),
        item.photo.split("/").pop()!.replace(/\.\w+$/, ""),
    ];

    return {
        id: item.id,
        category: kind.category[lang],
        title: details.length ? `${kind.title[lang]} (${details.join(", ")})` : kind.title[lang],
        photo: item.photo,
        price: kind.price[lang],
        ...(kind.sizes ? { sizes: kind.sizes[lang] } : {}),
        keywords: Array.from(new Set(keywords.map((word) => word.toLowerCase()))),
    };
}

export const catalogKY: Record<string, CatalogProduct[]> = Object.fromEntries(
    LANGS.map((lang) => [lang, sources.map((item) => buildProduct(item, lang))]),
);
