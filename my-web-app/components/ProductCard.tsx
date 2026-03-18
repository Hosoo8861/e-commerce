import Link from "next/link";

interface Product {
    id: number;
    name: string;
    price: number;
    cat: string;
    img: string;
}

export default function ProductCard({ product, onAdd }: { product: Product, onAdd: (p: any) => void }) {
    return (
        <div className="bg-white rounded-3xl p-4 shadow-sm hover:shadow-xl transition-all group border border-gray-100">
            <Link href={`/product/${product.id}`}>
                <div className="relative h-48 overflow-hidden rounded-2xl mb-4">
                    <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                </div>
            </Link>
            <Link href={`/product/${product.id}`}>
                <h3 className="font-bold text-lg truncate">{product.name}</h3>
            </Link>
            <p className="text-blue-600 font-black text-xl my-2">{product.price.toLocaleString()}₮</p>
            <button
                onClick={() => onAdd(product)}
                className="w-full py-3 bg-gray-100 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition active:scale-95"
            >
                Сагсанд нэмэх
            </button>
        </div>
    );
}