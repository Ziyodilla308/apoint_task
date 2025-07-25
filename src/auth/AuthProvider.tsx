import { useState, type ReactNode } from "react";
import type { User } from "../types/user";
import { useNavigate } from "react-router-dom";
import {AuthContext} from "./AuthContext";


export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(
        localStorage.getItem("token"),
    );

    const login = (token: string, user: User) => {
        localStorage.setItem("token", token);
        setToken(token);
        setUser(user);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
