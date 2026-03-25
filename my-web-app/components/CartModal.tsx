import React, { useContext, useState } from "react";
import CheckoutForm from "./CheckoutForm";
import { AuthContext, useAuth } from "@/contexts/AuthContext";
import AuthForm from "./AuthForm";

export default function CartModal({
  cart,
  isOpen,
  isAuthOnly,
  onClose,
  onRemove,
  onClear
}: {
  cart: any[],
  isOpen: boolean,
  isAuthOnly: boolean,
  onClose: () => void,
  onRemove: (idx: number) => void,
  onClear: () => void
}) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = useAuth();
  const { login, register, user } = auth || {};

  if (!isOpen) return null;

  const total = cart.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.qty) || 0;
    return sum + (price * qty);
  }, 0);

  const handleClose = () => {
    setShowCheckout(false);
    onClose();
  };

  const handleOrderSuccess = () => {
    onClear();
    localStorage.removeItem('cart');
    setShowCheckout(false);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

      <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">

        {/* HEADER */}
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-black">
            {isAuthOnly && !user ? "Системд нэвтрэх" : (showCheckout ? "Хүргэлтийн мэдээлэл" : "Таны сагс")}
          </h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-black text-2xl">&times;</button>
        </div>

        {/* BODY (Scrollable хэсэг) */}
        <div className="p-6 max-h-[500px] overflow-y-auto">
          {isAuthOnly && !user ? (
            // Хэрэв зөвхөн нэвтрэх бол (Сагс харахгүй)
            <AuthForm login={login} register={register} />
          ) : showCheckout ? (
            // Төлбөр төлөх хэсэг (Checkout)
            <div>
              <button onClick={() => setShowCheckout(false)} className="mb-4 text-blue-600 font-bold hover:underline text-sm">
                ← Сагс руу буцах
              </button>
              <CheckoutForm onSuccess={handleOrderSuccess} cart={cart} />
            </div>
          ) : (
            // Сагсны жагсаалт хэсэг
            <div className="space-y-3">
              {cart.length === 0 ? (
                <p className="text-center text-gray-400 py-10">Сагс хоосон байна.</p>
              ) : (
                cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl">
                    <div>
                      <p className="font-bold">{item.name}</p>
                      <p className="text-blue-600 text-sm">{item.price.toLocaleString()}₮ x {item.qty}</p>
                    </div>
                    <button onClick={() => onRemove(idx)} className="text-red-500 text-xs font-bold p-2 hover:bg-red-50 rounded-lg">
                      Устгах
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* FOOTER (Нийт дүн болон Auth хэсэг) */}
        {!showCheckout && !isAuthOnly && cart.length > 0 && (
          <div className="p-6 bg-gray-50 border-t space-y-4">

            <div className="flex justify-between items-center mb-2 text-xl font-black">
              <span>Нийт:</span>
              <span>{total.toLocaleString()}₮</span>
            </div>

            {user ? (
              /* Нэвтэрсэн үед харагдах товч */
              <button
                onClick={() => setShowCheckout(true)}
                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
              >
                Төлбөр төлөх
              </button>
            ) : (
              // Нэвтрээгүй үед: Login/Register Form
              <AuthForm login={login} register={register} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}