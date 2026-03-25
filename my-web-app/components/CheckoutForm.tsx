import React, { useState, ChangeEvent } from 'react';
import { useAuth } from "@/contexts/AuthContext";

// 1. Формд орох өгөгдөл
interface FormData {
    name: string;
    phone: string;
    address: string;
}

// 2. Алдааны мессежүүд
interface FormErrors {
    name?: string;
    phone?: string;
    address?: string;
}

// 3. props - ийн төрлийг нэмнэ
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

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-4'>
            <input
                name="name"
                placeholder="Нэр"
                value={formData.name}
                onChange={handleChange}
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            {errors.name && <span style={{ color: 'red', fontSize: '12px' }}>{errors.name}</span>}

            <input
                name="phone"
                placeholder="Утас"
                onChange={handleChange}
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            {errors.phone && <span style={{ color: 'red', fontSize: '12px' }}>{errors.phone}</span>}

            <textarea
                name="address"
                placeholder="Хүргэлтийн хаяг"
                onChange={handleChange}
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            {errors.address && <span style={{ color: 'red', fontSize: '12px' }}>{errors.address}</span>}

            <button type="submit" style={{ cursor: 'pointer', padding: '10px', backgroundColor: '#1976d2', color: 'white', border: 'none', borderRadius: '4px' }}>
                Захиалга өгөх
            </button>
        </form>
    );
}