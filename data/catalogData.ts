const FORMA_FRONT_BACK = new Set([
    2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
]);

// Формалар жана катардагы товарлар үчүн функция
const generateSimpleItems = (categoryName: string, subCat: string, folderName: string, startId: number, count: number = 40, price: string = "800", sizes: string[] = ["S", "M", "L", "XL", "2XL"], ext: string = "png", displayTitle?: string) => {
    if (folderName === "fudbol/forma/klubforma") {
        const pairCount = Math.floor(count / 2);
        const items = Array.from({ length: pairCount }, (_, index) => {
            const first = index * 2 + 1;
            const second = first + 1;
            const frontNum = index === 0 ? second : first;
            const backNum = index === 0 ? first : second;
            return {
                id: startId + index,
                title: displayTitle || `${subCat}`,
                price,
                sizes,
                photo: `/catalog/${folderName}/${frontNum}.${ext}`,
                hoverPhoto: `/catalog/${folderName}/${backNum}.${ext}`,
                category: categoryName,
                subCategory: subCat,
                photoFit: "contain" as const,
            };
        });
        if (count % 2 === 1) {
            items.push({
                id: startId + pairCount,
                title: displayTitle || `${subCat}`,
                price,
                sizes,
                photo: `/catalog/${folderName}/${count}.${ext}`,
                hoverPhoto: `/catalog/${folderName}/${count}.${ext}`,
                category: categoryName,
                subCategory: subCat,
                photoFit: "contain" as const,
            });
        }
        return items;
    }

    return Array.from({ length: count }, (_, index) => {
        const id = startId + index;
        const imgNum = index + 1;
        const photoPath = `/catalog/${folderName}/${imgNum}.${ext}`;
        const isKitSheet = folderName === "fudbol/forma" && FORMA_FRONT_BACK.has(imgNum);

        return {
            id,
            title: displayTitle || `${subCat}`,
            price: price,
            sizes: sizes,
            photo: isKitSheet ? `/catalog/fudbol/forma/hover/${imgNum}-front.jpg` : photoPath,
            hoverPhoto: isKitSheet ? `/catalog/fudbol/forma/hover/${imgNum}-back.jpg` : photoPath,
            category: categoryName,
            subCategory: subCat,
            ...(folderName === "fudbol/forma" ? { photoFit: "contain" as const } : {}),
        };
    });
};

// Топтор үчүн функция
const generateBalls = (categoryName: string, subCat: string, folderName: string, startId: number, items: { img: string, price: string, title?: string, ext?: string, sizes?: string[] }[]) => {
    return items.map((item, index) => {
        const id = startId + index;
        const ext = item.ext || "png";
        const photoPath = `/catalog/${folderName}/${item.img}.${ext}`;

        const isVolleyballBall = categoryName === "Волейбол";
        return {
            id: id,
            title: item.title || subCat,
            price: item.price,
            sizes: item.sizes || ["Standard"],
            photo: photoPath,
            hoverPhoto: photoPath,
            category: categoryName,
            subCategory: subCat,
            photoFit: isVolleyballBall ? undefined : ("contain" as const),
            ...(isVolleyballBall ? { photoSides: true, openModal: true } : {}),
        };
    });
};

// Рюкзактар үчүн функция
const generateRugs = (categoryName: string, subCat: string, folderName: string, startId: number, items: { img: string, price: string, ext?: string }[]) => {
    return items.map((item, index) => {
        const id = startId + index;
        const ext = item.ext || "png";
        const photoPath = `/catalog/rugzak/${folderName}/${item.img}.${ext}`;

        return {
            id: id,
            title: subCat,
            price: item.price,
            sizes: ["Standard"],
            photo: photoPath,
            hoverPhoto: photoPath,
            category: categoryName,
            subCategory: subCat
        };
    }).map((product, index, arr) => {
        const samePrice = arr.filter((p) => p.price === product.price);
        if (samePrice.length < 2) return product;
        const pos = samePrice.findIndex((p) => p.id === product.id);
        const partner = samePrice[(pos + 1) % samePrice.length];
        return { ...product, hoverPhoto: partner.photo };
    });
};

type CatalogLang = "ky" | "ru" | "en";

const boxingGloveTitles: Record<CatalogLang, string>[] = [
    { ky: "Бокс мээлейлери IBA Budva 2024 (DIBA)", ru: "Боксёрские перчатки IBA Budva 2024 (DIBA)", en: "IBA Budva 2024 boxing gloves (DIBA)" },
    { ky: "Бокс мээлейлери GREEN HILL IBA", ru: "Боксёрские перчатки GREEN HILL IBA", en: "GREEN HILL IBA boxing gloves" },
    { ky: "Бокс мээлейлери ABP Asian Boxing", ru: "Боксёрские перчатки ABP Asian Boxing", en: "ABP Asian Boxing gloves" },
    { ky: "Бокс мээлейлери RDX IBA (кызыл)", ru: "Боксёрские перчатки RDX IBA (красные)", en: "RDX IBA boxing gloves (red)" },
    { ky: "Бокс мээлейлери RDX IBA (кара)", ru: "Боксёрские перчатки RDX IBA (чёрные)", en: "RDX IBA boxing gloves (black)" },
    { ky: "Бокс мээлейлери RDX IBA (көк)", ru: "Боксёрские перчатки RDX IBA (синие)", en: "RDX IBA boxing gloves (blue)" },
    { ky: "Бокс мээлейлери RDX AURA+", ru: "Боксёрские перчатки RDX AURA+", en: "RDX AURA+ boxing gloves" },
    { ky: "Бокс мээлейлери RDX AURA+ (боз)", ru: "Боксёрские перчатки RDX AURA+ (серые)", en: "RDX AURA+ boxing gloves (grey)" },
    { ky: "Бокс мээлейлери RDX AURA 12 oz", ru: "Боксёрские перчатки RDX AURA 12 oz", en: "RDX AURA boxing gloves 12 oz" },
    { ky: "Бокс мээлейлери RDX AURA+ 10 oz", ru: "Боксёрские перчатки RDX AURA+ 10 oz", en: "RDX AURA+ boxing gloves 10 oz" },
    { ky: "ММА мээлейлери RDX IMMAF (кызыл)", ru: "Перчатки ММА RDX IMMAF (красные)", en: "RDX IMMAF MMA gloves (red)" },
    { ky: "Бокс мээлейлери RDX AURA+ (көк)", ru: "Боксёрские перчатки RDX AURA+ (синие)", en: "RDX AURA+ boxing gloves (blue)" },
    { ky: "ММА мээлейлери RDX IMMAF (көк)", ru: "Перчатки ММА RDX IMMAF (синие)", en: "RDX IMMAF MMA gloves (blue)" },
    { ky: "ММА мээлейлери RDX IMMAF (сары)", ru: "Перчатки ММА RDX IMMAF (жёлтые)", en: "RDX IMMAF MMA gloves (yellow)" },
];

const generateBoxingGloves = (lang: CatalogLang) =>
    boxingGloveTitles.map((titles, index) => {
        const photoPath = `/catalog/mma/perchatci.shlem/${index + 1}.png`;
        const enTitle = titles.en;
        const isRdx = enTitle.includes("RDX");
        const isMma = /MMA|IMMAF/i.test(enTitle);
        const isImmaf = /IMMAF/i.test(enTitle);
        return {
            id: 122 + index,
            title: titles[lang],
            price: isImmaf ? "1300" : "2000",
            sizes: isRdx && !isMma ? ["10 oz", "12 oz"] : ["S", "M", "L", "XL", "2XL"],
            photo: photoPath,
            hoverPhoto: photoPath,
            category: "Бокс, ММА, Борьба",
            subCategory: "ММА Перчатки",
            openModal: true,
            photoFit: "contain" as const,
        };
    });

export const catalogData: any = {
    ky: [
        // 1. ФУТБОЛ - Форма (1 - 40)
        ...generateSimpleItems("Футбол", "Форма", "fudbol/forma", 1, 40, "1200", ["S", "M", "L", "XL", "2XL"], "png", "Футбол формасы"),
        // 2. ФУТБОЛ - Клубные формы (41 - 81)
        ...generateSimpleItems("Футбол", "Клубные формы", "fudbol/forma/klubforma", 41, 41, "500", ["18", "20", "22", "24", "26", "28", "30p"], "jpg", "Клубдук формалар"),
        // 4. ВОЛЕЙБОЛ - Форма (82 - 121); биринчи сүрөт өзүнчө — футбол формаларына тийбейт
        ...generateSimpleItems("Волейбол", "Форма", "fudbol/forma", 82, 40, "800", ["S", "M", "L", "XL", "2XL"], "png", "Волейбол формасы").map(
            (item, index) =>
                index === 0
                    ? { ...item, photo: "/dem/forma/forma1.png", hoverPhoto: "/dem/forma/forma1.png" }
                    : item
        ),

        // 5. БОКС, ММА, БОРЬБА - ММА Перчатки (122 - 135)
        ...generateBoxingGloves("ky"),

        // БОКС, ММА, БОРЬБА - Борьба трек (136 - 154)
        ...[
            { img: "1", title: "RUDIS күрөш бут кийими", price: "3500", sizes: ["36", "37", "38", "39", "40", "41", "42", "43"]},
            { img: "2", title: "RUDIS күрөш бут кийими", price: "3500", sizes: ["36", "37", "38", "39", "40", "41", "42", "43"] },
            { img: "3", title: "RUDIS күрөш бут кийими", price: "3500", sizes: ["36", "37", "38", "39", "40", "41", "42", "43"] },
            { img: "4", title: "ASICS TIGER", price: "2500", sizes: ["33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43"] },
            { img: "5", title: "GREEN HILL", price: "1000", sizes: ["30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44"] },
            { img: "6", title: "RUDIS күрөш бут кийими", price: "3500", sizes: ["36", "37", "38", "39", "40"] },
            { img: "7", title: "RUDIS күрөш бут кийими", price: "2500", sizes: ["36", "37", "38", "39", "40", "41"] },
            { img: "8", title: "GREEN HILL күрөш бут кийими", price: "1000", sizes: ["30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44"] },
            { img: "9", title: "GREEN HILL күрөш бут кийими", price: "1000", sizes: ["30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44"] },
            { img: "10", title: "NIKE күрөш бут кийими", price: "3500", sizes: ["36", "37", "38", "39", "40", "41", "42", "43"] },
            { img: "11", title: "ASICS күрөш бут кийими", price: "1800", sizes: ["35", "36", "37", "38", "39", "40", "41", "42", "43"] },
            { img: "12", title: "RUDIS күрөш бут кийими", price: "3500", sizes: ["36", "37", "38", "39", "40", "41", "42", "43"] },
            { img: "13", title: "ASICS MATBLAZER күрөш бут кийими", price: "4500", sizes: ["36", "37", "38", "39", "40", "41", "42", "43"] },
            { img: "14", title: "ASICS күрөш бут кийими", price: "3500", sizes: ["36", "37", "38", "39", "40", "41", "42", "43"] },
            { img: "16", title: "ASICS TIGER күрөш бут кийими", price: "1500", sizes: ["33", "34", "35","36", "37", "38", "39", "40", "41", "42", "43"] },
            { img: "17", title: "RUDIS күрөш бут кийими", price: "3500", sizes: ["36", "37", "38", "39", "40"] },
            { img: "18", title: "NIKE күрөш бут кийими", price: "3500", sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44"] },
            { img: "19", title: "ASICS MATBLAZER күрөш бут кийими", price: "4500", sizes: ["36", "37", "38", "39", "40", "41", "42", "43"] }
        ].map((item, index) => {
            const id = 136 + index;
            const photoPath = `/catalog/mma/trek/${item.img}.jpg`;
            return {
                id: id,
                title: item.title,
                price: item.price,
                sizes: item.sizes,
                photo: photoPath,
                hoverPhoto: photoPath,
                category: "Бокс, ММА, Борьба",
                subCategory: "Борьба"
            };
        }),

        // 6. РЮКЗАКТАР
        ...generateRugs("Рюкзаки", "Adidas", "adidas", 155, [
            { img: "1", price: "1500", ext: "png" },
            { img: "2", price: "1500", ext: "png" },
        ]),
        ...generateRugs("Рюкзаки", "Nike", "nike", 157, [
            { img: "13", price: "2500" }, { img: "14", price: "2500" }, { img: "15", price: "2500" },
            { img: "16", price: "2500" }, { img: "17", price: "2500" }, { img: "18", price: "2500" },
            { img: "19", price: "2500" }, { img: "24", price: "2500" }, { img: "25", price: "2500" },
        ]),
        ...generateRugs("Рюкзаки", "Under Armour", "underArmour", 166, [
            { img: "1", price: "3000" }, { img: "2", price: "3000" }, { img: "3", price: "3000" },
            { img: "4", price: "3000" }, { img: "11", price: "2500" }, { img: "12", price: "2500" },
            { img: "20", price: "2000" }, { img: "21", price: "2000" }, { img: "22", price: "2000" },
            { img: "23", price: "2000" }, { img: "30", price: "2000" },
        ]),

        // 3. ФУТБОЛ - Топтор
        ...generateBalls("Футбол", "Мяч", "fudbol/top", 177, [
            { img: "1", title: "Футбол тобу KELME AFC 5-өлчөм", price: "8500" },
            { img: "m1", title: "Футбол тобу ЕВРО 2020", price: "1000", sizes: ["5"] },
            { img: "m2", title: "Футбол тобу EURO 2024", price: "1000", sizes: ["5"] },
            { img: "m3", title: "Футбол тобу ЧМ 2022", price: "1000", sizes: ["5"] },
            { img: "m4", title: "Футбол тобу Nike АПЛ 2023-2024", price: "1000", sizes: ["5"] },
            { img: "m5", title: "Футбол тобу Лига чемпионов Стамбул", price: "1000", sizes: ["5"] },
            { img: "m6", title: "Футбол тобу Лига чемпионов 2019", price: "1000", sizes: ["5"] },
            { img: "m7", title: "Футбол тобу Лига чемпионов", price: "1000", sizes: ["5"] },
            { img: "m8", title: "Футбол тобу ЧМ-2010 Жабулани", price: "1000", sizes: ["5"] },
            { img: "m9", title: "Футбол тобу ЧМ-2010 Жабулани", price: "1000", sizes: ["5"] },
            { img: "m10", title: "Матч футбол тобу", price: "1000" },
            { img: "m11", title: "Матч футбол тобу", price: "2000" },
            { img: "m12", title: "Матч футбол тобу", price: "2000" },
            { img: "m13", title: "Матч футбол тобу", price: "2000" },
            { img: "m14", title: "Molten 4-өлчөм (секирик аз)", price: "1500" },
            { img: "m15", title: "Molten 5-өлчөм", price: "3500" },
            { img: "m16", title: "Molten Vantaggio", price: "2500" },
            { img: "m17", title: "Molten 4-өлчөм", price: "6500" },
            { img: "m18", title: "5-өлчөмдөгү секирик топтор", price: "1000" },
            { img: "m19", title: "Матч футбол тобу", price: "500" },
            { img: "m20", title: "Футбол тобу KELME AFC 5-өлчөм", price: "8500" },
            { img: "m21", title: "Матч футбол тобу", price: "1000" },
            { img: "m22", title: "Матч футбол тобу", price: "1000" },
            { img: "m23", title: "Матч футбол тобу", price: "1000" },
            { img: "m24", title: "Матч футбол тобу", price: "2000" },
            { img: "m25", title: "Матч футбол тобу", price: "350" },
        ]),

        // ВОЛЕЙБОЛ ЖАНА БАСКЕТБОЛ ТОПТОРУ
        ...generateBalls("Волейбол", "Мяч", "voleibol.basketbol/top", 191, [
            { img: "1", title: "Волейбол тобу MOLTEN (жашыл, кызыл, ак)", price: "1500" },
            { img: "2", title: "Волейбол тобу V200W (сары, көк)", price: "1500" },
            { img: "3", title: "Волейбол тобу MIKASA V300W", price: "6500" },
            { img: "4", title: "Баскет тобу MOLTEN FIBA BG3800", price: "5000" },
            { img: "5", title: "Баскет тобу WILSON", price: "1500" },
            { img: "6", title: "Баскет тобу BG3180", price: "3000" },
            { img: "7", title: "Баскет тобу WILSON 3X3", price: "5000" },
            { img: "8", title: "Баскет тобу MOLTEN GD7X", price: "3500" },
            { img: "9", title: "Баскет тобу MOLTEN GD6X", price: "3500" },
        ]),


    ],

    ru: [
        ...generateSimpleItems("Футбол", "Форма", "fudbol/forma", 1, 40, "1200", ["S", "M", "L", "XL", "2XL"], "png", "Футбольная форма"),
        ...generateSimpleItems("Футбол", "Клубные формы", "fudbol/forma/klubforma", 41, 41, "500", ["18", "20", "22", "24", "26", "28", "30p"], "jpg", "Клубная форма"),
        ...generateSimpleItems("Волейбол", "Форма", "fudbol/forma", 82, 40, "800", ["S", "M", "L", "XL", "2XL"], "png", "Волейбольная форма").map(
            (item, index) =>
                index === 0
                    ? { ...item, photo: "/dem/forma/forma1.png", hoverPhoto: "/dem/forma/forma1.png" }
                    : item
        ),
        ...generateBoxingGloves("ru"),
        ...[
            { img: "1", title: "Борцовки RUDIS ", price: "3500", sizes: ["36", "37", "38", "39", "40", "41", "42", "43"]},
            { img: "2", title: "Борцовки RUDIS", price: "3500", sizes: ["36", "37", "38", "39", "40", "41", "42", "43"] },
            { img: "3", title: "Борцовки RUDIS", price: "3500", sizes: ["36", "37", "38", "39", "40", "41", "42", "43"] },
            { img: "4", title: "ASICS TIGER ", price: "2500", sizes: ["33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43"] },
            { img: "5", title: "GREEN HILL ", price: "1000", sizes: ["30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44"] },
            { img: "6", title: "Борцовки RUDIS", price: "3500", sizes: ["36", "37", "38", "39", "40"] },
            { img: "7", title: "Борцовки RUDIS", price: "2500", sizes: ["36", "37", "38", "39", "40", "41"] },
            { img: "8", title: "Борцовки GREEN HILL", price: "1000", sizes: ["30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44"] },
            { img: "9", title: "Борцовки GREEN HILL", price: "1000", sizes: ["30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44"] },
            { img: "10", title: "Борцовки NIKE", price: "3500", sizes: ["36", "37", "38", "39", "40", "41", "42", "43"] },
            { img: "11", title: "Борцовки ASICS ", price: "1800", sizes: ["35", "36", "37", "38", "39", "40", "41", "42", "43"] },
            { img: "12", title: "Борцовки RUDIS ", price: "3500", sizes: ["36", "37", "38", "39", "40", "41", "42", "43"] },
            { img: "13", title: "Борцовки ASICS MATBLAZER", price: "4500", sizes: ["36", "37", "38", "39", "40", "41", "42", "43"] },
            { img: "14", title: "Борцовки ASICS", price: "3500", sizes: ["36", "37", "38", "39", "40", "41", "42", "43"] },
            { img: "16", title: "Борцовки ASICS TIGER", price: "1500", sizes: ["33", "34", "35","36", "37", "38", "39", "40", "41", "42", "43"] },
            { img: "17", title: "Борцовки RUDIS ", price: "3500", sizes: ["36", "37", "38", "39", "40"] },
            { img: "18", title: "Борцовки NIKE", price: "3500", sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44"] },
            { img: "19", title: "Борцовки ASICS MATBLAZER", price: "4500", sizes: ["36", "37", "38", "39", "40", "41", "42", "43"] }
        ].map((item, index) => ({
            id: 136 + index,
            title: item.title,
            price: item.price,
            sizes: item.sizes,
            photo: `/catalog/mma/trek/${item.img}.jpg`,
            hoverPhoto: `/catalog/mma/trek/${item.img}.jpg`,
            category: "Бокс, ММА, Борьба",
            subCategory: "Борьба"
        })),
        ...generateRugs("Рюкзаки", "Adidas", "adidas", 155, [
            { img: "1", price: "1500", ext: "png" },
            { img: "2", price: "1500", ext: "png" },
        ]),
        ...generateRugs("Рюкзаки", "Nike", "nike", 157, [
            { img: "13", price: "2500" }, { img: "14", price: "2500" }, { img: "15", price: "2500" },
            { img: "16", price: "2500" }, { img: "17", price: "2500" }, { img: "18", price: "2500" },
            { img: "19", price: "2500" }, { img: "24", price: "2500" }, { img: "25", price: "2500" },
        ]),
        ...generateRugs("Рюкзаки", "Under Armour", "underArmour", 166, [
            { img: "1", price: "3000" }, { img: "2", price: "3000" }, { img: "3", price: "3000" },
            { img: "4", price: "3000" }, { img: "11", price: "2500" }, { img: "12", price: "2500" },
            { img: "20", price: "2000" }, { img: "21", price: "2000" }, { img: "22", price: "2000" },
            { img: "23", price: "2000" }, { img: "30", price: "2000" },
        ]),
        ...generateBalls("Футбол", "Мяч", "fudbol/top", 177, [
            { img: "1", title: "Футбольный мяч KELME AFC 5-размер", price: "8500" },
            { img: "m1", title: "Футбол мяч ЕВРО 2020", price: "1000", sizes: ["5"] },
            { img: "m2", title: "Футбол мяч EURO 2024", price: "1000", sizes: ["5"] },
            { img: "m3", title: "Футбол мяч ЧМ 2022", price: "1000", sizes: ["5"] },
            { img: "m4", title: "Футбол мяч Найк АПЛ 2023-2024", price: "1000", sizes: ["5"] },
            { img: "m5", title: "Футбол мяч Лига чемпионов Стамбул", price: "1000", sizes: ["5"] },
            { img: "m6", title: "Футбол мяч Лига чемпионов 2019", price: "1000", sizes: ["5"] },
            { img: "m7", title: "Футбол мяч Лига чемпионов", price: "1000", sizes: ["5"] },
            { img: "m8", title: "Футбол мяч ЧМ-2010 Жабулани", price: "1000", sizes: ["5"] },
            { img: "m9", title: "Футбол мяч ЧМ-2010 Жабулани", price: "1000", sizes: ["5"] },
            { img: "m10", title: "Футбольный мяч (Матч)", price: "1000" },
            { img: "m11", title: "Футбольный мяч (Матч)", price: "2000" },
            { img: "m12", title: "Футбольный мяч (Матч)", price: "2000" },
            { img: "m13", title: "Футбольный мяч (Матч)", price: "2000" },
            { img: "m14", title: "Молтен 4 размер (3200) не прыгучий ", price: "1500" },
            { img: "m15", title: "Молтен 5 размер (3200)", price: "3500" },
            { img: "m16", title: "Молтен Vantaggio", price: "2500" },
            { img: "m17", title: "Молтен 4размер (4800)", price: "6500" },
            { img: "m18", title: "Мячи 5-го размера прыгучие ", price: "1000" },
            { img: "m19", title: "Футбольный мяч (Матч)", price: "500" },
            { img: "m20", title: "Футбольный мяч KELME AFC 5-размер", price: "8500" },
            { img: "m21", title: "Футбольный мяч (Матч)", price: "1000" },
            { img: "m22", title: "Футбольный мяч (Матч)", price: "1000" },
            { img: "m23", title: "Футбольный мяч (Матч)", price: "1000" },
            { img: "m24", title: "Футбольный мяч (Матч)", price: "2000" },
            { img: "m25", title: "Футбольный мяч (Матч)", price: "350" },
        ]),
        ...generateBalls("Волейбол", "Мяч", "voleibol.basketbol/top", 191, [
            { img: "1", title: "Волейбольный мяч MOLTEN (зелёный, красный, белый)", price: "1500" },
            { img: "2", title: "Волейбольный мяч V200W (жёлтый, синий)", price: "1500" },
            { img: "3", title: "Волейбольный мяч MIKASA V300W", price: "6500" },
            { img: "4", title: "Баскетбольный мяч MOLTEN FIBA BG3800", price: "5000" },
            { img: "5", title: "Баскетбольный мяч WILSON", price: "1500" },
            { img: "6", title: "Баскетбольный мяч BG3180", price: "3000" },
            { img: "7", title: "Баскетбольный мяч WILSON 3X3", price: "5000" },
            { img: "8", title: "Баскетбольный мяч MOLTEN GD7X", price: "3500" },
            { img: "9", title: "Баскетбольный мяч MOLTEN GD6X", price: "3500" },
        ]),
        // Фитнес аксессуарлар (Бардык сүрөттөр менен)
    ],

    en: [
        ...generateSimpleItems("Футбол", "Форма", "fudbol/forma", 1, 40, "1200", ["S", "M", "L", "XL", "2XL"], "png", "Football Kit"),
        ...generateSimpleItems("Футбол", "Клубные формы", "fudbol/forma/klubforma", 41, 41, "500", ["18", "20", "22", "24", "26", "28", "30p"], "jpg", "Club Kit"),
        ...generateSimpleItems("Волейбол", "Форма", "fudbol/forma", 82, 40, "800", ["S", "M", "L", "XL", "2XL"], "png", "Volleyball Kit").map(
            (item, index) =>
                index === 0
                    ? { ...item, photo: "/dem/forma/forma1.png", hoverPhoto: "/dem/forma/forma1.png" }
                    : item
        ),
        ...generateBoxingGloves("en"),
        ...[
            { img: "1", title: "Wrestling shoes RUDIS", price: "3500", sizes: ["36", "37", "38", "39", "40", "41", "42", "43"] },
            { img: "2", title: "Wrestling shoes RUDIS", price: "3500", sizes: ["36", "37", "38", "39", "40", "41", "42", "43"] },
            { img: "3", title: "Wrestling shoes RUDIS", price: "3500", sizes: ["36", "37", "38", "39", "40", "41", "42", "43"] },
            { img: "4", title: "ASICS TIGER", price: "2500", sizes: ["33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43"] },
            { img: "5", title: "GREEN HILL", price: "1000", sizes: ["30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44"] },
            { img: "6", title: "Wrestling shoes RUDIS", price: "3500", sizes: ["36", "37", "38", "39", "40"] },
            { img: "7", title: "Wrestling shoes RUDIS", price: "2500", sizes: ["36", "37", "38", "39", "40", "41"] },
            { img: "8", title: "Wrestling shoes GREEN HILL", price: "1000", sizes: ["30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44"] },
            { img: "9", title: "Wrestling shoes GREEN HILL", price: "1000", sizes: ["30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44"] },
            { img: "10", title: "Wrestling shoes NIKE", price: "3500", sizes: ["36", "37", "38", "39", "40", "41", "42", "43"] },
            { img: "11", title: "Wrestling shoes ASICS", price: "1800", sizes: ["35", "36", "37", "38", "39", "40", "41", "42", "43"] },
            { img: "12", title: "Wrestling shoes RUDIS", price: "3500", sizes: ["36", "37", "38", "39", "40", "41", "42", "43"] },
            { img: "13", title: "Wrestling shoes ASICS MATBLAZER", price: "4500", sizes: ["36", "37", "38", "39", "40", "41", "42", "43"] },
            { img: "14", title: "Wrestling shoes ASICS", price: "3500", sizes: ["36", "37", "38", "39", "40", "41", "42", "43"] },
            { img: "16", title: "Wrestling shoes ASICS TIGER", price: "1500", sizes: ["33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43"] },
            { img: "17", title: "Wrestling shoes RUDIS", price: "3500", sizes: ["36", "37", "38", "39", "40"] },
            { img: "18", title: "Wrestling shoes NIKE", price: "3500", sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44"] },
            { img: "19", title: "Wrestling shoes ASICS MATBLAZER", price: "4500", sizes: ["36", "37", "38", "39", "40", "41", "42", "43"] }
        ].map((item, index) => ({
            id: 136 + index,
            title: item.title,
            price: item.price,
            sizes: item.sizes,
            photo: `/catalog/mma/trek/${item.img}.jpg`,
            hoverPhoto: `/catalog/mma/trek/${item.img}.jpg`,
            category: "Бокс, ММА, Борьба",
            subCategory: "Борьба"
        })),
        ...generateRugs("Рюкзаки", "Adidas", "adidas", 155, [
            { img: "1", price: "1500", ext: "png" },
            { img: "2", price: "1500", ext: "png" },
        ]),
        ...generateRugs("Рюкзаки", "Nike", "nike", 157, [
            { img: "13", price: "2500" }, { img: "14", price: "2500" }, { img: "15", price: "2500" },
            { img: "16", price: "2500" }, { img: "17", price: "2500" }, { img: "18", price: "2500" },
            { img: "19", price: "2500" }, { img: "24", price: "2500" }, { img: "25", price: "2500" },
        ]),
        ...generateRugs("Рюкзаки", "Under Armour", "underArmour", 166, [
            { img: "1", price: "3000" }, { img: "2", price: "3000" }, { img: "3", price: "3000" },
            { img: "4", price: "3000" }, { img: "11", price: "2500" }, { img: "12", price: "2500" },
            { img: "20", price: "2000" }, { img: "21", price: "2000" }, { img: "22", price: "2000" },
            { img: "23", price: "2000" }, { img: "30", price: "2000" },
        ]),
        ...generateBalls("Футбол", "Мяч", "fudbol/top", 177, [
            { img: "1", title: "KELME AFC football, size 5", price: "8500" },
            { img: "m1", title: "Football EURO 2020", price: "1000", sizes: ["5"] },
            { img: "m2", title: "Football EURO 2024", price: "1000", sizes: ["5"] },
            { img: "m3", title: "Football World Cup 2022", price: "1000", sizes: ["5"] },
            { img: "m4", title: "Nike Premier League 2023-2024 football", price: "1000", sizes: ["5"] },
            { img: "m5", title: "Champions League Istanbul football", price: "1000", sizes: ["5"] },
            { img: "m6", title: "Champions League 2019 football", price: "1000", sizes: ["5"] },
            { img: "m7", title: "Champions League football", price: "1000", sizes: ["5"] },
            { img: "m8", title: "World Cup 2010 Jabulani football", price: "1000", sizes: ["5"] },
            { img: "m9", title: "World Cup 2010 Jabulani football", price: "1000", sizes: ["5"] },
            { img: "m10", title: "Match football", price: "1000" },
            { img: "m11", title: "Match football", price: "2000" },
            { img: "m12", title: "Match football", price: "2000" },
            { img: "m13", title: "Match football", price: "2000" },
            { img: "m14", title: "Molten size 4 (low bounce)", price: "1500" },
            { img: "m15", title: "Molten size 5", price: "3500" },
            { img: "m16", title: "Molten Vantaggio", price: "2500" },
            { img: "m17", title: "Molten size 4", price: "6500" },
            { img: "m18", title: "Size 5 bouncy balls", price: "1000" },
            { img: "m19", title: "Match football", price: "500" },
            { img: "m20", title: "KELME AFC football, size 5", price: "8500" },
            { img: "m21", title: "Match football", price: "1000" },
            { img: "m22", title: "Match football", price: "1000" },
            { img: "m23", title: "Match football", price: "1000" },
            { img: "m24", title: "Match football", price: "2000" },
            { img: "m25", title: "Match football", price: "350" },
        ]),
        ...generateBalls("Волейбол", "Мяч", "voleibol.basketbol/top", 191, [
            { img: "1", title: "Molten volleyball (green, red, white)", price: "1500" },
            { img: "2", title: "V200W volleyball (yellow, blue)", price: "1500" },
            { img: "3", title: "Mikasa V300W volleyball", price: "6500" },
            { img: "4", title: "Molten FIBA BG3800 basketball", price: "5000" },
            { img: "5", title: "Wilson basketball", price: "1500" },
            { img: "6", title: "BG3180 basketball", price: "3000" },
            { img: "7", title: "Wilson 3X3 basketball", price: "5000" },
            { img: "8", title: "Molten GD7X basketball", price: "3500" },
            { img: "9", title: "Molten GD6X basketball", price: "3500" },
        ]),
        // Fitness accessories (Бардык сүрөттөр менен)
    ]
};