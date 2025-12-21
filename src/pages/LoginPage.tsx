import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext"; // Importamos la autenticación real
import { useLanguage } from "@/context/LanguageContext"; // Importamos el idioma real

import es from "../locales/es.json";
import en from "../locales/en.json";

const translations = { es, en } as const;
export type Language = "es" | "en";

export default function LoginPage() {
    // CONTEXTOS REALES
    const { login } = useAuth();
    const { language } = useLanguage(); 

    // Función de traducción conectada al contexto global
    const t = (key: string): string => {
        // @ts-ignore
        return translations[language][key] || key;
    }

    const [name, setName] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        
        // Llamada a la función login del AuthContext
        login(name.trim());
    };

    // --- EL RETURN SE MANTIENE EXACTAMENTE IGUAL ---
    return (
        <section className="max-w-md bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 space-y-4">
            <div>
                <h2 className="text-xl font-semibold">{t("loginTitle")}</h2>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                    {t("loginDescription")}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                    type="text"
                    placeholder={t("namePlaceholder")}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="px-3 py-2 rounded-md border border-slate-300 bg-white text-sm dark:bg-slate-900 dark:border-slate-600"
                />

                <button
                    type="submit"
                    disabled={!name.trim()}
                    className="px-4 py-2 rounded-md bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 disabled:opacity-50"
                >
                    {t("loginButton")}
                </button>
            </form>

            <p className="text-[11px] text-slate-500 dark:text-slate-400">
                En la app real, aquí llamaríamos a una API. En esta demo solo guardamos
                el nombre en el contexto global.
            </p>
        </section>
    );
}
