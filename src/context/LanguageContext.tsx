import { createContext, useContext, useEffect, useState } from "react";

// Clave para identificar el idioma en el almacenamiento local del navegador
const LANGUAGE_KEY: string = "app-language";

// Definición de tipos permitidos
type Language = 'en' | 'es';

type LanguageContextType = {
    language: Language;
    // Cambiamos a setLanguage para poder elegir un idioma específico (ES o EN)
    setLanguage: (lang: Language) => void;
};

// Creamos el contexto con un valor inicial indefinido
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

type LanguageProviderProps = {
    children: React.ReactNode;
};

export default function LanguageProvider({ children }: LanguageProviderProps) {
    // Inicializamos el estado leyendo de localStorage o usando 'es' por defecto
    const [language, setLanguage] = useState<Language>(() => {
        const currentLanguage = window.localStorage.getItem(LANGUAGE_KEY);
        return (currentLanguage === 'en' || currentLanguage === 'es') ? currentLanguage : 'es';
    });

    // Efecto para sincronizar el estado con el localStorage y el atributo lang del HTML
    useEffect(() => {
        // Guardamos la preferencia del usuario
        window.localStorage.setItem(LANGUAGE_KEY, language);
        
        // Actualizamos el atributo lang del documento (buena práctica para accesibilidad)
        document.documentElement.lang = language;
    }, [language]);

    // Preparamos el valor que el Provider entregará a los hijos
    const value: LanguageContextType = { language, setLanguage };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

// Hook personalizado para consumir el contexto de forma segura
export function useLanguage() {
    const ctx = useContext(LanguageContext);
    
    // Si el hook se usa fuera del Provider, lanzamos un error descriptivo
    if (!ctx) {
        throw new Error("useLanguage debe usarse dentro de un LanguageProvider");
    }
    return ctx;
}