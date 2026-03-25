"use client";
import { useState } from "react";

export default function AuthForm({ login, register }: { login: any, register: any }) {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="space-y-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex bg-gray-100 p-1 rounded-xl mb-2">
                <button
                    type="button"
                    onClick={() => setIsLogin(true)}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition ${isLogin ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}
                >НЭВТРЭХ</button>
                <button
                    type="button"
                    onClick={() => setIsLogin(false)}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition ${!isLogin ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}
                >БҮРТГҮҮЛЭХ</button>
            </div>

            {!isLogin && (
                <input
                    value={name}
                    placeholder="Таны нэр"
                    className="w-full p-3 bg-gray-50 border rounded-xl text-sm outline-none"
                    onChange={(e) => setName(e.target.value)}
                />
            )}
            <input
                value={email}
                placeholder="И-мэйл"
                className="w-full p-3 bg-gray-50 border rounded-xl text-sm outline-none"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                value={password}
                type="password"
                placeholder="Нууц үг"
                className="w-full p-3 bg-gray-50 border rounded-xl text-sm outline-none"
                onChange={(e) => setPassword(e.target.value)}
            />

            <button
                onClick={() => {
                    if (isLogin) {
                        const res = login(email, password);
                        if (res && !res.success) alert(res.message);
                    } else {
                        const res = register(name, email, password);
                        if (res?.success) {
                            alert("Амжилттай бүртгүүллээ!");
                            setIsLogin(true);
                        } else if (res) alert(res.message);
                    }
                }}
                className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition"
            >
                {isLogin ? "Нэвтрэх" : "Бүртгүүлэх"}
            </button>
        </div>
    );
}