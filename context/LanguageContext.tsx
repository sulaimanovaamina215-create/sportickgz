"use client";
import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext<any>(null);

export const LanguageProvider = ({ children }: any) => {
    const [lang, setLang] = useState<'ky' | 'ru' | 'en'>('ru');
    return (
        <LanguageContext.Provider value={{ lang, setLang }}>
            {children}
        </LanguageContext.Provider>
    );
};
export const useLanguage = () => useContext(LanguageContext);