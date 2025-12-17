import { RouterProvider } from "react-router-dom";
import { router } from "@/router";
import LanguageProvider from "@/context/LanguageContext"; 

function App() {
    return (
        <LanguageProvider>
            <AuthProvider> {/* El orden importa si el Auth usa traducciones */}
                <RouterProvider router={router} />
            </AuthProvider>
        </LanguageProvider>
    );
}

export default App;
