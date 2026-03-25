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
        const testUser = { email: "test@test.com", password: "123", name: "Зочин" };

        if (email === testUser.email && pass === testUser.password) {
            setUser(testUser);
            localStorage.setItem("activeUser", JSON.stringify(testUser));
            return { success: true };
        }

        return { success: false, message: "И-мэйл эсвэл нууц үг буруу байна!" };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('activeUser');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
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