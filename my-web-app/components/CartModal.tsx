export default function CartModal({ cart, isOpen, onClose, onRemove }: { cart: any[], isOpen: boolean, onClose: () => void, onRemove: (id: number) => void }) {
  if (!isOpen) return null;
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-black">Таны сагс</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black text-2xl">&times;</button>
        </div>
        <div className="p-6 max-h-[400px] overflow-y-auto space-y-3">
          {cart.length === 0 ? <p className="text-center text-gray-400 py-10">Сагс хоосон.</p> : 
            cart.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl">
                <div>
                  <p className="font-bold">{item.name}</p>
                  <p className="text-blue-600 text-sm">{item.price.toLocaleString()}₮</p>
                </div>
                <button 
                  onClick={() => onRemove(idx)} 
                  className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition"
                >
                  Устгах
                </button>
              </div>
            ))
          }
        </div>
        <div className="p-6 bg-gray-50 border-t">
          <div className="flex justify-between items-center mb-6 text-xl font-black">
            <span>Нийт:</span>
            <span>{total.toLocaleString()}₮</span>
          </div>
          <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700">
            Төлбөр төлөх
          </button>
        </div>
      </div>
    </div>
  );
}