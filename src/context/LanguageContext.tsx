import { createContext, useContext, useEffect, useState } from "react";

const LANGUAGE_KEY: string = "app-language"

type Language = 'en' | 'es';

type LanguageContextType = {
    language: Language;
    toggleLanguage: ()=> void;
}

const LenguageContext = createContext<LanguageContextType | undefined>(undefined);

type LanguageProviderProps = {
    children: React.ReactNode;
}

export default function LanguageProvider({children}:LanguageProviderProps){

    const currentLanguage = window.localStorage.getItem(LANGUAGE_KEY);
    const storedLanguage = currentLanguage === 'en' ? 'en' : 'es';

    const [language, setLanguage] = useState<Language>(storedLanguage);

    const toggleLanguage = () =>{
        setLanguage((prev) => (prev === "es" ? "en" : "es"));
    };


    useEffect(() => {
        const root = document.documentElement;
        if(language === 'en'){
            root.classList.add('en');
        }else{
            root.classList.remove('en');
        }
        window.localStorage.setItem(LANGUAGE_KEY, language);
    },[language]);

    const value:LanguageContextType = {language, toggleLanguage}

    return(
        <LenguageContext.Provider value = {value}>
            {children}
        </LenguageContext.Provider>
    );

}

export function useLanguage(){
    const ctx = useContext(LenguageContext);
    if(!ctx){
        throw new Error("useTheme debe usarse dentro de un LanguageProvider")
    }
    return ctx;
}