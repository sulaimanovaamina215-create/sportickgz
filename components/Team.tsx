"use client";

import React, { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import Image from "next/image";

type Lang = "ky" | "ru" | "en";

type Localized = Record<Lang, string>;

const founder = {
    photo: "/ourTeam/founder.png",
    name: {
        ky: "Жайчыбеков Талант",
        ru: "Жайчыбеков Талант",
        en: "Talant Zhaychybekov",
    } satisfies Localized,
    role: {
        ky: "SPORTIC KGZ спорт дүкөндөрүнүн жана DEM брендинин негиздөөчүсү",
        ru: "Основатель спортивных магазинов SPORTIC KGZ и бренда DEM",
        en: "Founder of SPORTIC KGZ sports stores and the DEM brand",
    } satisfies Localized,
};

const manager = {
    photo: "/ourTeam/kutman.png",
    name: {
        ky: "Сапыйев Кутман",
        ru: "Сапыйев Кутман",
        en: "Kutman Sapyev",
    } satisfies Localized,
    role: {
        ky: "SPORTIC KGZ филиалынын башкаруучусу",
        ru: "Управляющий филиалом SPORTIC KGZ",
        en: "Branch Manager of SPORTIC KGZ",
    } satisfies Localized,
};

const salesManager = {
    photo: "/ourTeam/elnur.png",
    name: {
        ky: "Нурдин уулу Элнур",
        ru: "Нурдин уулу Элнур",
        en: "Elnur Nurdin uulu",
    } satisfies Localized,
    role: {
        ky: "Онлайн сатуу боюнча менеджер",
        ru: "Менеджер по онлайн продажам",
        en: "Online Sales Manager",
    } satisfies Localized,
};

const salesConsultant = {
    photo: "/ourTeam/beknur.png",
    name: {
        ky: "Маратов Бекнур",
        ru: "Маратов Бекнур",
        en: "Beknur Maratov",
    } satisfies Localized,
    role: {
        ky: "Сатуу боюнча эксперт жана консультант",
        ru: "Эксперт и консультант по продажам",
        en: "Sales expert and consultant",
    } satisfies Localized,
};

const optomManager = {
    photo: "/ourTeam/daniyal.png",
    name: {
        ky: "Алтымышев Даниял",
        ru: "Алтымышев Даниял",
        en: "Daniyal Altymyshev",
    } satisfies Localized,
    role: {
        ky: "SPORTIC OPTOM филиалынын сатуу менеджери",
        ru: "Менеджер по продажам филиала SPORTIC OPTOM",
        en: "Sales Manager of the SPORTIC OPTOM branch",
    } satisfies Localized,
};

const optomHead = {
    photo: "/ourTeam/dastan.png",
    name: {
        ky: "Уразбеков Дастан",
        ru: "Уразбеков Дастан",
        en: "Dastan Urazbekov",
    } satisfies Localized,
    role: {
        ky: "SPORTIC OPTOM филиалынын башкаруучусу",
        ru: "Управляющий филиалом SPORTIC OPTOM",
        en: "Branch Manager of SPORTIC OPTOM",
    } satisfies Localized,
};

const translations: Record<
    Lang,
    {
        kicker: string;
        title: string;
        founderLabel: string;
        managerLabel: string;
        salesLabel: string;
        consultantLabel: string;
        optomLabel: string;
        optomHeadLabel: string;
        desc1: string;
        desc2: string;
        stats: { value: string; label: string }[];
        teamKicker: string;
        teamTitle: string;
    }
> = {
    ky: {
        kicker: "Sportic KGZ",
        title: "Биз жөнүндө",
        founderLabel: "Негиздөөчү",
        managerLabel: "Филиалдын башкаруучусу",
        salesLabel: "Онлайн сатуу",
        consultantLabel: "Сатуу эксперти",
        optomLabel: "SPORTIC OPTOM",
        optomHeadLabel: "OPTOM башкаруучусу",
        desc1: "Sportic KG — 2018-жылдан бери спортчуларга, машыктыруучуларга, клубдарга жана уюмдарга машыгуу, мелдештер жана жаңы жеңиштер үчүн керектүү буюмдарды табууга жардам берип келе жаткан спорттук экипировка жана инвентарь дүкөнү.",
        desc2: "Биз Кыргызстан боюнча жеке кардарларга да, мектептерге, академияларга, клубдарга, федерацияларга жана мамлекеттик мекемелерге да чекене жана оптом багыттагы спорттук өнүмдөрдү камсыздайбыз. Бизге Кыргыз футбол союзу (КФС), Улуттук футбол академиясы жана башка көптөгөн уюмдар ишеним көрсөтөт.",
        stats: [
            { value: "2018", label: "Башталган жылы" },
            { value: "KGZ", label: "Бүткүл өлкө боюнча" },
            { value: "DEM", label: "Өз бренди" },
            { value: "ОПТ", label: "Чекене жана оптом" },
        ],
        teamKicker: "Команда",
        teamTitle: "Биздин команда",
    },
    ru: {
        kicker: "Sportic KGZ",
        title: "О нас",
        founderLabel: "Основатель",
        managerLabel: "Управляющий филиалом",
        salesLabel: "Онлайн продажи",
        consultantLabel: "Эксперт по продажам",
        optomLabel: "SPORTIC OPTOM",
        optomHeadLabel: "Управляющий OPTOM",
        desc1: "Sportic KG — магазин спортивной экипировки и инвентаря, который с 2018 года помогает спортсменам, тренерам, клубам и организациям находить всё необходимое для тренировок, соревнований и новых побед.",
        desc2: "Мы развиваем розничное и оптовое направления, обеспечивая спортивной продукцией как индивидуальных покупателей, так и школы, академии, клубы, федерации и государственные учреждения по всему Кыргызстану. Нам доверяют Кыргызский футбольный союз (КФС), Национальная футбольная академия и многие другие.",
        stats: [
            { value: "2018", label: "Год основания" },
            { value: "KGZ", label: "По всей стране" },
            { value: "DEM", label: "Собственный бренд" },
            { value: "ОПТ", label: "Розница и опт" },
        ],
        teamKicker: "Команда",
        teamTitle: "Наша команда",
    },
    en: {
        kicker: "Sportic KGZ",
        title: "About Us",
        founderLabel: "Founder",
        managerLabel: "Branch Manager",
        salesLabel: "Online sales",
        consultantLabel: "Sales expert",
        optomLabel: "SPORTIC OPTOM",
        optomHeadLabel: "OPTOM manager",
        desc1: "Sportic KG is a sports equipment and gear store that has been helping athletes, coaches, clubs, and organizations find everything needed for training, competitions, and new victories since 2018.",
        desc2: "We develop both retail and wholesale directions, providing sports products to individual buyers as well as schools, academies, clubs, federations, and state institutions across Kyrgyzstan. We are trusted by the Kyrgyz Football Union (KFU), the National Football Academy, and many others.",
        stats: [
            { value: "2018", label: "Year founded" },
            { value: "KGZ", label: "Nationwide" },
            { value: "DEM", label: "Own brand" },
            { value: "OPT", label: "Retail & wholesale" },
        ],
        teamKicker: "Team",
        teamTitle: "Our Team",
    },
};

function PortraitCard({
    src,
    alt,
    size,
}: {
    src: string;
    alt: string;
    size: "founder" | "manager";
}) {
    const frame = size === "founder" ? "w-full max-w-[400px]" : "w-full max-w-[280px]";
    const radius = size === "founder" ? "rounded-[1.5rem]" : "rounded-[1.25rem]";
    const glow = size === "founder" ? "-inset-2.5 rounded-[1.75rem]" : "-inset-2 rounded-[1.45rem]";

    return (
        <div className={`relative mx-auto ${frame}`}>
            <div className={`absolute ${glow} bg-gradient-to-br from-white/30 via-[#0a192f] to-red-600 opacity-80 blur-sm`} />
            <div className={`relative overflow-hidden ${radius} border border-white/10 bg-[#0a192f] shadow-[0_18px_50px_rgba(0,0,0,0.5)]`}>
                <div className="relative aspect-[4/5] w-full">
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        sizes={size === "founder" ? "(max-width: 1024px) 70vw, 400px" : "(max-width: 1024px) 55vw, 280px"}
                        className="object-cover object-[center_12%]"
                        priority={size === "founder"}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070b14] via-transparent to-white/5" />
                    <div className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-red-600" />
                    <div className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-white" />
                    <div className="absolute bottom-4 left-4">
                        <p className="text-[10px] font-black tracking-tighter text-white drop-shadow">
                            SPORTIC<span className="text-red-600">KGZ</span>
                        </p>
                        <p className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.22em] text-white/55">
                            DEM
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

const AboutAndTeam = () => {
    const { lang } = useLanguage();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const currentLang: Lang = lang === "ky" || lang === "en" ? lang : "ru";
    const t = translations[currentLang];

    if (!mounted) return null;

    return (
        <section className="relative w-full min-h-screen overflow-hidden bg-[#070b14] text-white">
            <div className="pointer-events-none absolute -left-24 top-0 h-[520px] w-[520px] rounded-full bg-red-600/10 blur-[140px]" />
            <div className="pointer-events-none absolute right-0 top-40 h-[480px] w-[480px] rounded-full bg-blue-700/10 blur-[140px]" />
            <div className="pointer-events-none absolute bottom-0 left-1/3 h-[360px] w-[360px] rounded-full bg-red-600/5 blur-[120px]" />

            <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-24">
                <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.45 }}
                            className="mb-8"
                        >
                            <span className="mb-3 block text-sm font-bold uppercase tracking-[0.28em] text-red-600">
                                {t.kicker}
                            </span>
                            <h1 className="inline-block border-b-4 border-red-600 pb-3 text-4xl font-black uppercase tracking-tight md:text-6xl">
                                {t.title}
                            </h1>
                        </motion.div>

                        <p className="mt-6 max-w-xl text-sm leading-relaxed text-zinc-400 md:text-base">
                            {t.desc1}
                        </p>
                        <p className="mt-4 max-w-xl border-l-2 border-red-600/70 pl-4 text-sm leading-relaxed text-zinc-500 md:text-base">
                            {t.desc2}
                        </p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mx-auto w-[min(100%,240px)] min-w-0 space-y-2.5 justify-self-center lg:col-span-5 lg:w-[260px] lg:justify-self-end"
                    >
                        {[
                            { src: "/ourTeam/group-main.jpg", w: 2400, h: 1471 },
                            { src: "/ourTeam/group-energy.jpg", w: 2400, h: 1574 },
                        ].map((photo) => (
                            <div
                                key={photo.src}
                                className="relative overflow-hidden rounded-xl border border-white/10 bg-[#10151f] shadow-[0_12px_32px_rgba(0,0,0,0.4)]"
                            >
                                <Image
                                    src={photo.src}
                                    alt={t.teamTitle}
                                    width={photo.w}
                                    height={photo.h}
                                    priority
                                    sizes="260px"
                                    className="h-auto w-full"
                                />
                                <div className="pointer-events-none absolute left-3 top-3 h-3.5 w-3.5 border-l-2 border-t-2 border-red-600" />
                                <div className="pointer-events-none absolute bottom-3 right-3 h-3.5 w-3.5 border-b-2 border-r-2 border-white" />
                            </div>
                        ))}
                    </motion.div>
                </div>

                <div className="about-stats-mask relative mt-10 overflow-hidden md:mt-14">
                    <div className="about-stats-track py-2">
                        {[...t.stats, ...t.stats].map((stat, index) => (
                            <div
                                key={`${stat.label}-${index}`}
                                className="about-stats-card w-[min(70vw,280px)] shrink-0 border bg-white/[0.03] px-5 py-5 md:w-[320px] md:px-7 md:py-6"
                            >
                                <p className="text-2xl font-black italic tracking-tight text-white md:text-3xl">
                                    {stat.value}
                                    <span className="text-red-600">.</span>
                                </p>
                                <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-zinc-500">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-16 md:mt-24">
                    <div className="mb-8 flex items-end justify-between gap-4">
                        <div>
                            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.28em] text-red-600">
                                {t.teamKicker}
                            </span>
                            <h3 className="text-3xl font-black uppercase italic tracking-tight md:text-5xl">
                                {t.teamTitle}
                            </h3>
                        </div>
                        <p className="hidden text-right text-xs font-black tracking-tighter text-white/40 sm:block">
                            SPORTIC<span className="text-red-600">KGZ</span>
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
                        {[
                            { person: founder, label: t.founderLabel, size: "founder" as const },
                            { person: manager, label: t.managerLabel, size: "manager" as const },
                            { person: salesManager, label: t.salesLabel, size: "manager" as const },
                            { person: salesConsultant, label: t.consultantLabel, size: "manager" as const },
                            { person: optomManager, label: t.optomLabel, size: "manager" as const },
                            { person: optomHead, label: t.optomHeadLabel, size: "manager" as const },
                        ].map(({ person, label, size }) => (
                            <motion.div
                                key={person.photo}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.45 }}
                                className="flex flex-col items-center gap-5 border border-white/10 bg-white/[0.03] px-5 py-6 text-center"
                            >
                                <div className={`w-full ${size === "founder" ? "max-w-[260px]" : "max-w-[220px]"}`}>
                                    <PortraitCard src={person.photo} alt={person.name[currentLang]} size={size} />
                                </div>
                                <div>
                                    <p className="mb-2 text-[11px] font-black uppercase italic tracking-[0.28em] text-red-500">
                                        {label}
                                    </p>
                                    <h3 className="text-lg font-black uppercase italic tracking-tight text-white md:text-xl">
                                        {person.name[currentLang]}
                                    </h3>
                                    <p className="mt-2 text-sm font-semibold leading-relaxed text-white/75">
                                        {person.role[currentLang]}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutAndTeam;
