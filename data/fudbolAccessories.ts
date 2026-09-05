/**
 * Футбол аксессуарлары
 *
 * Аталышын жана бааны өзгөртүү үчүн төмөнкү массивдеги тиешелүү объектти табыңыз:
 *   file  — public/catalog/fudbol/acsesuar/ ичиндеги файлдын аты (колдонбоңуз)
 *   title — ky / ru / en аталыштары
 *   price — сом менен (бош сап "" же "0" = «баасы суроо боюнча»)
 *   sizes — өлчөмдөр (жоокер болсо ["Стандарт"] калат)
 */

export type Lang = 'ky' | 'ru' | 'en';

export interface AccessoryConfig {
    file: string;
    title: { ky: string; ru: string; en: string };
    price: string;
    sizes?: string[];
}

const IMG = '/catalog/fudbol/acsesuar';

export const fudbolAccessoryItems: AccessoryConfig[] = [
    // ——— Машыгуу фишкалары / конустар ———
    { file: 'photo3.jpg', title: { ky: 'Сары машыгуу конустары, бийиктиги 40 см (чарчы таманы менен)', ru: 'Жёлтые тренировочные конусы высота(40см) (с квадратным основанием)', en: 'Yellow training cones, height 40 cm (square base)' }, price: '300' },
    { file: 'photo4.jpg', title: { ky: 'Кызгылт сары тешиктүү конустар, бийиктиги 50 см (таякча үчүн)', ru: 'Оранжевые конусы с отверстиями высота(50см) (под штангу)', en: 'Orange perforated cones, height 50 cm (for poles)' }, price: '450' },
    { file: 'photo5.jpg', title: { ky: 'Сары тешиктүү конустар, бийиктиги 30 см (таякча үчүн)', ru: 'Жёлтые конусы с отверстиями высота(30см) (под штангу)', en: 'Yellow perforated cones, height 30 cm (for poles)' }, price: '300' },
    { file: 'photo6.jpg', title: { ky: 'Машыгуу конустары, бийиктиги 32 см (кызгылт сары жана жашыл)', ru: 'Тренировочные конусы высота(32см) (оранжевый и зелёный)', en: 'Training cones, height 32 cm (orange and green)' }, price: '250' },
    { file: 'fishki krugl.jpg', title: { ky: 'Машыгуу фишкалары (1 даана)', ru: 'Тренировочные фишки (1 шт)', en: 'Training markers (1 pc)' }, price: '35' },
    { file: 'fishki kvadrat.jpg', title: { ky: 'Машыгуу фишкалары (1 даана)', ru: 'Тренировочные фишки (1 шт)', en: 'Training markers (1 pc)' }, price: '50' },
    { file: 'fishki futzal.jpg', title: { ky: 'Футзал үчүн жалпак дисктер (3 түс)', ru: 'Плоские диски для футзала (3 цвета)', en: 'Flat futsal markers (3 colours)' }, price: '50' },
    // ——— Суу бөтөлкөлөрү / шейкерлер ———
    { file: 'photo7.jpg', title: { ky: 'Nike спорттук суу бөтөлкөсү (5 түс)', ru: 'Спортивная бутылка Nike (5 цветов)', en: 'Nike sports water bottle (5 colours)' }, price: '500' },
    { file: 'photo8.jpg', title: { ky: 'Nike спорттук бөтөлкө (6 түс)', ru: 'Спортивная бутылка Nike (6 цветов)', en: 'Nike sports bottle (6 colours)' }, price: '500' },
    { file: 'photo9.jpg', title: { ky: 'CASNO футболчулар бөтөлкөсү (Messi, Ronaldo, Neymar)', ru: 'Бутылка CASNO с футболистами (Messi, Ronaldo, Neymar)', en: 'CASNO footballer bottle (Messi, Ronaldo, Neymar)' }, price: '500' },
    { file: 'photo10.jpg', title: { ky: 'Sport суу бөтөлкөсү, түтүкчөсү менен (4 түс)', ru: 'Бутылка Sport с трубочкой (4 цвета)', en: 'Sport bottle with straw (4 colours)' }, price: '350' },
    { file: 'photo11.jpg', title: { ky: 'DNS суу бөтөлкөсү 750 мл (4 түс)', ru: 'Бутылка DNS 750 мл (4 цвета)', en: 'DNS water bottle 750 ml (4 colours)' }, price: '350' },
    { file: 'photo12.jpg', title: { ky: 'Fanks Power шейкери (3 түс)', ru: 'Шейкер Fanks Power (3 цвета)', en: 'Fanks Power shaker (3 colours)' }, price: '500' },
    { file: 'photo13.jpg', title: { ky: 'MET-Rx шейкери, кошумча бөлүмү менен', ru: 'Шейкер MET-Rx с доп. отсеком', en: 'MET-Rx shaker with storage compartment' }, price: '500' },
    { file: 'photo14.jpg', title: { ky: 'Everlast спорттук шейкери (3 түс)', ru: 'Спортивный шейкер Everlast (3 цвета)', en: 'Everlast sports shaker (3 colours)' }, price: '350' },
    { file: 'photo15.jpg', title: { ky: 'JBie CUP чоң суу бөтөлкөсү (туткалуу)', ru: 'Большая бутылка JBie CUP с ручкой', en: 'JBie CUP large bottle with handle' }, price: '1000' },
    { file: 'photo36.jpg', title: { ky: 'Буктөлмө  бөтөлкө «Футбол тобу»', ru: 'Складная  бутылка «Футбольный мяч»', en: 'Collapsible  bottle “Football”' }, price: '500' },
    { file: 'photo68.jpg', title: { ky: 'Командалык бөтөлкө топтому (ташуучусу менен)', ru: 'Командный набор бутылок с переноской', en: 'Team bottle set with carrier' }, price: '1500' },
    { file: 'photo69.jpg', title: { ky: '12 орундуу бүктөлмө бөтөлкө ташуучу', ru: 'Складной держатель на 12 бутылок', en: 'Foldable carrier for 12 bottles' }, price: '1500' },

    // ——— Координация / ылдамдык ———
    { file: 'photo16.jpg', title: { ky: 'Координациялык шакектер (баштыгы менен)', ru: 'Координационные кольца (с сумкой)', en: 'Agility rings (with bag)' }, price: '200' },
    { file: 'photo17.jpg', title: { ky: 'Ылдамдык тоскоолдуктары (кызгылт сары)', ru: 'Скоростные барьеры (оранжевые)', en: 'Speed agility hurdles (orange)' }, price: '400' },
    { file: 'photo18.jpg', title: { ky: 'Бийиктиги ар түрдүү машыгуу тоскоолдуктары', ru: 'Тренировочные барьеры разной высоты', en: 'Training hurdles, mixed heights' }, price: '1800' },
    { file: 'photo19.jpg', title: { ky: 'Машыгуу таякчалары (саргылт жана кызыл)', ru: 'Тренировочные шесты (жёлтые и красные)', en: 'Agility poles (yellow and red)' }, price: '250' },
    { file: 'photo35.jpg', title: { ky: 'Сфералык машыгуу маркерлери (сары / кызыл)', ru: 'Сферические маркеры (жёлтый / красный)', en: 'Spherical training markers (yellow / red)' }, price: '300' },

    // ——— Гетри, байпак, калканчылар ———
    { file: 'photo20.jpg', title: { ky: 'DEM щитки жеңдери (кара, ак, кызыл, көк)', ru: 'Рукава для щитков DEM (чёрный, белый, красный, синий)', en: 'DEM shin-guard sleeves (black, white, red, blue)' }, price: '200' },
    { file: 'photo21.jpg', title: { ky: 'Футбол гетрилери SPORT (7 түс)', ru: 'Футбольные гетры SPORT (7 цветов)', en: 'SPORT football socks (7 colours)' }, price: '200', sizes: ['34–38', '39–42', '43–46'] },
    { file: 'photo22.jpg', title: { ky: 'Кесилген футбол гетрилери (4 түс)', ru: 'Обрезанные футбольные гетры (4 цвета)', en: 'Cut-off football sock sleeves (4 colours)' }, price: '200',sizes: ['M','L'] },
    { file: 'photo23.jpg', title: { ky: 'Антислип футбол байпактары (көк, ак, кара)', ru: 'Футбольные носки с антислипом (синий, белый, чёрный)', en: 'Anti-slip football grip socks (blue, white, black)' }, price: '300', sizes: ['S', 'M', 'L'] },
    { file: 'photo24.jpg', title: { ky: 'DEM футбол гетрилери (көп түс)', ru: 'Футбольные гетры DEM (разные цвета)', en: 'DEM football socks (assorted colours)' }, price: '200', sizes: ['34–38', '39–42', '43–46'] },
    { file: 'photo25.jpg', title: { ky: 'Клубдук щиткилер (Арсенал, Барселона, Реал жана башкалар)', ru: 'Клубные щитки (Арсенал, Барселона, Реал и др.)', en: 'Club shin guards (Arsenal, Barcelona, Real and more)' }, price: '300' },
    { file: 'photo26.jpg', title: { ky: 'Щитки SCORE A GOAL (S / L, ар түрдүү түс)', ru: 'Щитки SCORE A GOAL (S / L, разные цвета)', en: 'SCORE A GOAL shin guards (S / L, mixed colours)' }, price: '200', sizes: ['S', 'L'] },
    { file: 'photo27.jpg', title: { ky: 'DEM щиткилери, өлчөмү S (5 түс)', ru: 'Щитки DEM, размер S (5 цветов)', en: 'DEM shin guards, size S (5 colours)' }, price: '200', sizes: ['S'] },
    { file: 'vstavka.jpg', title: { ky: 'Nike массаждык тамандык', ru: 'Массажная стелька Nike', en: 'Nike massage insole' }, price: '500' },
    { file: 'photo59.jpg', title: { ky: 'Nike / Asics спорт байпактары, 41–48', ru: 'Спортивные носки Nike / Asics, 41–48', en: 'Nike / Asics sports socks, EU 41–48' }, price: '150', sizes: ['41–48'] },

    // ——— Ышкырыктар ———
    { file: 'photo28.jpg', title: { ky: 'Металл калыс ышкырыгы (сары боо менен)', ru: 'Металлический судейский свисток (с жёлтым шнурком)', en: 'Metal referee whistle (yellow lanyard)' }, price: '100' },
    { file: 'photo29.jpg', title: { ky: 'Fox 40 Caul манжага тагылуучу ышкырык', ru: 'Свисток Fox 40 Caul с креплением на пальцы', en: 'Fox 40 Caul fingergrip whistle' }, price: '500' },
    { file: 'photo30.jpg', title: { ky: 'Mikasa BEAT500 FIVB ышкырыгы', ru: 'Свисток Mikasa BEAT500 FIVB', en: 'Mikasa BEAT500 FIVB whistle' }, price: '1000' },
    { file: 'photo31.jpg', title: { ky: 'Nike Pro Neck ышкырыгы (кызгылт сары / кара)', ru: 'Свисток Nike Pro Neck (оранжевый / чёрный)', en: 'Nike Pro Neck whistle (orange / black)' }, price: '1000' },
    { file: 'photo32.jpg', title: { ky: 'ACME A540 калыс ышкырыгы (сары)', ru: 'Судейский свисток ACME A540 (жёлтый)', en: 'ACME A540 referee whistle (yellow)' }, price: '500' },
    { file: 'photo33.jpg', title: { ky: 'Molten Dual Tone / Dolfin F ышкырыктары', ru: 'Свистки Molten Dual Tone / Dolfin F', en: 'Molten Dual Tone / Dolfin F whistles' }, price: '1000' },
    { file: 'photo34.jpg', title: { ky: 'Fox 80 Classic CMG ышкырыгы', ru: 'Свисток Fox 80 Classic CMG', en: 'Fox 80 Classic CMG whistle' }, price: '500' },
    { file: 'gonk.jpg', title: { ky: 'Спорттук пневматикалык горн (сигнал)', ru: 'Спортивный пневматический горн (сигнал)', en: 'Sports air horn / signal horn' }, price: '1500' },

    // ——— Медалдар ———
    { file: 'photo37.jpg', title: { ky: 'Медалдар топтому 1–2–3 орун (1)', ru: 'Набор медалей 1–2–3 место (1шт)', en: 'Medal set 1st–2nd–3rd (1)' }, price: '150' },
    { file: 'photo39.jpg', title: { ky: '«Кыргызстан» медалы (1)', ru: 'Медаль «Кыргызстан» (1шт)', en: 'Kyrgyzstan medal (1)' }, price: '150' },
    { file: 'photo40.jpg', title: { ky: 'Медалдар топтому (лавр гүлчамбары менен)(1)', ru: 'Набор медалей с лавровым венком(1шт)', en: 'Medal set with laurel wreath(1)' }, price: '150' },
    { file: 'photo41.jpg', title: { ky: 'Спорт медалдары (1)', ru: 'Спортивные медали (1шт)', en: 'Sports medals (1)' }, price: '150' },
    { file: 'photo42.jpg', title: { ky: 'Геометриялык дизайндагы медалдар (1)', ru: 'Медали геометрического дизайна (1шт)', en: 'Geometric medals (1)' }, price: '150' },
    { file: 'photo43.jpg', title: { ky: 'Волейбол медалдары (1)', ru: 'Медали по волейболу (1шт)', en: 'Volleyball medals (1)' }, price: '250' },
    { file: 'photo44.jpg', title: { ky: 'Кыргызстан герби менен медалдар (1)', ru: 'Медали с гербом Кыргызстана (1шт)', en: 'Medals with Kyrgyzstan emblem (1)' }, price: '250' },
    { file: 'photo45.jpg', title: { ky: 'Медалдар/ Place» (Кыргызстан)', ru: 'Медали / Place (Кыргызстан)(1шт)', en: '“Place” medals (Kyrgyzstan)(1)' }, price: '250' },
    { file: 'photo46.jpg', title: { ky: 'GOLD / SILVER / BRONZE медалдары', ru: 'Медали GOLD / SILVER / BRONZE', en: 'GOLD / SILVER / BRONZE medals' }, price: '250' },
    { file: 'photo47.jpg', title: { ky: 'Жети бурчтуу медалдар 1–2–3 орун', ru: 'Семиугольные медали 1–2–3 место', en: 'Heptagon medals 1st–2nd–3rd' }, price: '250' },
    { file: 'photo48.jpg', title: { ky: 'Медалдар 1st / 2nd / 3rd (лавр менен)', ru: 'Медали 1st / 2nd / 3rd (с лавром)', en: '1st / 2nd / 3rd medals with laurel' }, price: '250' },

    // ——— Тактикалык такталар / табло ———
    { file: 'photo49.jpg', title: { ky: 'Тактикалык такта', ru: 'Тактическая доска', en: 'Tactical board' }, price: '1200' },
    { file: 'photo50.jpg', title: { ky: 'Тактикалык такта', ru: 'Тактическая доска', en: 'Tactical board' }, price: '1200' },
    { file: 'photo51.jpg', title: { ky: 'Тактикалык такта', ru: 'Тактическая доска', en: 'Tactical board' }, price: '1200' },
    { file: 'photo52.jpg', title: { ky: 'SPORTIC санариптик тактикалык такта', ru: 'Цифровая тактическая доска SPORTIC', en: 'SPORTIC digital tactic board' }, price: '2000' },
    { file: 'photo64.jpg', title: { ky: 'Тактикалык такта', ru: 'Тактическая доска', en: 'Tactical board' }, price: '1200' },
    { file: 'tablo.jpg', title: { ky: 'Оюнчуларды алмаштыруу тактасы (IN / OUT)', ru: 'Табло замены игроков (IN / OUT)', en: 'Player substitution board (IN / OUT)' }, price: '3000' },
    { file: 'photo60.jpg', title: { ky: 'Үстөл таблосу (кызыл / көк упай)', ru: 'Настольное табло (красный / синий счёт)', en: 'Tabletop scoreboard (red / blue score)' }, price: '1500' },
    { file: 'photo61.jpg', title: { ky: 'Спорт таблосу 40×60', ru: 'Спортивное табло 40×60', en: 'Sports scoreboard 40×60' }, price: '2500' },
    { file: 'photo62.jpg', title: { ky: 'Mikasa колго бүктөлүүчү табло', ru: 'Перекидное табло Mikasa', en: 'Mikasa manual flip scoreboard' }, price: '5000' },

    // ——— Торлор ———
    { file: 'photo53.jpg', title: { ky: 'Футбол тору №5 (көк баштыкта)', ru: 'Футбольная сетка №5 (в синей сумке)', en: 'Football net No. 5 (blue bag)' }, price: '5000' },
    { file: 'photo56.jpg', title: { ky: 'Футбол тору №11 (жашыл баштыкта)', ru: 'Футбольная сетка №11 (в зелёной сумке)', en: 'Football net No. 11 (green bag)' }, price: '8000' },
    { file: 'photo57.jpg', title: { ky: 'Футбол тору №7 (көк баштыкта)', ru: 'Футбольная сетка №7 (в синей сумке)', en: 'Football net No. 7 (blue bag)' }, price: '4500' },
    { file: 'photo58.jpg', title: { ky: 'Футбол тору №11 (көк баштыкта)', ru: 'Футбольная сетка №11 (в синей сумке)', en: 'Football net No. 11 (blue bag)' }, price: '7000' },

    // ——— Кубоктор / статуэткалар ———
    { file: 'photo70.jpg', title: { ky: 'Алтын статуэтка «Футболчу топ менен»', ru: 'Золотая статуэтка «Футболист с мячом»', en: 'Gold figurine “Player with ball”' }, price: '350' },
    { file: 'photo71.jpg', title: { ky: 'Алтын статуэтка «Сокку уруучу»', ru: 'Золотая статуэтка «Удар по мячу»', en: 'Gold figurine “Striker”' }, price: '350' },
    { file: 'photo72.jpg', title: { ky: 'Алтын статуэтка «Дарбазачы»', ru: 'Золотая статуэтка «Вратарь»', en: 'Gold figurine “Goalkeeper”' }, price: '1500' },
    { file: 'photo73.jpg', title: { ky: 'Алтын кубок «Бутса жана топ»', ru: 'Золотой кубок «Бутса и мяч»', en: 'Gold trophy “Boot and ball”' }, price: '1500' },
    { file: 'photo74.jpg', title: { ky: 'Алтын кубок (кызыл лента менен)', ru: 'Золотой кубок с красной лентой', en: 'Gold cup with red ribbon' }, price: '1500' },
    { file: 'photo75.jpg', title: { ky: 'Кубок «Алтын кол кап» (дарбазачы)', ru: 'Кубок «Золотая перчатка» (вратарь)', en: '“Golden Glove” trophy' }, price: '2500' },
    { file: 'photo76.jpg', title: { ky: 'Чоң алтын кубок (капкагы жана ленталары менен)', ru: 'Большой золотой кубок (с крышкой и лентами)', en: 'Large gold cup (lid and ribbons)' }, price: '3200' },
    { file: 'photo78.jpg', title: { ky: 'Күмүш чемпиондук кубок (ленталары менен)', ru: 'Серебряный чемпионский кубок с лентами', en: 'Silver championship cup with ribbons' }, price: '3200' },
    { file: 'photo79.jpg', title: { ky: 'Алтын кубок (капкагы менен)', ru: 'Золотой кубок с крышкой', en: 'Gold cup with lid' }, price: '3200' },
    { file: 'photo82.jpg', title: { ky: 'Алтын кубок, таажы капкагы менен', ru: 'Золотой кубок с корончатой крышкой', en: 'Gold cup with crown lid' }, price: '5500' },
    { file: 'photo83.jpg', title: { ky: 'Көп деңгээлдүү алтын кубок (бүркүт менен)', ru: 'Многоуровневый золотой кубок с орлом', en: 'Multi-tier gold trophy with eagle' }, price: '7500' },
    { file: 'photo85.jpg', title: { ky: 'Көп мамылуу алтын кубок, бийиктиги 100 см', ru: 'Многостоечный золотой кубок, высота 100 см', en: 'Multi-pillar gold cup, height 100 cm' }, price: '10000' },
    { file: 'goalkeeper-spray.png', title: { ky: 'Дарбазачы спрейи', ru: 'Спрей для вратаря', en: 'Goalkeeper glove tackifier spray' }, price: '600' },
];

const getPrice = (priceKGS: number, lang: Lang) => {
    const exchangeRate = 88;
    if (lang === 'en') {
        return `$${(priceKGS / exchangeRate).toFixed(1)}`;
    }
    return `${priceKGS}`;
};

const categoryByLang: Record<Lang, string> = {
    ky: 'Футбол',
    ru: 'Футбол',
    en: 'Футбол',
};

const subCategoryByLang: Record<Lang, string> = {
    ky: 'Аксессуары',
    ru: 'Аксессуары',
    en: 'Аксессуары',
};

export const generateFudbolAccessories = (startId: number, lang: Lang) => {
    return fudbolAccessoryItems.map((item, index) => {
        const priceValue = item.price && item.price !== '0' ? parseInt(item.price, 10) : 0;
        const formattedPrice =
            priceValue > 0
                ? getPrice(priceValue, lang)
                : lang === 'en'
                  ? 'Price on request'
                  : lang === 'ky'
                    ? 'Баасы суроо боюнча'
                    : 'Цена по запросу';

        const photoPath = `${IMG}/${encodeURIComponent(item.file)}`;

        return {
            id: startId + index,
            title: item.title[lang] || item.title.ru,
            price: formattedPrice,
            sizes: item.sizes && item.sizes.length > 0 ? item.sizes : ['Стандарт'],
            photo: photoPath,
            hoverPhoto: photoPath,
            category: categoryByLang[lang],
            subCategory: subCategoryByLang[lang],
        };
    });
};

export const fudbolAccessories = {
    ky: generateFudbolAccessories(7000, 'ky'),
    ru: generateFudbolAccessories(7000, 'ru'),
    en: generateFudbolAccessories(7000, 'en'),
};
