"use client";
import { products } from "@/data/products";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function ProductDetail() {
    const { id } = useParams();
    const product = products.find((p) => p.id === Number(id));

    if (!product) return <div className="p-20 text-center">Бараа олдсонгүйю</div>;

    return (
        <div className="max-w-5xl mx-auto p-10">
            <Link href="/" className="text-blue-600 hover:underline">⬅ butsah </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
                <img src={product.img} alt={product.name} className="w-full rounded-3xl shadow-lg" />

                <div>
                    <span className="text-sm bg-blue-600 px-3 py-1 rounded-full text-white">{product.cat}</span>
                    <h1 className="text-4xl font-black mt-4">{product.name}</h1>
                    <p className="text-3xl text-blue-600 font-bold my-6">{product.price.toLocaleString()}₮</p>
                    <p className="text-gray-600 leading-relaxed mb-8">{product.desc || "Энэ барааны дэлгэрэнгүй тайлбар одоогоор байхгүй байна."}</p>

                    <button className="w-full bg-black text-white py-4 rounded-2xl font-bold hover:bg-blue-600 transition">
                        Сагсанд нэмэх
                    </button>
                </div>
            </div>
        </div>
    )
}