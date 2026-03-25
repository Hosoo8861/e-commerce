import React, { useState, ChangeEvent, FormEvent } from 'react';

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
}

export default function CheckoutForm({ onSuccess }: CheckoutFormProps) {
    const [formData, setFormData] = useState<FormData>({ name: '', phone: '', address: '' });
    const [errors, setErrors] = useState<FormErrors>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let newErrors: FormErrors = {};

        if (!formData.name) newErrors.name = "Нэрээ оруулна уу!";
        if (formData.phone.length < 8) newErrors.phone = "Утасны дугаар буруу байна!";
        if (!formData.address) newErrors.address = "Хаягаа оруулна уу!";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            alert("Захиалга амжилттай! Баярлалаа.");
        }

        if (Object.keys(newErrors).length === 0) {
            alert("Захиалга амжилттай!");
            onSuccess();
        }
    };

    // Input өөрчлөгдөх үед ажиллах функц
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: '20px' }}>
            <input
                name="name"
                placeholder="Нэр"
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