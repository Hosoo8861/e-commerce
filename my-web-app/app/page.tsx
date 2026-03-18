"use client";
import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import CartModal from "@/components/CartModal";

const products = [
  { id: 1, name: "iPhone 15 Pro", price: 3500000, cat: "Гар утас", img: "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=400&auto=format&fit=crop" },
  { id: 2, name: "iPad Pro M2", price: 2800000, cat: "Планшет", img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=400&auto=format&fit=crop" },
  { id: 3, name: "AirPods Max", price: 1800000, cat: "Чихэвч", img: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=400&auto=format&fit=crop" },
  { id: 4, name: "MacBook Air", price: 4200000, cat: "Компьютер", img: "https://images.unsplash.com/photo-1420406676079-b8491f2d07c8?q=80&w=1171&auto=format&fit=crop" },
  { id: 5, name: "Gaming Setup", price: 5500000, cat: "Тоглоом", img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=400&auto=format&fit=crop" },
  { id: 6, name: "Gaming Mouse", price: 250000, cat: "Тоглоом", img: "https://images.unsplash.com/photo-1629429408209-1f912961dbd8?q=80&w=1170&auto=format&fit=crop" },
];

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
            Сагс ({cart.length})
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
              <ProductCard key={p.id} product={p} onAdd={(item) => setCart([...cart, item])} />
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