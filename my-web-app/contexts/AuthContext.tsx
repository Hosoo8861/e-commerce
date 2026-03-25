"use client";
import React, { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    // const {login} = useAuth()
    // Апп ачаалагдахад localStorage-оос хэрэглэгчийг хайх
    useEffect(() => {
        const savedUser = localStorage.getItem('activeUser');
        if (savedUser) setUser(JSON.parse(savedUser));
    }, []);

    const login = (email: string, pass: string) => {
        const users = JSON.parse(localStorage.getItem("all_users") || "[]");
        const found = users.find((u: any) => u.email === email && u.password === pass);

        if (found) {
            setUser(found);
            localStorage.setItem("activeUser", JSON.stringify(found));
            window.location.reload();
            return { success: true };
        }

        return { success: false, message: "И-мэйл эсвэл нууц үг буруу байна!" };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('activeUser');
    };

    const register = (name: string, email: string, pass: string) => {
        const localUsers = JSON.parse(localStorage.getItem("all_users") || "[]");

        const isExist = localUsers.find((u: any) => u.email === email);

        if (isExist) {
            return { success: false, message: "Энэ и-мэйл хаяг аль хэдийн бүртгүүлсэн байна!" };
        }
        const newUser = {
            name,
            email,
            password: pass
        };

        const updateUsers = [...localUsers, newUser];

        localStorage.setItem("all_users", JSON.stringify(updateUsers));

        return { success: true };
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined || context === null) {
        return { user: null, login: () => { }, logout: () => { } };
    }
    return context;
}