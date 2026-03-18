export interface Product {
    id: number;
    name: string;
    price: number;
    cat: string;
    img: string;
    desc?: string;
}

export const products: Product[] = [
    {
        id: 1,
        name: "iPhone 15 Pro",
        price: 3500000,
        cat: "Гар утас",
        img: "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=400&auto=format&fit=crop",
        desc: "Сүүлийн үеийн хүчирхэг Titanium корпус, A17 Pro чиптэй."
    },
    {
        id: 2,
        name: "iPad Pro M2",
        price: 2800000,
        cat: "Планшет",
        img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=400&auto=format&fit=crop",
        desc: "Мэргэжлийн түвшний ажиллагаа, Mini-LED дэлгэц."
    },
    { id: 3, name: "AirPods Max", price: 1800000, cat: "Чихэвч", img: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=400&auto=format&fit=crop" },
    { id: 4, name: "MacBook Air", price: 4200000, cat: "Компьютер", img: "https://images.unsplash.com/photo-1420406676079-b8491f2d07c8?q=80&w=1171&auto=format&fit=crop" },
    { id: 5, name: "Gaming Setup", price: 5500000, cat: "Тоглоом", img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=400&auto=format&fit=crop" },
    { id: 6, name: "Gaming Mouse", price: 250000, cat: "Тоглоом", img: "https://images.unsplash.com/photo-1629429408209-1f912961dbd8?q=80&w=1170&auto=format&fit=crop" },
];