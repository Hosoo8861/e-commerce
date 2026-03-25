"use client";
import React, { useEffect, useState } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import Link from 'next/link';

interface OrderItem {
    name: string;
    price: number;
    qty: number;
}

interface Order {
    id: number;
    userEmail: string;
    customerName: string;
    phone: string;
    address: string;
    items: OrderItem[];
    total: number;
    date: string;
}

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const { user } = useAuth();

    useEffect(() => {
        if (typeof window !== 'undefined' && user) {
            const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
            // Зөвхөн тухайн нэвтэрсэн хэрэглэгчийн захиалгыг шүүж авах
            const myOrders = savedOrders.filter((o: Order) => o.userEmail === user.email);
            setOrders(myOrders.sort((a: Order, b: Order) => b.id - a.id)); // Шинэ нь дээрээ
        }
    }, [user]);

    if (!user) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6">
                <h1 className="text-2xl font-bold mb-4">Та нэвтрэх шаардлагатай</h1>
                <Link href="/" className="text-blue-600 hover:underline">Нүүр хуудас руу буцах</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-black text-gray-900">Миний захиалгууд</h1>
                    <Link href="/" className="bg-white px-4 py-2 rounded-xl shadow-sm text-sm font-bold border hover:bg-gray-50 transition">
                        ← Дэлгүүр рүү
                    </Link>
                </div>

                {orders.length === 0 ? (
                    <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100">
                        <div className="text-5xl mb-4">📦</div>
                        <p className="text-gray-500 font-medium">Танд одоогоор захиалга байхгүй байна.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                                {/* Захиалгын толгой хэсэг */}
                                <div className="p-6 border-b bg-gray-50/50 flex flex-wrap justify-between items-center gap-4">
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Захиалгын дугаар</p>
                                        <p className="font-mono text-sm">#{order.id}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Огноо</p>
                                        <p className="text-sm font-semibold">{order.date}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Нийт дүн</p>
                                        <p className="text-lg font-black text-blue-600">{order.total.toLocaleString()}₮</p>
                                    </div>
                                </div>

                                {/* Захиалгын доторх бараанууд */}
                                <div className="p-6">
                                    <div className="space-y-3">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="flex justify-between text-sm border-b border-dashed pb-2 last:border-0">
                                                <span className="text-gray-700 font-medium">
                                                    {item.name} <span className="text-gray-400 ml-2">x{item.qty}</span>
                                                </span>
                                                <span className="font-bold">{(item.price * item.qty).toLocaleString()}₮</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Хүргэлтийн мэдээлэл */}
                                    <div className="mt-6 pt-6 border-t flex flex-col md:flex-row gap-6">
                                        <div className="flex-1">
                                            <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Хүлээн авагч</p>
                                            <p className="text-sm font-bold">{order.customerName}</p>
                                            <p className="text-sm text-gray-500">{order.phone}</p>
                                        </div>
                                        <div className="flex-[2]">
                                            <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Хүргэлтийн хаяг</p>
                                            <p className="text-sm text-gray-600 leading-relaxed">{order.address}</p>
                                        </div>
                                        <div className="flex-1 flex items-end justify-end">
                                            <span className="bg-green-100 text-green-700 text-[10px] font-black px-3 py-1 rounded-full uppercase">
                                                Хүлээн авсан
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}