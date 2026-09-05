// data/fitnessData.ts

const fitnessImageFiles = [
    1, 3, 4, 5, 45, 8, 9, 10, 11, 46, 47, 51, 6,
    20, 21, 23, 24, 25, 26, 27, 28, 29, 30,
    31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 15, 12, 13, 48, 49, 14, 52, 53, 54, 55,
    56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
    97, 73, 74, 75, 76, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89,
    90, 91, 92, 93, 94, 95, 96, 72, 98, 99, 100,
    101, 102, 103, 104, 105, 106, 109, 110,
    112, 113, 114, 115, 116, 117, 118, 119
];

const fitnessItemsConfig: { [key: number]: { title: { ky: string, ru: string, en: string }, price: string } } = {
    1: { title: { ky: "Липучкалуу тизе бандажы (наколенник)", ru: "Бандаж для колен с липучкой (наколенник)", en: "Knee Brace with Velcro" }, price: "600" },
    3: { title: { ky: "Чыканак бандажы", ru: "Бандаж для локтя", en: "Elbow Support" }, price: "500" },
    4: { title: { ky: "Манжа бандажы", ru: "Бандаж для пальца", en: "Finger Splint" }, price: "1000" },
    5: { title: { ky: "Тизе бандажы (наколенниктер)", ru: "Бандаж для колен (наколенники)", en: "Knee Pads" }, price: "250" },
    6: { title: { ky: "Болгар мүшөгү 20кг", ru: "Болгарский мешок 20кг", en: "Bulgarian Bag 20kg" }, price: "8500" },
    8: { title: { ky: "Болгар мүшөгү", ru: "Болгарский мешок", en: "Bulgarian Bag" }, price: "4500" },
    9: { title: { ky: "Болгар мүшөгү", ru: "Болгарский мешок", en: "Bulgarian Bag" }, price: "7000" },
    10: { title: { ky: "Болгар мүшөгү", ru: "Болгарский мешок", en: "Bulgarian Bag" }, price: "8500" },
    11: { title: { ky: "Болгар мүшөгү", ru: "Болгарский мешок", en: "Bulgarian Bag" }, price: "10000" },
    12: { title: { ky: "Массаждык фитбол (Өлчөмдөрү 65д-75д-85д)", ru: "Фитбол массажный Размеры 65д-75д-85д", en: "Massage Exercise Ball (Sizes 65-75-85cm)" }, price: "1000" },
    13: { title: { ky: "Фитбол (Өлчөмдөрү 65д-75д-85д)", ru: "Фитбол Размеры 65д-75д-85д", en: "Exercise Ball (Sizes 65-75-85cm)" }, price: "1000" },
    14: { title: { ky: "Былгаары футы", ru: "Футы кожаные", en: "Leather Foot Guards" }, price: "1800" },
    15: { title: { ky: "Тик рефлекс грушасы (перчаткалар менен)", ru: "Напольная рефлекс-груша (с перчатками)", en: "Freestanding reflex bag (with gloves)" }, price: "2000" },
    20: { title: { ky: "Болгар мүшөгү 3кг", ru: "Болгарский мешок 3кг", en: "Bulgarian Bag 3kg" }, price: "3500" },
    21: { title: { ky: "Болгар мүшөгү 10кг", ru: "Болгарский мешок 10кг", en: "Bulgarian Bag 10kg" }, price: "5500" },
    23: { title: { ky: "Медбол", ru: "Медбол", en: "Medicine Ball" }, price: "3000" },
    24: { title: { ky: "Медбол", ru: "Медбол", en: "Medicine Ball" }, price: "3500" },
    25: { title: { ky: "Медбол", ru: "Медбол", en: "Medicine Ball" }, price: "4300" },
    26: { title: { ky: "Медбол", ru: "Медбол", en: "Medicine Ball" }, price: "5000" },
    27: { title: { ky: "Медбол", ru: "Медбол", en: "Medicine Ball" }, price: "6000" },
    28: { title: { ky: "SUNLIN массаждык обручу", ru: "Обруч массажный SUNLIN", en: "Massage Hula Hoop SUNLIN" }, price: "2500" },
    29: { title: { ky: "Массаждык обруч", ru: "Обруч массажный", en: "Massage Hula Hoop" }, price: "1000" },
    30: { title: { ky: "Оригинал секундомер", ru: "Секундомер оригинал", en: "Original Stopwatch" }, price: "1000" },
    31: { title: { ky: "Бүтүн жгут, туурасы 4.5см", ru: "Жгут цельный ширина 4.5см", en: "Solid Resistance Band, Width 4.5cm" }, price: "1000" },
    32: { title: { ky: "Бүтүн жгут, туурасы 3.2 см", ru: "Жгут цельный ширина 3.2 см", en: "Solid Resistance Band, Width 3.2cm" }, price: "800" },
    33: { title: { ky: "Бүтүн жгут, туурасы 2.1 см", ru: "Жгут цельный ширина 2.1 см", en: "Solid Resistance Band, Width 2.1cm" }, price: "600" },
    34: { title: { ky: "Билек эспандери", ru: "Эспандер для кисти", en: "Hand Grip Strengthener" }, price: "500" },
    35: { title: { ky: "Трос секиргич", ru: "Скакалка трос", en: "Steel Cable Jump Rope" }, price: "200" },
    36: { title: { ky: "Счетчиги бар гел секиргич", ru: "Скакалка гелевая со счетчиком", en: "Gel Jump Rope with Counter" }, price: "500" },
    37: { title: { ky: "Счетчиги бар гел секиргич", ru: "Скакалка гелевая со счетчиком", en: "Gel Jump Rope with Counter" }, price: "500" },
    38: { title: { ky: "Секиргич", ru: "Скакалка", en: "Jump Rope" }, price: "350" },
    39: { title: { ky: "Секиргич", ru: "Скакалка", en: "Jump Rope" }, price: "350" },
    40: { title: { ky: "Профессионал трос секиргич", ru: "Скакалка трос профессиональный", en: "Professional Steel Cable Jump Rope" }, price: "1000" },
    41: { title: { ky: "Профессионал трос секиргич", ru: "Скакалка трос профессиональный", en: "Professional Steel Cable Jump Rope" }, price: "1000" },
    42: { title: { ky: "Профессионал трос секиргич", ru: "Скакалка трос профессиональный", en: "Professional Steel Cable Jump Rope" }, price: "1000" },
    45: { title: { ky: "Спицалуу таман бандажы", ru: "Бандаж для голеностопа со спицей", en: "Ankle Brace with Side Stays" }, price: "800" },
    46: { title: { ky: "Билек бандажы", ru: "Бандаж для кисти", en: "Wrist Support" }, price: "250" },
    47: { title: { ky: "Тизе бандажы (наколенник)", ru: "Бандаж для колена (наколенники)", en: "Knee Brace" }, price: "300" },
    48: { title: { ky: "Массаждык кирпи", ru: "Ежик массажный", en: "Massage Hedgehog Ball" }, price: "500" },
    49: { title: { ky: "30см массаждык валиктер", ru: "Валики для массажа 30см", en: "Massage Foam Roller 30cm" }, price: "800" },
    51: { title: { ky: "Тизе бандажы (наколенник)", ru: "Бандаж для колен (наколенники)", en: "Knee Pads" }, price: "250" },
    52: { title: { ky: "Кабы менен DIAMOND ракеткасы (D1)", ru: "Ракетка с чехлом DIAMOND (D1)", en: "DIAMOND Racket with Cover (D1)" }, price: "1100" },
    53: { title: { ky: "Кабы менен DIAMOND ракеткасы (D2)", ru: "Ракетка с чехлом DIAMOND (D2)", en: "DIAMOND Racket with Cover (D2)" }, price: "1300" },
    54: { title: { ky: "Кабы менен DIAMOND ракеткасы (D3)", ru: "Ракетка с чехлом DIAMOND (D3)", en: "DIAMOND Racket with Cover (D3)" }, price: "1700" },
    55: { title: { ky: "Кабы менен DIAMOND ракеткасы (D4)", ru: "Ракетка с чехлом DIAMOND (D4)", en: "DIAMOND Racket with Cover (D4)" }, price: "2000" },
    56: { title: { ky: "Кабы менен DIAMOND ракеткасы (D5)", ru: "Ракетка с чехлом DIAMOND (D5)", en: "DIAMOND Racket with Cover (D5)" }, price: "2200" },
    57: { title: { ky: "Кабы менен DIAMOND ракеткасы (D6)", ru: "Ракетка с чехлом DIAMOND (D6)", en: "DIAMOND Racket with Cover (D6)" }, price: "2500" },
    58: { title: { ky: "Кабы менен DIAMOND ракеткасы (D7)", ru: "Ракетка с чехлом DIAMOND (D7)", en: "DIAMOND Racket with Cover (D7)" }, price: "3000" },
    59: { title: { ky: "Кабы менен DIAMOND ракеткасы (D9)", ru: "Ракетка с чехлом DIAMOND (D9)", en: "DIAMOND Racket with Cover (D9)" }, price: "4000" },
    60: { title: { ky: "Үч тобу бар DOUBLE FISH ракеткасы", ru: "DOUBLE FISH Ракетки с тремя шариками", en: "DOUBLE FISH Racket with Three Balls" }, price: "800" },
    61: { title: { ky: "Үч тобу бар DOUBLE FISH ракеткасы", ru: "DOUBLE FISH Ракетки с тремя шариками", en: "DOUBLE FISH Racket with Three Balls" }, price: "1200" },
    62: { title: { ky: "Манжа эспандери", ru: "Эспандер для пальцев", en: "Finger Exerciser" }, price: "300" },
    63: { title: { ky: "Көнгө салынуучу эспандер 5кг-60кг", ru: "Эспандер регулируемый с 5кг-60кг", en: "Adjustable Hand Grip 5kg-60kg" }, price: "500" },
    64: { title: { ky: "Металл эспандер", ru: "Эспандер металлический", en: "Metal Hand Grip" }, price: "100" },
    65: { title: { ky: "Көнгө салынуучу эспандер 5кг-100кг", ru: "Эспандер регулируемый с 5кг-100кг", en: "Adjustable Hand Grip 5kg-100kg" }, price: "750" },
    66: { title: { ky: "Гимнастикалык пресс ролиги", ru: "Гимнастический ролик для пресса", en: "Abdominal Exercise Roller" }, price: "500" },
    67: { title: { ky: "Подшипникти гимнастикалык пресс ролиги", ru: "Гимнастический ролик для пресса с подшипником", en: "Ab Roller with Bearing" }, price: "1200" },
    68: { title: { ky: "Эки дөңгөлөктүү подшипникти гимнастикалык пресс ролиги", ru: "Гимнастический ролик для пресса с подшипником двухколесный", en: "Dual-Wheel Ab Roller with Bearing" }, price: "1500" },
    69: { title: { ky: "HEATOUTFIT весагонка (салмак таштоочу костюм)", ru: "Весагонка HEATOUTFIT (Весагоночный костюм)", en: "HEATOUTFIT Sauna Suit for Weight Loss" }, price: "3000" },
    70: { title: { ky: "Весагонка (салмак таштоочу костюм)", ru: "Весагонка (весагоночный костюм)", en: "Sauna Suit for Weight Loss" }, price: "2000" },
    72: { title: { ky: "Балдар секиргичи", ru: "Скакалка детская", en: "Kids Jump Rope" }, price: "100" },
    73: { title: { ky: "Бел бандажы", ru: "Бандаж для спины", en: "Back Support Belt" }, price: "800" },
    74: { title: { ky: "Ийин бандажы", ru: "Бандаж для плеча", en: "Shoulder Support Brace" }, price: "1200" },
    75: { title: { ky: "Утяжелитель 2кг", ru: "Утяжелители 2кг", en: "Ankle/Wrist Weights 2kg" }, price: "900" },
    76: { title: { ky: "Файт Болл (бокс тобу)", ru: "Файт Болл (бокс мяч)", en: "Fight Ball (Boxing Reflex Ball)" }, price: "250" },
    78: { title: { ky: "Үч тобу бар ракетка", ru: "Ракетка с тремя шариками", en: "Racket with Three Balls" }, price: "650" },
    79: { title: { ky: "Үч тобу бар ракетка", ru: "Ракетка с тремя шариками", en: "Racket with Three Balls" }, price: "350" },
    80: { title: { ky: "Үч тобу бар ракетка", ru: "Ракетка с тремя шариками", en: "Racket with Three Balls" }, price: "350" },
    81: { title: { ky: "Үстөл теннисинин топтору", ru: "Шарики для настольного тенниса", en: "Table Tennis Balls" }, price: "30" },
    82: { title: { ky: "Бадминтон үчүн канатча (воланчик)", ru: "Воланчик для бадминтона", en: "Badminton Shuttlecock" }, price: "100" },
    83: { title: { ky: "Теннис тобу", ru: "Мяч для тенниса", en: "Tennis Ball" }, price: "100" },
    84: { title: { ky: "Манжа эспандери", ru: "Эспандер для пальцев", en: "Finger Exerciser" }, price: "100" },
    85: { title: { ky: "Манжа эспандери", ru: "Эспандер для пальцев", en: "Finger Exerciser" }, price: "350" },
    86: { title: { ky: "Медалдар (даанасынын баасы)", ru: "Медали (цена за штуку)", en: "Medals (Price per piece)" }, price: "250" },
    87: { title: { ky: "Шахмат үчүн секундомер", ru: "Секундомер для шахмат", en: "Chess Clock" }, price: "2000" },
    88: { title: { ky: "Шахмат үчүн секундомер", ru: "Секундомер для шахмат", en: "Chess Clock" }, price: "2800" },
    89: { title: { ky: "Машыгуу үчүн велопедаль", ru: "Велопедаль для тренировок", en: "Mini Exercise Bike / Peddler" }, price: "3500" },
    90: { title: { ky: "Турник үчүн илгич", ru: "Крючки для турника", en: "Pull-up Lifting Straps / Hooks" }, price: "1000" },
    91: { title: { ky: "Бут үчүн илгич", ru: "Крючки для ног (гравитационные ботинки)", en: "Gravity Boots / Foot Hooks" }, price: "4000" },
    92: { title: { ky: "Массаждык килемче", ru: "Массажный коврик", en: "Acupressure Massage Mat" }, price: "800" },
    93: { title: { ky: "Теннис торчосу", ru: "Теннисная сетка", en: "Tennis Net" }, price: "3000" },
    94: { title: { ky: "Теннис үчүн тор", ru: "Сетка для тенниса", en: "Tennis Net" }, price: "750" },
    95: { title: { ky: "Груша 4ү1", ru: "Груша 4в1", en: "Punching Bag 4 in 1" }, price: "12000" },
    96: { title: { ky: "Реакциялык груша", ru: "Груша для реакции", en: "Reflex Punching Ball" }, price: "8500" },
    97: { title: { ky: "Май күйгүзүүчү бел боо", ru: "Жиросжигающий пояс", en: "Fat Burning Waist Trimmer Belt" }, price: "800" },
    98: { title: { ky: "Билек бандажы", ru: "Бандаж для кисти", en: "Wrist Wrap" }, price: "150" },
    99: { title: { ky: "Жарым тегерек жгут, калыңдыгы 1.4", ru: "Жгут круглый, толщина 1.4", en: "Round Resistance Band, Thickness 1.4" }, price: "200" },
    100: { title: { ky: "Автоматтык түрдө кайтуучу гимнастикалык пресс ролиги", ru: "Гимнастический ролик для пресса с автовозвратом", en: "Automatic Rebound Ab Roller" }, price: "1800" },
    101: { title: { ky: "Шахмат 3ү1", ru: "Шахматы 3в1", en: "3 in 1 Chess Set" }, price: "2000" },
    102: { title: { ky: "Шахмат 3ү1", ru: "Шахматы 3в1", en: "3 in 1 Chess Set" }, price: "1500" },
    103: { title: { ky: "Шахмат", ru: "Шахматы", en: "Chess Set" }, price: "350" },
    104: { title: { ky: "Бадминтон", ru: "Бадминтон", en: "Badminton Set" }, price: "2200" },
    105: { title: { ky: "Тейп лентасы", ru: "Тейп кинезиологический", en: "Kinesiology Tape" }, price: "500" },
    106: { title: { ky: "Счетчиги бар гел секиргич", ru: "Скакалка гелевая со счетчиком", en: "Gel Jump Rope with Counter" }, price: "500" },
    109: { title: { ky: "Секиргич", ru: "Скакалка", en: "Jump Rope" }, price: "350" },
    110: { title: { ky: "Профессионал трос секиргич", ru: "Скакалка трос профессиональный", en: "Professional Steel Cable Jump Rope" }, price: "1000" },
    112: { title: { ky: "Түтүкчөсү бар шейкерлер 0.750л", ru: "Шейкеры с трубочкой 0.750л", en: "Shaker Bottle with Straw 0.750L" }, price: "350" },
    113: { title: { ky: "Түтүкчөсү бар шейкерлер 0.750л", ru: "Шейкеры с трубочкой 0.750л", en: "Shaker Bottle with Straw 0.750L" }, price: "350" },
    114: { title: { ky: "Миксери бар POWER шейкери 0.5л", ru: "Шейкер POWER с миксером 0.5л", en: "POWER Shaker Bottle with Mixer 0.5L" }, price: "500" },
    115: { title: { ky: "MET-RX шейкери 0.450мл", ru: "Шейкер MET-RX 0.450мл", en: "MET-RX Shaker Bottle 0.450L" }, price: "500" },
    116: { title: { ky: "Шахмат 3ү1 (Intellect Games)", ru: "Шахматы 3в1 (Intellect Games)", en: "3 in 1 Chess Set (Intellect Games)" }, price: "2000" },
    117: { title: { ky: "Билек/кол эспандери (пружиналуу)", ru: "Эспандер для кисти и предплечья", en: "Wrist / forearm power twister" }, price: "1000" },
    118: { title: { ky: "Салмак үчүн бел боо", ru: "Пояс для отягощений", en: "Weightlifting dip belt" }, price: "1500" },
    119: { title: { ky: "Весагонка (салмак таштоочу костюм)", ru: "Весагонка (весагоночный костюм)", en: "Sauna Suit for Weight Loss" }, price: "2000" },
};

export const generateFitnessItems = (startId: any, langParam: any): any => {
    let lang: 'ky' | 'ru' | 'en' = 'ky';

    if (typeof langParam === 'string' && ['ky', 'ru', 'en'].includes(langParam.toLowerCase())) {
        lang = langParam.toLowerCase() as 'ky' | 'ru' | 'en';
    } else if (typeof langParam === 'object' && langParam !== null) {
        const val = langParam.lang || langParam.current || langParam.value;
        if (typeof val === 'string' && ['ky', 'ru', 'en'].includes(val.toLowerCase())) {
            lang = val.toLowerCase() as 'ky' | 'ru' | 'en';
        }
    }

    // Одинаковые/похожие товары → одна карточка с галереей (photo + hoverPhoto).
    // Дубликаты и доп. ракурсы не выводятся отдельными карточками.
    const hoverByFile: Record<number, number> = {
        36: 37, // гелевая скакалка со счетчиком (цвета)
        38: 39, // сегментная скакалка (цвета)
        40: 41, // трос-скакалка проф. (цвета)
        70: 119, // весагонка + деталь молнии
        79: 80, // ракетка с 3 шариками (одинаковая цена)
        101: 116, // шахматы 3в1 (похожие наборы)
        112: 113, // шейкеры 0.75л
    };
    const hoverPathByFile: Record<number, string> = {
        15: "/catalog/fitnes/grusha/photo_5454249707761768302_y.jpg",
        95: "/catalog/fitnes/grusha/photo_5426881214078983057_y.jpg",
        96: "/catalog/fitnes/grusha/photo_5426881214078983058_y.jpg",
    };
    const skipAsHoverOnly = new Set<number>([
        37, 39, 41, 42, 80, 106, 109, 110, 113, 116, 119,
    ]);

    const items: any[] = [];
    fitnessImageFiles.forEach((fileNum: any) => {
        if (skipAsHoverOnly.has(fileNum)) return;

        const photoPath = `/catalog/fitnes/acsessuar/${fileNum}.jpg`;
        const hoverNum = hoverByFile[fileNum];
        const hoverPhoto =
            hoverPathByFile[fileNum] ||
            (hoverNum && hoverNum !== fileNum
                ? `/catalog/fitnes/acsessuar/${hoverNum}.jpg`
                : photoPath);

        const itemConfig = (fitnessItemsConfig as Record<number, any>)[fileNum];

        const titleText = itemConfig && itemConfig.title
            ? (itemConfig.title[lang] || itemConfig.title['ru'] || itemConfig.title['ky'])
            : (lang === 'en' ? "Fitness accessory" : lang === 'ky' ? "Фитнес аксессуарлары" : "Фитнес аксессуар");

        const priceValue = itemConfig && itemConfig.price && itemConfig.price !== "" ? itemConfig.price : "";

        const titleRu = itemConfig?.title?.ru || "";
        const titleEn = itemConfig?.title?.en || "";
        const titleAll = `${titleText} ${titleRu} ${titleEn}`;
        // Суроттогу оор топтомдор / медбол / болгар мүшөк → Gym Гантель
        const gymGantelExtraFiles = new Set([6, 8, 9, 10, 11, 20, 21, 23, 24, 25, 26, 27]);
        const isDumbbell =
            (/гантель|dumbbell|болгар|bulgarian bag/i.test(titleAll) &&
                !/лямка|strap|повязк|фиксатор|перчатк|glove/i.test(titleAll)) ||
            gymGantelExtraFiles.has(fileNum);
        const isPunchingBag = /груша|punching bag|reflex bag|punching dummy/i.test(titleAll)
            && !/болгар/i.test(titleAll);

        items.push({
            id: startId + items.length,
            title: titleText,
            price: priceValue,
            sizes: ["Standard"],
            photo: photoPath,
            hoverPhoto,
            category: "Фитнес, Домашний спорт",
            subCategory: isDumbbell ? "Гантели" : isPunchingBag ? "GYM" : "Аксессуары",
            openModal: true,
            photoFit: "contain" as const,
        });
    });

    return items;
};

// Түздөн-түз export кылуу үчүн объекттер (WholesalePage ичинде туура чакырылышы үчүн)
export const fitnessData = {
    ky: generateFitnessItems(5000, 'ky'),
    ru: generateFitnessItems(5000, 'ru'),
    en: generateFitnessItems(5000, 'en')
};