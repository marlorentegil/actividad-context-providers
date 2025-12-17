import {createBrowserRouter, Navigate, Outlet,} from "react-router-dom";

import Layout from "@/layout/Layout.tsx";
import LoginPage from "@/pages/LoginPage.tsx";
import HomePage from "@/pages/HomePage.tsx";

// Ruta protegida: solo deja pasar si hay usuario
function RequireAuth() {
    // TODO
    const {user} = useAuth();
    
    if (!user) {
        return <Navigate to="/login" replace/>;
    }
    return <Outlet/>;
}

// Wrapper para usar Layout + Outlet
function LayoutWrapper() {
    return (
        <Layout>
            <Outlet/>
        </Layout>
    );
}

export const router = createBrowserRouter([
    {
        // Rutas que usan el Layout principal
        element: <LayoutWrapper />,
        children: [
            {
                // Rutas protegidas
                element: <RequireAuth />,
                children: [
                    {
                        path: "/", // Página principal
                        element: <HomePage />,
                    },
                    // Otras rutas protegidas aquí
                ],
            },
            {
                // Ruta de login (fuera de RequireAuth, pero dentro del Layout si quieres que mantenga el diseño)
                path: "/login",
                element: <LoginPage />,
            },
        ],
    },
    {
        path: "*",
        element: <Navigate to="/" replace />,
    },
]);