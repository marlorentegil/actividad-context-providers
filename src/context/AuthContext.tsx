import { createContext, useContext, useState, ReactNode } from "react";

const AUTH_KEY: string = "app-auth";

// Definimos el usuario como un objeto con nombre o nulo si no hay sesión
type User = { name: string } | null;

type AuthContextType = {
    user: User;
    login: (name: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactNode }) {
    // Inicializamos recuperando el nombre del localStorage si existe
    const [user, setUser] = useState<User>(() => {
        const saved = window.localStorage.getItem(AUTH_KEY);
        return saved ? { name: saved } : null;
    });

    const login = (name: string) => {
        setUser({ name });
        window.localStorage.setItem(AUTH_KEY, name);
    };

    const logout = () => {
        setUser(null);
        window.localStorage.removeItem(AUTH_KEY);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook para usar la autenticación
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return context;
}

