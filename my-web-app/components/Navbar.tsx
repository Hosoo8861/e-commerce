"use client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "react-hot-toast";

interface NavbarProps {
    cartCount: number;
    onCartOpen: () => void;
    onLoginClick: () => void;
    onSearchChange: (value: string) => void;
}

export default function Navbar({ cartCount, onCartOpen, onSearchChange, onLoginClick }: NavbarProps) {
    const { user, logout } = useAuth();

    // const handleFakeLogin = () => {
    //     const fakeUser = { name: "Developer", email: "dev@test.com" };
    //     login(fakeUser);
    //     toast.success("Амжилттай нэвтэрлээ!");
    // };

    return (
        <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 p-4">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">

                {/* Лого хэсэг */}
                <h1 className="text-2xl font-black text-blue-600 italic tracking-tighter cursor-pointer">
                    E-Commerce
                </h1>

                {/* Хайлтын хэсэг */}
                <div className="relative w-full md:w-96">
                    <input
                        type="text"
                        placeholder="Хайх барааны нэрээ бичнэ үү..."
                        className="w-full px-6 py-2 bg-gray-100 rounded-full outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all text-sm"
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>

                {/* Сагс болон Хэрэглэгчийн хэсэг */}
                <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">

                    {/* Сагсны товч */}
                    <button
                        onClick={onCartOpen}
                        className="flex items-center gap-2 bg-gray-900 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-600 transition-all active:scale-95 text-sm"
                    >
                        <span>Сагс</span>
                        <span className="bg-white/20 px-2 rounded-md">{cartCount}</span>
                    </button>

                    <div className="h-8 w-[1px] bg-gray-200 mx-1 hidden md:block" />
                    {/* Auth хэсэг */}
                    {user ? (
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-black">
                                {user.name[0].toUpperCase()}
                            </div>
                            <span className="text-sm font-bold text-gray-700 hidden lg:block">
                                {user.name}
                            </span>
                            <button
                                onClick={() => { logout(); toast.error("Системээс гарлаа"); }}
                                className="text-xs font-bold text-red-500 hover:bg-red-50 px-3 py-2 rounded-xl transition"
                            >
                                Гарах
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={onLoginClick}
                            className="text-sm bg-blue-50 text-blue-600 px-6 py-2 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition-all active:scale-95"
                        >
                            Нэвтрэх
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}