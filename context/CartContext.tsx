"use client";

import { createContext, useContext, useState } from "react";
import { parseKgsPrice } from "@/lib/currency";

interface CartItem {
    id: number | string;
    title: string;
    price: number;
    photo: string;
    quantity: number;
    selectedSize?: string;
    sizes?: string[];
    optionType?: "color" | "size";
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: any) => void;
    updateQuantity: (id: number | string, newQuantity: number) => void;
    updateItemSize: (id: number | string, newSize: string) => void; // Размерди өзгөртүү үчүн кошулду
    removeFromCart: (id: number | string) => void;
    sendOrder: (name: string, phone: string) => boolean;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (product: any) => {
        setCart((prev) => {
            const cleanPrice = parseKgsPrice(product.price);

            const selectedSize = product.selectedSize || (product.sizes ? product.sizes[0] : "One Size");

            // Товардын ID жана тандалган размери бирдей болгонун текшеребиз
            const exist = prev.find((p) => p.id === product.id && p.selectedSize === selectedSize);

            if (exist) {
                return prev.map((p) =>
                    p.id === product.id && p.selectedSize === selectedSize
                        ? { ...p, quantity: p.quantity + 1 }
                        : p
                );
            }
            return [...prev, { ...product, price: cleanPrice, quantity: 1, selectedSize }];
        });
    };

    const updateQuantity = (id: number | string, newQuantity: number) => {
        setCart((prev) => prev.map((item) => item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item));
    };

    // Корзинадан размерди өзгөртүү функциясы
    const updateItemSize = (id: number | string, newSize: string) => {
        setCart((prev) => prev.map((item) => item.id === id ? { ...item, selectedSize: newSize } : item));
    };

    const removeFromCart = (id: number | string) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const toAbsolutePhotoUrl = (photo: string) => {
        if (!photo) return "";
        if (/^https?:\/\//i.test(photo)) return photo;
        const path = photo.startsWith("/") ? photo : `/${photo}`;
        return `${window.location.origin}${path}`;
    };

    const sendOrder = (name: string, phone: string) => {
        if (cart.length === 0) return false;

        const orderList = cart
            .map((item, index) => {
                const size = item.selectedSize
                    ? item.optionType === "color"
                        ? ` (цвет: ${item.selectedSize})`
                        : ` (размер: ${item.selectedSize})`
                    : "";
                const lineTotal = item.price * item.quantity;
                const photoUrl = toAbsolutePhotoUrl(item.photo);
                const photoLine = photoUrl ? `\n   Сүрөт: ${photoUrl}` : "";
                return `${index + 1}. ${item.title}${size}\n   Саны: ${item.quantity}\n   Баасы: ${item.price} сом\n   Сумма: ${lineTotal} сом${photoLine}`;
            })
            .join("\n\n");

        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

        const photoUrls = [...new Set(cart.map((item) => toAbsolutePhotoUrl(item.photo)).filter(Boolean))];
        const photosBlock = photoUrls.length ? `${photoUrls.join("\n")}\n\n` : "";

        let message = `${photosBlock}Жаңы заказ:\n\n${orderList}\n\nЖалпы сумма: ${total} сом`;
        if (name.trim()) message += `\nКардар: ${name.trim()}`;
        if (phone.trim()) message += `\nТелефон: ${phone.trim()}`;

        const encoded = encodeURIComponent(message);
        const waUrl = `https://wa.me/996700880074?text=${encoded}`;
        const link = document.createElement("a");
        link.href = waUrl;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.title = "WhatsApp аркылуу баарлашуу";
        document.body.appendChild(link);
        link.click();
        link.remove();
        return true;
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, updateQuantity, updateItemSize, removeFromCart, sendOrder }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within CartProvider");
    return context;
};