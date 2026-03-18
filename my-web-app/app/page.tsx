"use client";
import { useState } from "react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import CartModal from "@/components/CartModal";
import toast from "react-hot-toast"

export default function Home() {
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCat, setSelectedCat] = useState("Бүгд");

  const categories = ["Бүгд", "Гар утас", "Планшет", "Чихэвч", "Компьютер", "Тоглоом"];

  // Хайлт болон Ангиллыг хамтад нь шүүх
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCat === "Бүгд" || p.cat === selectedCat;
    return matchesSearch && matchesCat;
  });

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const addToCart = (product: any) => {
    const isExisting = cart.find((item) => item.id === product.id);

    if (isExisting) {
      toast.success(`${product.name}-ийн тоо нэмэгдлээ`, { icon: '➕' });
    } else {
      toast.success(`${product.name} сагсанд нэмэгдлээ`, { icon: '✔️' });
    }

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevCart, { ...product, qty: 1 }];
    });
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 p-4 mb-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-black text-blue-600 italic">E-Commerce</h1>

          <input
            type="text"
            placeholder="Хайх барааны нэрээ бичнэ үү..."
            className="w-full md:w-96 px-6 py-2 bg-gray-100 rounded-full outline-none focus:ring-2 focus:ring-blue-500 transition"
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button
            onClick={() => setIsCartOpen(true)}
            className="bg-gray-900 text-white px-8 py-2 rounded-full font-bold hover:bg-blue-600 transition"
          >
            Сагс ({cart.reduce((total, item) => total + item.qty, 0)})
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <h2 className="font-bold text-gray-400 mb-4 uppercase text-sm tracking-widest">Ангилал</h2>
          <div className="flex flex-wrap md:flex-col gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-5 py-2 rounded-xl text-left font-medium transition ${selectedCat === cat ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </aside>

        {/* Products Grid */}
        <section className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(p => (
              <ProductCard key={p.id} product={p} onAdd={addToCart} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20 text-gray-400">Уучлаарай, бараа олдсонгүй...</div>
          )}
        </section>
      </div>

      <CartModal
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onRemove={removeFromCart}
      />
    </main>
  );
}