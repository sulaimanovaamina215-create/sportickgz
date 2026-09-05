export type Lang = "ky" | "ru" | "en";

const encodePhoto = (relPath: string) =>
    "/" + relPath.replace(/^\//, "").split("/").map(encodeURIComponent).join("/");

const fromFiles = (
    startId: number,
    files: string[],
    category: string,
    subCategory: string,
    titles: Record<Lang, string>,
    lang: Lang,
    price = "",
    sizes: string[] = ["Standard"]
) =>
    files.map((file, index) => {
        const photo = encodePhoto(file);
        const photoSides =
            (category === "Волейбол" && subCategory === "Мяч") ||
            (category === "Волейбол" && subCategory === "Обувь") ||
            (category === "Волейбол" && subCategory === "Аксессуары");
        return {
            id: startId + index,
            title: titles[lang],
            price,
            sizes,
            photo,
            hoverPhoto: photo,
            category,
            subCategory,
            ...(photoSides ? { photoSides: true, openModal: true } : {}),
        };
    }).map((product, index, arr) => {
        if (category === "Футбол" && subCategory === "Форма") return product;
        if (category === "Бокс, ММА, Борьба" && (subCategory === "ММА Перчатки" || subCategory === "Рашгарды, формы" || subCategory === "Борьба" || subCategory === "Аксессуары")) return product;
        if (category === "Фитнес, Домашний спорт" && (subCategory === "Гантели" || subCategory === "Коврик" || subCategory === "GYM" || subCategory === "Аксессуары")) return product;
        if (category === "Волейбол" && (subCategory === "Мяч" || subCategory === "Обувь" || subCategory === "Аксессуары")) return product;
        if (arr.length < 2) return product;
        const partner = arr[(index + 1) % arr.length];
        if (partner.photo === product.photo) return product;
        return { ...product, hoverPhoto: partner.photo };
    });

const fromNamedFiles = (
    startId: number,
    items: { file: string; titles: Record<Lang, string> }[],
    category: string,
    subCategory: string,
    lang: Lang,
    price = "",
    sizes: string[] = ["Standard"]
) =>
    items.map((item, index) => {
        const photo = encodePhoto(item.file);
        return {
            id: startId + index,
            title: item.titles[lang],
            price,
            sizes,
            photo,
            hoverPhoto: photo,
            category,
            subCategory,
            photoFit: "contain" as const,
        };
    });

const fromPricedNamedFiles = (
    startId: number,
    items: { file: string; titles: Record<Lang, string>; price: string }[],
    category: string,
    subCategory: string,
    lang: Lang,
    sizes: string[] = ["Standard"]
) =>
    items.map((item, index) => {
        const photo = encodePhoto(item.file);
        const photoSides = category === "Волейбол" && subCategory === "Аксессуары";
        return {
            id: startId + index,
            title: item.titles[lang],
            price: item.price,
            sizes,
            photo,
            hoverPhoto: photo,
            category,
            subCategory,
            ...(photoSides ? { photoSides: true, openModal: true } : {}),
        };
    });

const mmaFormaSizes = ["S", "M", "L", "XL", "2XL", "3XL"];

const mmaFormaItems: {
    file: string;
    price: string;
    titles: Record<Lang, string>;
}[] = [
    {
        file: "catalog/mma/forma/dvoika.jpg",
        price: "2000",
        titles: {
            ky: "Комплект UFC Venum (футболка + шорт)",
            ru: "Комплект UFC Venum (футболка + шорты)",
            en: "UFC Venum set (shirt + shorts)",
        },
    },
    {
        file: "catalog/mma/forma/dvoika 1.jpg",
        price: "2000",
        titles: {
            ky: "Комплект UFC Venum (футболка + шорт)",
            ru: "Комплект UFC Venum (футболка + шорты)",
            en: "UFC Venum set (shirt + shorts)",
        },
    },
    {
        file: "catalog/mma/forma/dvoika 2.jpg",
        price: "2000",
        titles: {
            ky: "Комплект GREEN HILL (футболка + шорт)",
            ru: "Комплект GREEN HILL (футболка + шорты)",
            en: "GREEN HILL set (shirt + shorts)",
        },
    },
    {
        file: "catalog/mma/forma/dvoika 3.jpg",
        price: "2000",
        titles: {
            ky: "Комплект UFC Venum ак (футболка + шорт)",
            ru: "Комплект UFC Venum белый (футболка + шорты)",
            en: "UFC Venum white set (shirt + shorts)",
        },
    },
    {
        file: "catalog/mma/forma/dvoika 4.jpg",
        price: "2000",
        titles: {
            ky: "Комплект GREEN HILL кызыл (футболка + шорт)",
            ru: "Комплект GREEN HILL красный (футболка + шорты)",
            en: "GREEN HILL red set (shirt + shorts)",
        },
    },
    {
        file: "catalog/mma/forma/dvoika 5.jpg",
        price: "1200",
        titles: {
            ky: "Шорт GREEN HILL (кызыл)",
            ru: "Шорты GREEN HILL (красные)",
            en: "GREEN HILL shorts (red)",
        },
    },
    {
        file: "catalog/mma/forma/dvoika 7.jpg",
        price: "800",
        titles: {
            ky: "Футболка GREEN HILL",
            ru: "Футболка GREEN HILL",
            en: "GREEN HILL shirt",
        },
    },
    {
        file: "catalog/mma/forma/dvoika 8.jpg",
        price: "800",
        titles: {
            ky: "Футболка UFC Venum",
            ru: "Футболка UFC Venum",
            en: "UFC Venum shirt",
        },
    },
    {
        file: "catalog/mma/forma/dvoika 22.jpg",
        price: "1200",
        titles: {
            ky: "Шорт GREEN HILL (көк)",
            ru: "Шорты GREEN HILL (синие)",
            en: "GREEN HILL shorts (blue)",
        },
    },
    {
        file: "catalog/mma/forma/dvoika 555.jpg",
        price: "1200",
        titles: {
            ky: "Шорт UFC Venum (ак)",
            ru: "Шорты UFC Venum (белые)",
            en: "UFC Venum shorts (white)",
        },
    },
    {
        file: "catalog/mma/forma/dvoika b.jpg",
        price: "1200",
        titles: {
            ky: "Шорт GREEN HILL (боз)",
            ru: "Шорты GREEN HILL (серые)",
            en: "GREEN HILL shorts (grey)",
        },
    },
    {
        file: "catalog/mma/forma/dvoika c.jpg",
        price: "2000",
        titles: {
            ky: "Комплект GREEN HILL боз (футболка + шорт)",
            ru: "Комплект GREEN HILL серый (футболка + шорты)",
            en: "GREEN HILL grey set (shirt + shorts)",
        },
    },
    {
        file: "catalog/mma/forma/dvoika e.jpg",
        price: "2000",
        titles: {
            ky: "Комплект RUDIS (футболка + шорт)",
            ru: "Комплект RUDIS (футболка + шорты)",
            en: "RUDIS set (shirt + shorts)",
        },
    },
    {
        file: "catalog/mma/forma/dvoika k.jpg",
        price: "2000",
        titles: {
            ky: "Комплект GREEN HILL көк (футболка + шорт)",
            ru: "Комплект GREEN HILL синий (футболка + шорты)",
            en: "GREEN HILL blue set (shirt + shorts)",
        },
    },
    {
        file: "catalog/mma/forma/dvoika s.jpg",
        price: "1200",
        titles: {
            ky: "Шорт RUDIS",
            ru: "Шорты RUDIS",
            en: "RUDIS shorts",
        },
    },
    {
        file: "catalog/mma/forma/dvoikar.jpg",
        price: "800",
        titles: {
            ky: "Футболка RUDIS",
            ru: "Футболка RUDIS",
            en: "RUDIS shirt",
        },
    },
    {
        file: "catalog/mma/forma/qdvoika.jpg",
        price: "800",
        titles: {
            ky: "Футболка GREEN HILL (көк)",
            ru: "Футболка GREEN HILL (синяя)",
            en: "GREEN HILL shirt (blue)",
        },
    },
    {
        file: "catalog/mma/dvoika 00.jpg",
        price: "800",
        titles: {
            ky: "Футболка UFC Venum (ак)",
            ru: "Футболка UFC Venum (белая)",
            en: "UFC Venum shirt (white)",
        },
    },
    {
        file: "catalog/mma/dvoika h.jpg",
        price: "800",
        titles: {
            ky: "Футболка GREEN HILL (боз)",
            ru: "Футболка GREEN HILL (серая)",
            en: "GREEN HILL shirt (grey)",
        },
    },
    {
        file: "catalog/mma/forma/venum-shorts-black-gold.png",
        price: "1300",
        titles: {
            ky: "Тайский бокс шорттары Venum (кара/алтын)",
            ru: "Шорты для тайского бокса Venum (чёрные/золото)",
            en: "Venum Muay Thai shorts (black/gold)",
        },
    },
    {
        file: "catalog/mma/forma/venum-shorts-red-blue.png",
        price: "1300",
        titles: {
            ky: "Тайский бокс шорттары Venum (кызыл/көк)",
            ru: "Шорты для тайского бокса Venum (красные/синие)",
            en: "Venum Muay Thai shorts (red/blue)",
        },
    },
];

const mmaFormaProducts = (startId: number, lang: Lang) =>
    mmaFormaItems.map((item, index) => {
        const photo = encodePhoto(item.file);
        return {
            id: startId + index,
            title: item.titles[lang],
            price: item.price,
            sizes: mmaFormaSizes,
            photo,
            hoverPhoto: photo,
            category: "Бокс, ММА, Борьба",
            subCategory: "Рашгарды, формы",
            openModal: true,
            photoFit: "contain" as const,
        };
    });

const mmaExtraGloveItems: { file: string; titles: Record<Lang, string> }[] = [
    { file: "catalog/mma/perchatci.shlem/555.jpg", titles: { ky: "Бокс мээлейлери RDX AURA+ (көк)", ru: "Боксёрские перчатки RDX AURA+ (синие)", en: "RDX AURA+ boxing gloves (blue)" } },
    { file: "catalog/mma/perchatci.shlem/photo_5418211904196385996_y.jpg", titles: { ky: "Бокс мээлейлери IBA Budva 2024", ru: "Боксёрские перчатки IBA Budva 2024", en: "IBA Budva 2024 boxing gloves" } },
    { file: "catalog/mma/perchatci.shlem/photo_5418211904196385997_y.jpg", titles: { ky: "Бокс мээлейлери GREEN HILL IBA", ru: "Боксёрские перчатки GREEN HILL IBA", en: "GREEN HILL IBA boxing gloves" } },
    { file: "catalog/mma/perchatci.shlem/photo_5418211904196386000_y.jpg", titles: { ky: "Бокс мээлейлери RDX IBA (кызыл)", ru: "Боксёрские перчатки RDX IBA (красные)", en: "RDX IBA boxing gloves (red)" } },
    { file: "catalog/mma/perchatci.shlem/photo_5418211904196386001_y.jpg", titles: { ky: "Бокс мээлейлери RDX IBA (кара)", ru: "Боксёрские перчатки RDX IBA (чёрные)", en: "RDX IBA boxing gloves (black)" } },
    { file: "catalog/mma/perchatci.shlem/photo_5418211904196386002_y.jpg", titles: { ky: "Бокс мээлейлери RDX IBA (көк)", ru: "Боксёрские перчатки RDX IBA (синие)", en: "RDX IBA boxing gloves (blue)" } },
    { file: "catalog/mma/perchatci.shlem/photo_5418211904196386004_y.jpg", titles: { ky: "Бокс мээлейлери RDX AURA+", ru: "Боксёрские перчатки RDX AURA+", en: "RDX AURA+ boxing gloves" } },
    { file: "catalog/mma/perchatci.shlem/photo_5418211904196386006_y.jpg", titles: { ky: "Бокс мээлейлери RDX AURA 12 oz", ru: "Боксёрские перчатки RDX AURA 12 oz", en: "RDX AURA boxing gloves 12 oz" } },
    { file: "catalog/mma/perchatci.shlem/photo_5418211904196386007_y.jpg", titles: { ky: "Бокс мээлейлери RDX AURA+ 10 oz", ru: "Боксёрские перчатки RDX AURA+ 10 oz", en: "RDX AURA+ boxing gloves 10 oz" } },
    { file: "catalog/mma/perchatci.shlem/photo_5418211904196386008_y.jpg", titles: { ky: "ММА мээлейлери RDX IMMAF (кызыл)", ru: "Перчатки ММА RDX IMMAF (красные)", en: "RDX IMMAF MMA gloves (red)" } },
    { file: "catalog/mma/perchatci.shlem/photo_5418211904196386010_y.jpg", titles: { ky: "Бокс мээлейлери RDX AURA+ (көк)", ru: "Боксёрские перчатки RDX AURA+ (синие)", en: "RDX AURA+ boxing gloves (blue)" } },
    { file: "catalog/mma/perchatci.shlem/photo_5418211904196386011_y.jpg", titles: { ky: "ММА мээлейлери RDX IMMAF (сары)", ru: "Перчатки ММА RDX IMMAF (жёлтые)", en: "RDX IMMAF MMA gloves (yellow)" } },
];

const mmaAccessoryItems: { file: string; titles: Record<Lang, string>; price: string }[] = [
    {
        file: "catalog/mma/acsessuar/bandaj.jpg",
        titles: {
            ky: "Аялдар бандажы",
            ru: "Бандаж женский",
            en: "Women's chest guard",
        },
        price: "1000",
    },
    {
        file: "catalog/mma/acsessuar/bint.jpg",
        titles: {
            ky: "Бинт 3 метр",
            ru: "Бинт 3 метра",
            en: "Hand wrap 3 meters",
        },
        price: "150",
    },
    {
        file: "catalog/mma/acsessuar/photo_5418211904196385973_y.jpg",
        titles: {
            ky: "Капа VENUM PREDATOR",
            ru: "Капа VENUM PREDATOR",
            en: "VENUM PREDATOR mouthguard",
        },
        price: "500",
    },
    {
        file: "catalog/mma/acsessuar/photo_5418211904196385974_y.jpg",
        titles: {
            ky: "Капа VENUM PREDATOR",
            ru: "Капа VENUM PREDATOR",
            en: "VENUM PREDATOR mouthguard",
        },
        price: "500",
    },
    {
        file: "catalog/mma/acsessuar/photo_5420463704010071392_y.jpg",
        titles: {
            ky: "Капа балдар жана чоңдор үчүн гел",
            ru: "Капа детский и взрослый гелевый",
            en: "Kids and adult gel mouthguard",
        },
        price: "100",
    },
    {
        file: "catalog/mma/acsessuar/photo_5429133013892667677_y.jpg",
        titles: {
            ky: "Тейп",
            ru: "Тейп",
            en: "Tape",
        },
        price: "500",
    },
];

const mmaAccessoryProducts = (startId: number, lang: Lang) =>
    mmaAccessoryItems.map((item, index) => {
        const photo = encodePhoto(item.file);
        return {
            id: startId + index,
            title: item.titles[lang],
            price: item.price,
            sizes: ["Standard"],
            photo,
            hoverPhoto: photo,
            category: "Бокс, ММА, Борьба",
            subCategory: "Аксессуары",
            openModal: true,
            photoFit: "contain" as const,
        };
    });

const mmaExtraTrek: { file: string; titles: Record<Lang, string>; price: string }[] = [
    {
        file: "catalog/mma/trek/boks.jpg",
        titles: { ky: "Боксерка MACHO MAI 2 SE", ru: "Боксерка MACHO MAI 2 SE", en: "Boxing shoes MACHO MAI 2 SE" },
        price: "3500",
    },
    {
        file: "catalog/mma/trek/photo_5426881214078984074_y.jpg",
        titles: { ky: "Боксерка HYPERKO 1", ru: "Боксерка HYPERKO 1", en: "Boxing shoes HYPERKO 1" },
        price: "2500",
    },
    {
        file: "catalog/mma/trek/photo_5426881214078984075_y.jpg",
        titles: { ky: "Боксерка HYPERKO 1", ru: "Боксерка HYPERKO 1", en: "Boxing shoes HYPERKO 1" },
        price: "2500",
    },
    {
        file: "catalog/mma/trek/photo_5426881214078984076_y.jpg",
        titles: { ky: "Боксерка HYPERKO 1", ru: "Боксерка HYPERKO 1", en: "Boxing shoes HYPERKO 1" },
        price: "2500",
    },
    {
        file: "catalog/mma/trek/photo_5426881214078984077_y.jpg",
        titles: { ky: "Боксерка MACHO MAI 2 GUM", ru: "Боксерка MACHO MAI 2 GUM", en: "Boxing shoes MACHO MAI 2 GUM" },
        price: "3500",
    },
];

const va = "catalog/voleibol.basketbol/asessuar";
const medal150: Record<Lang, string> = {
    ky: "Медаль (1 даана)",
    ru: "Медаль (1 шт)",
    en: "Medal (1 pc)",
};
const volleyballAccessoryItems: { file: string; titles: Record<Lang, string>; price: string }[] = [
    {
        file: `${va}/photo_5420463704010070917_y.jpg`,
        titles: {
            ky: "Волейбол / машыгуу наколенник жана налокотниктери",
            ru: "Наколенники и налокотники для волейбола или тренировок",
            en: "Volleyball / training knee and elbow pads",
        },
        price: "250",
    },
    {
        file: `${va}/photo_5420463704010070918_y.jpg`,
        titles: {
            ky: "Ак волейбол наколенник жана налокотниктери",
            ru: "Белые наколенники и налокотники для волейбола или тренировок",
            en: "White volleyball / training knee and elbow pads",
        },
        price: "250",
    },
    {
        file: `${va}/photo_5420463704010070919_y.jpg`,
        titles: {
            ky: "Кара волейбол наколенник жана налокотниктери",
            ru: "Чёрные наколенники и налокотники для волейбола или тренировок",
            en: "Black volleyball / training knee and elbow pads",
        },
        price: "800",
    },
    { file: `${va}/photo_5424640688554450085_y (1).jpg`, titles: medal150, price: "150" },
    { file: `${va}/photo_5424640688554450086_y.jpg`, titles: medal150, price: "150" },
    { file: `${va}/photo_5424640688554450087_y.jpg`, titles: medal150, price: "150" },
    { file: `${va}/photo_5424640688554450088_y.jpg`, titles: medal150, price: "150" },
    { file: `${va}/photo_5424640688554450089_y.jpg`, titles: medal150, price: "150" },
    { file: `${va}/photo_5424640688554450090_y.jpg`, titles: medal150, price: "250" },
    { file: `${va}/photo_5424640688554450091_y.jpg`, titles: medal150, price: "250" },
    { file: `${va}/photo_5424640688554450092_y.jpg`, titles: medal150, price: "250" },
    { file: `${va}/photo_5424640688554450093_y.jpg`, titles: medal150, price: "250" },
    { file: `${va}/photo_5424640688554450094_y.jpg`, titles: medal150, price: "250" },
    { file: `${va}/photo_5424640688554450095_y.jpg`, titles: medal150, price: "250" },
    {
        file: `${va}/photo_5426881214078983040_y.jpg`,
        titles: { ky: "Волейбол тору", ru: "Волейбольная сетка", en: "Volleyball net" },
        price: "950",
    },
    {
        file: `${va}/photo_5426881214078983044_y.jpg`,
        titles: { ky: "Баскет шакегинин тору", ru: "Баскетбольная сетка для кольца", en: "Basketball rim net" },
        price: "350",
    },
    {
        file: `${va}/photo_5426881214078983047_y.jpg`,
        titles: { ky: "Баскет шакегинин тору", ru: "Баскетбольная сетка для кольца", en: "Basketball rim net" },
        price: "500",
    },
    {
        file: `${va}/photo_5426881214078983049_y (1).jpg`,
        titles: { ky: "Машыгуу байпактары", ru: "Носки для тренировок", en: "Training socks" },
        price: "150",
    },
    {
        file: `${va}/photo_5426881214078983050_y.jpg`,
        titles: { ky: "Спорт таблосу", ru: "Табло", en: "Scoreboard" },
        price: "1500",
    },
    {
        file: `${va}/photo_5426881214078983051_y.jpg`,
        titles: { ky: "Спорт таблосу", ru: "Табло", en: "Scoreboard" },
        price: "1500",
    },
    {
        file: `${va}/photo_5426881214078983052_y.jpg`,
        titles: { ky: "Оригиналдуу Mikasa таблосу", ru: "Оригинальный табло MIKASA", en: "Original MIKASA scoreboard" },
        price: "5000",
    },
    {
        file: `${va}/photo_5426881214078983984_y.jpg`,
        titles: { ky: "Статуэтка", ru: "Статуэтка", en: "Figurine" },
        price: "350",
    },
    {
        file: `${va}/photo_5426881214078983986_y.jpg`,
        titles: { ky: "Статуэтка", ru: "Статуэтка", en: "Figurine" },
        price: "350",
    },
    {
        file: `${va}/photo_5426881214078983988_y.jpg`,
        titles: { ky: "Мыкты дарбазачы кубогу", ru: "Кубок «Лучший вратарь»", en: "Best goalkeeper trophy" },
        price: "1500",
    },
    {
        file: `${va}/photo_5426881214078983990_y.jpg`,
        titles: { ky: "Алтын бутса кубогу", ru: "Кубок «Золотые бутсы»", en: "Golden boot trophy" },
        price: "1500",
    },
    {
        file: `${va}/photo_5426881214078983991_y.jpg`,
        titles: { ky: "Кубок, бийиктиги 27 см", ru: "Кубок, высота 27 см", en: "Cup, height 27 cm" },
        price: "1500",
    },
    {
        file: `${va}/photo_5426881214078983993_y.jpg`,
        titles: { ky: "Мыкты дарбазачы кубогу", ru: "Кубок «Лучший вратарь»", en: "Best goalkeeper trophy" },
        price: "2500",
    },
    {
        file: `${va}/photo_5426881214078983994_y.jpg`,
        titles: { ky: "Кубок, бийиктиги 42 см", ru: "Кубок, высота 42 см", en: "Cup, height 42 cm" },
        price: "2800",
    },
    {
        file: `${va}/photo_5426881214078984003_y.jpg`,
        titles: { ky: "Кубок, бийиктиги 39 см", ru: "Кубок, высота 39 см", en: "Cup, height 39 cm" },
        price: "2800",
    },
    {
        file: `${va}/photo_5426881214078984005_y.jpg`,
        titles: { ky: "Кубок, бийиктиги 46 см", ru: "Кубок, высота 46 см", en: "Cup, height 46 cm" },
        price: "3800",
    },
];

const volleyballShoes = [
    "catalog/voleibol.basketbol/obuv/obuv.jpg",
    "catalog/voleibol.basketbol/obuv/obuva.jpg",
    "catalog/voleibol.basketbol/obuv/obuvd.jpg",
    "catalog/voleibol.basketbol/obuv/obuvqq.jpg",
    "catalog/voleibol.basketbol/obuv/obuvvv.jpg",
    "catalog/voleibol.basketbol/obuv/oobuv.jpg",
    "catalog/voleibol.basketbol/obuv/obbbbuv.jpg",
];

const volleyballShoeExtraItems: {
    file: string;
    titles: Record<Lang, string>;
    price: string;
    sizes: string[];
}[] = [
    {
        file: "catalog/voleibol.basketbol/obuv/adidas-blue-gold.png",
        titles: {
            ky: "Волейбол кроссовкалары ADIDAS",
            ru: "Волейбольные кроссовки ADIDAS",
            en: "ADIDAS volleyball sneakers",
        },
        price: "3500",
        sizes: ["40", "41", "42", "43", "44"],
    },
    {
        file: "catalog/voleibol.basketbol/obuv/asics-white-gold.png",
        titles: {
            ky: "Волейбол кроссовкалары ASICS",
            ru: "Волейбольные кроссовки ASICS",
            en: "ASICS volleyball sneakers",
        },
        price: "3500",
        sizes: ["40", "41", "42", "43", "44"],
    },
    {
        file: "catalog/voleibol.basketbol/obuv/asics-white-mauve.png",
        titles: {
            ky: "Волейбол кроссовкалары ASICS",
            ru: "Волейбольные кроссовки ASICS",
            en: "ASICS volleyball sneakers",
        },
        price: "3500",
        sizes: ["35", "36", "37", "38", "39", "40"],
    },
];

const volleyballShoeExtraProducts = (startId: number, lang: Lang) =>
    volleyballShoeExtraItems.map((item, index) => {
        const photo = encodePhoto(item.file);
        return {
            id: startId + index,
            title: item.titles[lang],
            price: item.price,
            sizes: item.sizes,
            photo,
            hoverPhoto: photo,
            category: "Волейбол",
            subCategory: "Обувь",
            photoSides: true,
            openModal: true,
        };
    });

const volleyballExtraBalls = [
    {
        file: "catalog/voleibol.basketbol/top/photo_5426881214078983076_y.jpg",
        titles: {
            ky: "Волейбол тобу MIKASA оригинал V200W",
            ru: "Волейбольный мяч MIKASA оригинал V200W",
            en: "Mikasa original V200W volleyball",
        },
        price: "9500",
    },
    {
        file: "catalog/voleibol.basketbol/top/photo_5426881214078983078_y.jpg",
        titles: {
            ky: "Волейбол тобу MIKASA Official",
            ru: "Волейбольный мяч MIKASA Official",
            en: "Mikasa Official volleyball",
        },
        price: "2500",
    },
    {
        file: "catalog/voleibol.basketbol/top/photo_5426881214078983081_y.jpg",
        titles: {
            ky: "Волейбол тобу MOLTEN FIV3",
            ru: "Волейбольный мяч MOLTEN FIV3",
            en: "Molten FIV3 volleyball",
        },
        price: "6000",
    },
];

const volleyballExtraBallItems = volleyballExtraBalls;

const fitnessGymItems: {
    file: string;
    hover?: string;
    titles: Record<Lang, string>;
    price: string;
}[] = [
    {
        file: "catalog/fitnes/GYM/1.jpg",
        hover: "catalog/fitnes/GYM/photo_5418211904196385556_y.jpg",
        titles: {
            ky: "Перчаткалар",
            ru: "Перчатки",
            en: "Gym gloves",
        },
        price: "400",
    },
    {
        file: "catalog/fitnes/GYM/3.jpg",
        hover: "catalog/fitnes/GYM/photo_5418211904196385558_y.jpg",
        titles: {
            ky: "Перчаткалар",
            ru: "Перчатки",
            en: "Gym gloves",
        },
        price: "400",
    },
    {
        file: "catalog/fitnes/GYM/photo_5190527518807627293_y.jpg",
        titles: {
            ky: "Аялдар үчүн универсал гантель (8.5 кг / 8501)",
            ru: "Гантель женская универсал (8.5 кг / 8501)",
            en: "Women's universal dumbbell (8.5 kg / 8501)",
        },
        price: "2500",
    },
    {
        file: "catalog/fitnes/GYM/photo_5190527518807627296_y.jpg",
        titles: {
            ky: "Универсал гиря 3 в 1",
            ru: "Гиря универсал 3 в 1",
            en: "Universal kettlebell 3-in-1",
        },
        price: "10000",
    },
    {
        file: "catalog/fitnes/GYM/photo_5190527518807627297_y.jpg",
        titles: {
            ky: "Универсал гантель 25 кг",
            ru: "Гантель универсал 25 кг",
            en: "Universal dumbbell 25 kg",
        },
        price: "9000",
    },
    {
        file: "catalog/fitnes/GYM/photo_5424640688554449984_y.jpg",
        hover: "catalog/fitnes/GYM/photo_5424640688554449985_y.jpg",
        titles: {
            ky: "Хром гантель 5 кг",
            ru: "Гантель хромовая 5 кг",
            en: "Chrome dumbbell 5 kg",
        },
        price: "3000",
    },
    {
        file: "catalog/fitnes/GYM/photo_5418211904196385559_y.jpg",
        titles: {
            ky: "Билек фиксатору",
            ru: "Кистевой фиксатор",
            en: "Wrist wrap",
        },
        price: "500",
    },
    {
        file: "catalog/fitnes/GYM/photo_5424640688554449995_y.jpg",
        hover: "catalog/fitnes/GYM/photo_5424640688554449996_y.jpg",
        titles: {
            ky: "Турник же гантель үчүн лямка",
            ru: "Лямка для турника или гантели",
            en: "Pull-up / dumbbell lifting strap",
        },
        price: "500",
    },
    {
        file: "catalog/fitnes/GYM/photo_5426881214078983053_y.jpg",
        titles: {
            ky: "Мандай повязкасы",
            ru: "Повязка на лоб",
            en: "Headband",
        },
        price: "250",
    },
    {
        file: "catalog/fitnes/GYM/photo_5426881214078983060_y.jpg",
        titles: {
            ky: "Кол повязкасы (кызыл)",
            ru: "Повязка для рук (красный)",
            en: "Wristband (red)",
        },
        price: "250",
    },
    {
        file: "catalog/fitnes/GYM/photo_5426881214078983059_y.jpg",
        titles: {
            ky: "Кол повязкасы (кара)",
            ru: "Повязка для рук (черный)",
            en: "Wristband (black)",
        },
        price: "250",
    },
    {
        file: "catalog/fitnes/GYM/photo_5426881214078983061_y.jpg",
        titles: {
            ky: "Кол повязкасы (көк)",
            ru: "Повязка для рук (синий)",
            en: "Wristband (blue)",
        },
        price: "250",
    },
];

const fitnessGymProducts = (startId: number, lang: Lang) =>
    fitnessGymItems.map((item, index) => {
        const photo = encodePhoto(item.file);
        const hoverPhoto = item.hover ? encodePhoto(item.hover) : photo;
        const title = item.titles[lang];
        const enTitle = item.titles.en;
        // Гантельдер → «Gym Гантель»; калганы → Аксессуары (GYM батырмасы эми грушаларга)
        const titleAll = `${title} ${enTitle}`;
        const isDumbbell =
            /гантель|dumbbell/i.test(titleAll) &&
            !/лямка|strap|повязк|фиксатор|перчатк|glove/i.test(titleAll);
        return {
            id: startId + index,
            title,
            price: item.price,
            sizes: ["Standard"],
            photo,
            hoverPhoto,
            category: "Фитнес, Домашний спорт",
            subCategory: isDumbbell ? "Гантели" : "Аксессуары",
            openModal: true,
            photoFit: "contain" as const,
        };
    });

const fitnessGantelItems: { file: string; titles: Record<Lang, string>; price: string }[] = [
    {
        file: "catalog/fitnes/gantel/photo_5426881214078983953_y.jpg",
        titles: {
            ky: "Гел гантель 2LB",
            ru: "Гелевый гантель 2LB",
            en: "Gel dumbbell 2LB",
        },
        price: "850",
    },
    {
        file: "catalog/fitnes/gantel/photo_5426881214078983954_y.jpg",
        titles: {
            ky: "Гел гантель 3LB",
            ru: "Гелевый гантель 3LB",
            en: "Gel dumbbell 3LB",
        },
        price: "1300",
    },
    {
        file: "catalog/fitnes/gantel/photo_5426881214078983955_y.jpg",
        titles: {
            ky: "Гел гантель 4LB",
            ru: "Гелевый гантель 4LB",
            en: "Gel dumbbell 4LB",
        },
        price: "1800",
    },
    {
        file: "catalog/fitnes/gantel/photo_5426881214078983956_y.jpg",
        titles: {
            ky: "Гел гантель 5LB",
            ru: "Гелевый гантель 5LB",
            en: "Gel dumbbell 5LB",
        },
        price: "2200",
    },
    {
        file: "catalog/fitnes/gantel/photo_5426881214078983957_y.jpg",
        titles: {
            ky: "Гел гантель 6LB",
            ru: "Гелевый гантель 6LB",
            en: "Gel dumbbell 6LB",
        },
        price: "2500",
    },
    {
        file: "catalog/fitnes/gantel/photo_5426881214078983958_y.jpg",
        titles: {
            ky: "Гел гантель 7LB",
            ru: "Гелевый гантель 7LB",
            en: "Gel dumbbell 7LB",
        },
        price: "2600",
    },
    {
        file: "catalog/fitnes/gantel/photo_5426881214078983959_y.jpg",
        titles: {
            ky: "Гел гантель 8LB",
            ru: "Гелевый гантель 8LB",
            en: "Gel dumbbell 8LB",
        },
        price: "2800",
    },
];

const fitnessGantelProducts = (startId: number, lang: Lang) =>
    fitnessGantelItems.map((item, index) => {
        const photo = encodePhoto(item.file);
        return {
            id: startId + index,
            title: item.titles[lang],
            price: item.price,
            sizes: ["Standard"],
            photo,
            hoverPhoto: photo,
            category: "Фитнес, Домашний спорт",
            subCategory: "Гантели",
            openModal: true,
            photoFit: "contain" as const,
        };
    });

const fitnessKovrikItems: {
    file: string;
    titles: Record<Lang, string>;
    price: string;
    sizes: string[];
}[] = [
    {
        file: "catalog/fitnes/kovrik/tpe-yoga-mat-1.png",
        titles: {
            ky: "Фитнес/йога коврик (TPE) 170×61 см",
            ru: "Коврик для фитнеса/йоги (TPE йога мат) 170×61 см",
            en: "Fitness/yoga mat (TPE) 170×61 cm",
        },
        price: "750",
        sizes: ["170×61"],
    },
    {
        file: "catalog/fitnes/kovrik/tpe-yoga-mat-2.png",
        titles: {
            ky: "Фитнес/йога коврик (TPE) 180×61 см",
            ru: "Коврик для фитнеса/йоги (TPE йога мат) 180×61 см",
            en: "Fitness/yoga mat (TPE) 180×61 cm",
        },
        price: "1000",
        sizes: ["180×61"],
    },
    {
        file: "catalog/fitnes/kovrik/tpe-yoga-mat-3.png",
        titles: {
            ky: "Фитнес/йога коврик (TPE) 187×61 см",
            ru: "Коврик для фитнеса/йоги (TPE йога мат) 187×61 см",
            en: "Fitness/yoga mat (TPE) 187×61 cm",
        },
        price: "1500",
        sizes: ["187×61"],
    },
];

const fitnessKovrikProducts = (startId: number, lang: Lang) =>
    fitnessKovrikItems.map((item, index) => {
        const photo = encodePhoto(item.file);
        return {
            id: startId + index,
            title: item.titles[lang],
            price: item.price,
            sizes: item.sizes,
            photo,
            hoverPhoto: photo,
            category: "Фитнес, Домашний спорт",
            subCategory: "Коврик",
            openModal: true,
            photoFit: "contain" as const,
        };
    });

const fitnessGrushaItems: {
    file: string;
    hover?: string;
    titles: Record<Lang, string>;
    price: string;
}[] = [
    {
        file: "catalog/fitnes/grusha/photo_5426881214078983023_y.jpg",
        titles: {
            ky: "Тик турган бокс грушасы",
            ru: "Напольная боксёрская груша",
            en: "Freestanding punching bag",
        },
        price: "8500",
    },
    {
        file: "catalog/fitnes/grusha/photo_5426881214078983024_y.jpg",
        hover: "catalog/fitnes/grusha/photo_5426881214078983026_y.jpg",
        titles: {
            ky: "Болгар мүшөгү",
            ru: "Болгарский мешок",
            en: "Bulgarian Bag",
        },
        price: "7000",
    },
    {
        file: "catalog/fitnes/grusha/photo_5426881214078983029_y.jpg",
        hover: "catalog/fitnes/grusha/photo_5426881214078983085_y.jpg",
        titles: {
            ky: "Бокс грушасы Sportic",
            ru: "Боксёрская груша Sportic",
            en: "Sportic punching bag",
        },
        price: "2000",
    },
    {
        file: "catalog/fitnes/grusha/photo_5426881214078983028_y.jpg",
        titles: {
            ky: "Компакт бокс грушасы (көк/кызыл)",
            ru: "Компактная боксёрская груша (синяя/красная)",
            en: "Compact punching bag (blue/red)",
        },
        price: "2000",
    },
    {
        file: "catalog/fitnes/grusha/photo_5426881214078983030_y.jpg",
        titles: {
            ky: "Бокс грушасы Venum (кызыл)",
            ru: "Боксёрская груша Venum (красная)",
            en: "Venum punching bag (red)",
        },
        price: "2500",
    },
    {
        file: "catalog/fitnes/grusha/photo_5472061615743113726_y.jpg",
        titles: {
            ky: "Торсо манекен-груша",
            ru: "Торс-манекен / груша",
            en: "Torso punching dummy",
        },
        price: "8000",
    },
];

const fitnessGrushaProducts = (startId: number, lang: Lang) =>
    fitnessGrushaItems.map((item, index) => {
        const photo = encodePhoto(item.file);
        const hoverPhoto = item.hover ? encodePhoto(item.hover) : photo;
        const title = item.titles[lang];
        const enTitle = item.titles.en;
        // Бокс грушалары гана → «Боксерская Груша» (key: GYM)
        const isPunchingBag = /груша|punching bag|punching dummy|reflex bag/i.test(`${title} ${enTitle}`)
            && !/болгар|bulgarian/i.test(`${title} ${enTitle}`);
        const isBulgarianBag = /болгар|bulgarian bag/i.test(`${title} ${enTitle}`);
        return {
            id: startId + index,
            title,
            price: item.price,
            sizes: ["Standard"],
            photo,
            hoverPhoto,
            category: "Фитнес, Домашний спорт",
            subCategory: isBulgarianBag ? "Гантели" : isPunchingBag ? "GYM" : "Аксессуары",
            openModal: true,
            photoFit: "contain" as const,
        };
    });

const taekwondoFormaFront = "catalog/tecvando,karate/forma/08e996bc-d38e-4687-b713-39f248a92cbc.jpg";
const taekwondoFormaBack = "catalog/tecvando,karate/forma/81a6a3ea-c1ce-4270-94ad-687d3f8304f2.jpg";

const wrestlingSingletSizes = ["3XS", "2XS", "XS", "S", "M", "L", "XL", "2XL"];

const wrestlingSingletItems: {
    file: string;
    hover: string;
    titles: Record<Lang, string>;
}[] = [
    {
        file: "catalog/mma/borba/shark-red-front.png",
        hover: "catalog/mma/borba/shark-red-back.png",
        titles: {
            ky: "Күрөш формасы (кызыл, акула)",
            ru: "Трико борцовское (красное, акула)",
            en: "Wrestling singlet (red, shark)",
        },
    },
    {
        file: "catalog/mma/borba/shark-blue-front.png",
        hover: "catalog/mma/borba/shark-blue-back.png",
        titles: {
            ky: "Күрөш формасы (көк, акула)",
            ru: "Трико борцовское (синее, акула)",
            en: "Wrestling singlet (blue, shark)",
        },
    },
    {
        file: "catalog/mma/borba/kg-blue-front.png",
        hover: "catalog/mma/borba/kg-blue-back.png",
        titles: {
            ky: "Күрөш формасы KYRGYZSTAN (көк)",
            ru: "Трико борцовское KYRGYZSTAN (синее)",
            en: "Wrestling singlet KYRGYZSTAN (blue)",
        },
    },
    {
        file: "catalog/mma/borba/kg-red-front.png",
        hover: "catalog/mma/borba/kg-red-back.png",
        titles: {
            ky: "Күрөш формасы KYRGYZSTAN (кызыл)",
            ru: "Трико борцовское KYRGYZSTAN (красное)",
            en: "Wrestling singlet KYRGYZSTAN (red)",
        },
    },
    {
        file: "catalog/mma/borba/republic-navy-front.png",
        hover: "catalog/mma/borba/republic-navy-back.png",
        titles: {
            ky: "Күрөш формасы KYRGYZ REPUBLIC (көк)",
            ru: "Трико борцовское KYRGYZ REPUBLIC (синее)",
            en: "Wrestling singlet KYRGYZ REPUBLIC (navy)",
        },
    },
    {
        file: "catalog/mma/borba/republic-burgundy-front.png",
        hover: "catalog/mma/borba/republic-burgundy-back.png",
        titles: {
            ky: "Күрөш формасы KYRGYZ REPUBLIC (кызыл)",
            ru: "Трико борцовское KYRGYZ REPUBLIC (бордовое)",
            en: "Wrestling singlet KYRGYZ REPUBLIC (burgundy)",
        },
    },
    {
        file: "catalog/mma/borba/geo-orange-front.png",
        hover: "catalog/mma/borba/geo-orange-back.png",
        titles: {
            ky: "Күрөш формасы (кызыл-сары)",
            ru: "Трико борцовское (красно-оранжевое)",
            en: "Wrestling singlet (red-orange)",
        },
    },
];

const wrestlingSingletProducts = (startId: number, lang: Lang) =>
    wrestlingSingletItems.map((item, index) => ({
        id: startId + index,
        title: item.titles[lang],
        price: "1000",
        sizes: wrestlingSingletSizes,
        photo: encodePhoto(item.file),
        hoverPhoto: encodePhoto(item.hover),
        category: "Бокс, ММА, Борьба",
        subCategory: "Борьба",
        photoFit: "contain" as const,
        openModal: true,
    }));

const flatBandTargets: { category: string; subCategory: string }[] = [
    { category: "Футбол", subCategory: "Аксессуары" },
    { category: "Тхэквондо, Дзюдо", subCategory: "Аксессуары" },
    { category: "Волейбол", subCategory: "Аксессуары" },
    { category: "Фитнес, Домашний спорт", subCategory: "Аксессуары" },
];

const flatBandColors: {
    file: string;
    gallery?: string[];
    titles: Record<Lang, string>;
}[] = [
    {
        file: "catalog/acsessuar/zhgut/green-rolled.png",
        gallery: [
            "catalog/acsessuar/zhgut/green-rolled.png",
            "catalog/acsessuar/zhgut/green-spread.png",
        ],
        titles: {
            ky: "Жалпак жгут (жашыл)",
            ru: "Жгут плоский (зелёный)",
            en: "Flat band (green)",
        },
    },
    {
        file: "catalog/acsessuar/zhgut/blue-rolled.png",
        titles: {
            ky: "Жалпак жгут (көк)",
            ru: "Жгут плоский (синий)",
            en: "Flat band (blue)",
        },
    },
    {
        file: "catalog/acsessuar/zhgut/red-rolled.png",
        gallery: [
            "catalog/acsessuar/zhgut/red-rolled.png",
            "catalog/acsessuar/zhgut/red-spread.png",
        ],
        titles: {
            ky: "Жалпак жгут (кызыл)",
            ru: "Жгут плоский (красный)",
            en: "Flat band (red)",
        },
    },
];

const flatBandLengths = [
    { label: { ky: "2.5 м", ru: "2.5 м", en: "2.5 m" }, price: "500" },
    { label: { ky: "5 м", ru: "5 м", en: "5 m" }, price: "750" },
];

const flatBandProducts = (startId: number, lang: Lang) => {
    const products: {
        id: number;
        title: string;
        price: string;
        priceBySize: Record<string, string>;
        sizes: string[];
        photo: string;
        hoverPhoto: string;
        gallery?: string[];
        category: string;
        subCategory: string;
        photoFit: "contain";
        openModal: boolean;
    }[] = [];
    let id = startId;
    for (const target of flatBandTargets) {
        for (const color of flatBandColors) {
            const photo = encodePhoto(color.file);
            const gallery = color.gallery?.map(encodePhoto);
            const sizes = flatBandLengths.map((length) => length.label[lang]);
            const priceBySize = Object.fromEntries(
                flatBandLengths.map((length) => [length.label[lang], length.price])
            );
            products.push({
                id: id++,
                title: color.titles[lang],
                price: flatBandLengths[0].price,
                priceBySize,
                sizes,
                photo,
                hoverPhoto: photo,
                ...(gallery && gallery.length > 1 ? { gallery } : {}),
                category: target.category,
                subCategory: target.subCategory,
                photoFit: "contain",
                openModal: true,
            });
        }
    }
    return products;
};

const taekwondoFormaProduct = (id: number, subCategory: string, lang: Lang) => {
    const photo = encodePhoto(taekwondoFormaFront);
    const hoverPhoto = encodePhoto(taekwondoFormaBack);
    return {
        id,
        title: {
            ky: "Тхэквондо формасы (ITF)",
            ru: "Форма тхэквондо (ITF)",
            en: "ITF taekwondo uniform",
        }[lang],
        price: "1200",
        sizes: ["S", "M", "L", "XL", "2XL"],
        photo,
        hoverPhoto,
        category: "Тхэквондо, Дзюдо",
        subCategory,
        photoFit: "contain" as const,
        openModal: true,
    };
};

const boxingHelmets = [
    {
        file: "catalog/mma/shlem/shlem-hsif.jpg",
        titles: {
            ky: "Бокс шлеми (профессионалдык)",
            ru: "Шлем боксерский (профессиональный)",
            en: "Professional boxing helmet",
        },
    },
    {
        file: "catalog/mma/shlem/shlem-everlast-black.jpg",
        titles: {
            ky: "Everlast шлем (кара, мелдеш)",
            ru: "Шлем боксерский Everlast (соревновательный)",
            en: "Everlast boxing helmet (competition)",
        },
    },
    {
        file: "catalog/mma/shlem/shlem-everlast-blue.jpg",
        titles: {
            ky: "Everlast шлем (көк)",
            ru: "Шлем боксерский Everlast (синий)",
            en: "Everlast boxing helmet (blue)",
        },
    },
    {
        file: "catalog/mma/shlem/shlem-everlast-red.jpg",
        titles: {
            ky: "Everlast шлем (кызыл)",
            ru: "Шлем боксерский Everlast (красный)",
            en: "Everlast boxing helmet (red)",
        },
    },
    {
        file: "catalog/mma/shlem/shlem-sparring.jpg",
        titles: {
            ky: "Спарринг шлеми (жабык бет)",
            ru: "Шлем для спарринга (закрытый)",
            en: "Sparring helmet (closed face)",
        },
    },
];

const everlastHelmetTitles: Record<Lang, string> = {
    ky: "EVERLAST шлем (тай бокс, бокс, ММА, кикбокс)",
    ru: "Шлем EVERLAST для тайского бокса, бокса, ММА, кикбокса",
    en: "EVERLAST helmet for Muay Thai, boxing, MMA, kickboxing",
};
const daedoHelmetTitles: Record<Lang, string> = {
    ky: "DAEDO шлем тхэквондо ITF, GTF, WTF",
    ru: "Шлем DAEDO для тхэквондо ITF, GTF, WTF",
    en: "DAEDO taekwondo helmet ITF, GTF, WTF",
};
const hsifHelmetTitles: Record<Lang, string> = {
    ky: "HSIF шлем, өлчөмү M–L",
    ru: "Шлем HSIF, размер M–L",
    en: "HSIF helmet, size M–L",
};

const combatHelmetItems: {
    file: string;
    titles: Record<Lang, string>;
    price: string;
    sizes: string[];
}[] = [
    { file: "catalog/mma/shlem/shlem-hsif.jpg", titles: hsifHelmetTitles, price: "1900", sizes: ["M", "L"] },
    { file: "catalog/mma/perchatci.shlem/photo_5422388888740764753_y.jpg", titles: everlastHelmetTitles, price: "900", sizes: ["Standard"] },
    { file: "catalog/tecvando,karate/shlem.perchatci/photo_5422388888740764756_y.jpg", titles: daedoHelmetTitles, price: "1300", sizes: ["Standard"] },
];

const combatHelmetProducts = (startId: number, lang: Lang) =>
    combatHelmetItems.map((item, index) => {
        const photo = encodePhoto(item.file);
        return {
            id: startId + index,
            title: item.titles[lang],
            price: item.price,
            sizes: item.sizes,
            photo,
            hoverPhoto: photo,
            category: "Бокс, ММА, Борьба",
            subCategory: "ММА Перчатки",
            openModal: true,
            photoFit: "contain" as const,
        };
    });

const venumFutyProduct = (id: number, lang: Lang) => {
    const photo = encodePhoto("catalog/mma/perchatci.shlem/futy-kyzyl.jpg");
    const hoverPhoto = encodePhoto("catalog/mma/perchatci.shlem/futy-sary.png");
    return {
        id,
        title: {
            ky: "Футы кожаный",
            ru: "Футы кожаные",
            en: "Leather shin guards",
        }[lang],
        price: "1800",
        sizes: ["S", "M", "L", "XL"],
        photo,
        hoverPhoto,
        category: "Бокс, ММА, Борьба",
        subCategory: "ММА Перчатки",
        openModal: true,
        photoFit: "contain" as const,
    };
};

const taekwondoBeltProduct = (id: number, lang: Lang) => {
    const photo = encodePhoto("catalog/tecvando,karate/acsessuar/poyas-1.jpg");
    const hoverPhoto = encodePhoto("catalog/tecvando,karate/acsessuar/poyas-2.jpg");
    return {
        id,
        title: {
            ky: "Тхэквондо курлары",
            ru: "Пояса тхэквондо",
            en: "Taekwondo belts",
        }[lang],
        price: "250",
        sizes: ["170"],
        photo,
        hoverPhoto,
        category: "Тхэквондо, Дзюдо",
        subCategory: "Аксессуары",
        photoFit: "contain" as const,
    };
};

const mixBagPairs = [
    { file: "catalog/bag/26.png", hover: "catalog/bag/26.png" },
    { file: "catalog/bag/28.png", hover: "catalog/bag/28.png" },
];

const extraFootballDemBibs = [
    "catalog/fudbol/forma/photo_5420463704010070793_y.jpg",
    "catalog/fudbol/forma/photo_5420463704010070794_y.jpg",
    "catalog/fudbol/forma/photo_5420463704010070795_y.jpg",
    "catalog/fudbol/forma/photo_5420463704010070796_y.jpg",
    "catalog/fudbol/forma/photo_5420463704010070797_y.jpg",
];

const extraFootballGoalkeeperKits = [
    "catalog/fudbol/forma/vratar1.png",
    "catalog/fudbol/forma/vratar2.png",
    "catalog/fudbol/forma/photo_5426881214078983184_y.jpg",
    "catalog/fudbol/forma/photo_5426881214078983185_y.jpg",
    "catalog/fudbol/forma/photo_5426881214078983186_y.jpg",
    "catalog/fudbol/forma/photo_5426881214078983187_y.jpg",
];

function buildExtraCatalog(lang: Lang) {
    return [
        ...mmaFormaProducts(8000, lang),
        ...mmaExtraGloveItems.map((item, index) => {
            const photo = encodePhoto(item.file);
            const enTitle = item.titles.en;
            const isRdx = enTitle.includes("RDX");
            const isMma = /MMA|IMMAF/i.test(enTitle);
            const isImmaf = /IMMAF/i.test(enTitle);
            return {
                id: 8100 + index,
                title: item.titles[lang],
                price: isImmaf ? "1300" : "2000",
                sizes: isRdx && !isMma ? ["10 oz", "12 oz"] : ["S", "M", "L", "XL", "2XL"],
                photo,
                hoverPhoto: photo,
                category: "Бокс, ММА, Борьба",
                subCategory: "ММА Перчатки",
                openModal: true,
                photoFit: "contain" as const,
            };
        }),
        venumFutyProduct(8112, lang),
        ...mmaAccessoryProducts(8200, lang),
        ...wrestlingSingletProducts(9300, lang),
        ...flatBandProducts(9500, lang),
        ...fromPricedNamedFiles(8300, mmaExtraTrek, "Бокс, ММА, Борьба", "Борьба", lang, ["36", "37", "38", "39", "40", "41", "42", "43"]),
        ...fromPricedNamedFiles(8400, volleyballAccessoryItems, "Волейбол", "Аксессуары", lang),
        ...fromFiles(8500, volleyballShoes, "Волейбол", "Обувь", {
            ky: "Волейбол кроссовкалары",
            ru: "Волейбольные кроссовки",
            en: "Volleyball sneakers",
        }, lang, "3500", ["40", "41", "42", "43", "44"]),
        ...volleyballShoeExtraProducts(9400, lang),
        ...volleyballExtraBallItems.map((item, index) => {
            const photo = encodePhoto(item.file);
            return {
                id: 8600 + index,
                title: item.titles[lang],
                price: item.price,
                sizes: ["Standard"],
                photo,
                hoverPhoto: photo,
                category: "Волейбол",
                subCategory: "Мяч",
                photoSides: true,
                openModal: true,
            };
        }),
        ...fitnessGymProducts(8700, lang),
        ...fitnessGantelProducts(8800, lang),
        ...fitnessKovrikProducts(8850, lang),
        ...fitnessGrushaProducts(8900, lang),
        taekwondoFormaProduct(9000, "MMA", lang),
        taekwondoFormaProduct(9010, "Тхэквондо", lang),
        ...combatHelmetProducts(9020, lang),
        ...fromNamedFiles(9030, boxingHelmets, "Тхэквондо, Дзюдо", "Дзюдо", lang),
        taekwondoBeltProduct(9040, lang),
        ...mixBagPairs.map((item, index) => {
            const photo = encodePhoto(item.file);
            return {
                id: 9100 + index,
                title: { ky: "Сумка", ru: "Сумка", en: "Sports bag" }[lang],
                price: "1500",
                sizes: ["Standard"],
                photo,
                hoverPhoto: photo,
                category: "Рюкзаки",
                subCategory: "Mix",
            };
        }),
        ...fromFiles(9200, extraFootballDemBibs, "Футбол", "Форма", {
            ky: "Футболные манежки",
            ru: "Футбольные манежки",
            en: "Football bibs",
        }, lang, "300", ["M", "XL", "3XL"]),
        ...fromFiles(9210, extraFootballGoalkeeperKits, "Футбол", "Форма", {
            ky: "Вратарская форма",
            ru: "Вратарская форма",
            en: "Goalkeeper kit",
        }, lang, "1500", ["2XS", "XS", "S", "M", "L", "XL", "2XL", "3XL"]),
    ];
}

export const extraCatalog = {
    ky: buildExtraCatalog("ky"),
    ru: buildExtraCatalog("ru"),
    en: buildExtraCatalog("en"),
};
