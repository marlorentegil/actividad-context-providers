import { useLanguage } from "@/context/LanguageContext";

export default function LanguageSwitcher() {
    // Extraemos el idioma actual y la función para cambiarlo desde nuestro hook
    const { language, setLanguage } = useLanguage();

    return (
        <div className="flex text-xs border rounded-md overflow-hidden bg-white dark:bg-slate-800 dark:border-slate-600">
            {/* Botón para Español */}
            <button
                onClick={() => setLanguage("es")}
                className={`px-2 py-1 transition-colors ${
                    language === "es"
                        ? "bg-slate-900 text-white" // Estilo si está seleccionado
                        : "text-slate-900 bg-white dark:bg-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700"
                }`}
            >
                ES
            </button>

            {/* Botón para Inglés */}
            <button
                onClick={() => setLanguage("en")}
                className={`px-2 py-1 transition-colors ${
                    language === "en"
                        ? "bg-slate-900 text-white" // Estilo si está seleccionado
                        : "text-slate-900 bg-white dark:bg-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700"
                }`}
            >
                EN
            </button>
        </div>
    );
}