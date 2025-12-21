import { RouterProvider } from "react-router-dom";
import { router } from "@/router";
import LanguageProvider from "@/context/LanguageContext"; 
import ThemeProvider from "@/context/ThemeContext"; // Importa el proveedor
import AuthProvider from "./context/AuthContext";
// import { AuthProvider } from "@/context/AuthContext"; // Asegúrate de tener este import si existe

function App() {
    return (
        <ThemeProvider>
            <LanguageProvider>
                <AuthProvider>
                    <RouterProvider router={router} />
                </AuthProvider>
            </LanguageProvider>
        </ThemeProvider>
    );
}

export default App;
