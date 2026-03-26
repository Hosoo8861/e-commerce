import React, { useState, ChangeEvent } from 'react';
import { useAuth } from "@/contexts/AuthContext";

interface FormData {
    name: string;
    phone: string;
    address: string;
}

interface FormErrors {
    name?: string;
    phone?: string;
    address?: string;
}

interface CheckoutFormProps {
    onSuccess: () => void;
    cart: any[];
}

export default function CheckoutForm({ onSuccess, cart }: CheckoutFormProps) {
    const [formData, setFormData] = useState<FormData>({ name: '', phone: '', address: '' });
    const [errors, setErrors] = useState<FormErrors>({});
    const { user } = useAuth();

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let newErrors: FormErrors = {};

        if (!formData.name) newErrors.name = "Нэрээ оруулна уу!";
        if (formData.phone.length < 8) newErrors.phone = "Утасны дугаар буруу байна!";
        if (!formData.address) newErrors.address = "Хаягаа оруулна уу!";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        handleOrder();
    };

    const handleOrder = () => {
        if (!user || cart.length === 0) {
            alert("Нэвтрэх эсвэл сагсаа шалгана уу!");
            return;
        };

        const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

        const newOrder = {
            id: Date.now(),
            userEmail: user.email,
            costumerName: formData.name,
            phone: formData.phone,
            address: formData.address,
            items: cart,
            total: total,
            date: new Date().toLocaleString(),
        }

        const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
        localStorage.setItem("orders", JSON.stringify([...existingOrders, newOrder]));

        alert("Захиалга амжилттай~ Баярлалаа.");
        onSuccess();
    }

    // Input-үүдийн давтагдах Tailwind класс
    const inputClasses = `w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm`;
    const errorClasses = `text-red-500 text-xs font-medium mt-1 ml-1`;

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-5 p-2'>
            <div className="flex flex-col">
                <label className="text-xs font-bold text-gray-500 mb-1.5 ml-1">Хүлээн авагчийн нэр</label>
                <input
                    name="name"
                    placeholder="Жишээ: Бат-Эрдэнэ"
                    value={formData.name}
                    suppressHydrationWarning
                    onChange={handleChange}
                    className={inputClasses}
                />
                {errors.name && <span className={errorClasses}>{errors.name}</span>}
            </div>

            <div className="flex flex-col">
                <label className="text-xs font-bold text-gray-500 mb-1.5 ml-1">Утасны дугаар</label>
                <input
                    name="phone"
                    type="tel"
                    placeholder="88xxxxxx"
                    suppressHydrationWarning
                    onChange={handleChange}
                    className={inputClasses}
                />
                {errors.phone && <span className={errorClasses}>{errors.phone}</span>}
            </div>

            <div className="flex flex-col">
                <label className="text-xs font-bold text-gray-500 mb-1.5 ml-1">Хүргэлтийн хаяг</label>
                <textarea
                    name="address"
                    rows={3}
                    placeholder="Дүүрэг, хороо, байр, тоот..."
                    suppressHydrationWarning
                    onChange={handleChange}
                    className={`${inputClasses} resize-none`}
                />
                {errors.address && <span className={errorClasses}>{errors.address}</span>}
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/30 transition-all active:scale-[0.98] mt-2"
            >
                Захиалга баталгаажуулах
            </button>
        </form>
    );
}