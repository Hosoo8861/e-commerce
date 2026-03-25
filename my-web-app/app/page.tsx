"use client";
import { useState } from "react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import CartModal from "@/components/CartModal";
import toast from "react-hot-toast"
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/contexts/AuthContext";

export default function Home() {
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCat, setSelectedCat] = useState("Бүгд");
  const [isAuthOnly, setIsAuthOnly] = useState(false);

  // Login

  const handleLoginClick = () => {
    setIsAuthOnly(true);
    setIsCartOpen(true);
  }

  const handleCartClick = () => {
    setIsAuthOnly(false);
    setIsCartOpen(true);
  }

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
      <Navbar
        cartCount={cart.length}
        onCartOpen={handleCartClick}
        onSearchChange={setSearchTerm}
        onLoginClick={handleLoginClick}
      />


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
      {isCartOpen && (
        <CartModal
          isAuthOnly={isAuthOnly}
          cart={cart}
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          onRemove={removeFromCart}
          onClear={() => setCart([])}
        />
      )}

    </main>

  );
}