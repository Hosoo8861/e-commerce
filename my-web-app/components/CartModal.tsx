import React, { useState } from "react";
import CheckoutForm from "./CheckoutForm";

export default function CartModal({
  cart,
  isOpen,
  onClose,
  onRemove,
  onClear
}: {
  cart: any[],
  isOpen: boolean,
  onClose: () => void,
  onRemove: (idx: number) => void,
  onClear: () => void
}) {
  const [showCheckout, setShowCheckout] = useState(false);

  const handleOrderSuccess = () => {
    console.log("sags hoosloh???????????");
    onClear();
    setShowCheckout(false);
    onClose();
  }

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">

        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-black">
            {showCheckout ? "Хүргэлтийн мэдээлэл" : "Таны сагс"}
          </h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-black text-2xl">&times;</button>
        </div>

        <div className="p-6 max-h-[500px] overflow-y-auto">
          {!showCheckout ? (
            /* 1-р АЛХАМ: САГСНЫ ЖАГСААЛТ */
            <div className="space-y-3">
              {cart.length === 0 ? (
                <p className="text-center text-gray-400 py-10">Сагс хоосон.</p>
              ) : (
                cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl">
                    <div>
                      <p className="font-bold">{item.name}</p>
                      <p className="text-blue-600 text-sm">{item.price.toLocaleString()}₮ x {item.qty}</p>
                    </div>
                    <button
                      onClick={() => onRemove(idx)}
                      className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition"
                    >
                      Устгах
                    </button>
                  </div>
                ))
              )}
            </div>
          ) : (
            /* 2-р АЛХАМ: ЗАХИАЛГЫН ФОРМ */
            <div>
              <button
                onClick={() => setShowCheckout(false)}
                className="mb-4 text-blue-600 font-bold hover:underline"
              >
                ← Буцах
              </button>
              <CheckoutForm onSuccess={handleOrderSuccess} />
            </div>
          )}
        </div>

        {!showCheckout && cart.length > 0 && (
          <div className="p-6 bg-gray-50 border-t">
            <div className="flex justify-between items-center mb-6 text-xl font-black">
              <span>Нийт:</span>
              <span>{total.toLocaleString()}₮</span>
            </div>
            <button
              onClick={() => setShowCheckout(true)}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition"
            >
              Төлбөр төлөх рүү шилжих
            </button>
          </div>
        )}
      </div>
    </div>
  );
}