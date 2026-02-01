import React, { useState } from "react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { Star, ShoppingCart, ArrowLeft } from "lucide-react";
import { fetchProduct } from "@/lib/api";
import { Product } from "@/interfaces";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

interface ProductDetailsProps {
    product: Product;
}

const ProductDetailsPage: React.FC<ProductDetailsProps> = ({ product }) => {
    const { user, logout } = useAuth();
    const { addToCart, totalItems } = useCart();
    const router = useRouter();
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        addToCart(product, quantity);
        // Optional: Show toast notification
        alert("Added to cart!");
    };

    if (router.isFallback) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar
                navigationLink={[
                    { label: "Home", href: "/" },
                    { label: "Products", href: "/products" },
                    { label: "About", href: "/about" },
                    { label: "Contact", href: "/contact" },
                ]}
                userProfile={{
                    isAuthenticated: !!user,
                    username: user?.username || "User",
                    role: user?.role,
                    onLogout: logout,
                }}
                searchHandlingProps={{ query: "", onSearch: () => { }, onSearchSubmit: (e) => e.preventDefault() }}
                cartSummary={{ totalItems: totalItems, onCartClick: () => router.push('/cart') }}
            />

            <main className="flex-grow container mx-auto px-4 py-8">
                <button
                    onClick={() => router.back()}
                    className="flex items-center text-gray-600 hover:text-blue-600 mb-6 transition-colors"
                >
                    <ArrowLeft className="h-5 w-5 mr-1" /> Back to Products
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Image Section */}
                    <div className="bg-gray-50 rounded-2xl p-8 flex items-center justify-center h-[500px]">
                        <div className="relative w-full h-full">
                            <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                className="object-contain mix-blend-multiply"
                                priority
                            />
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="flex flex-col justify-center">
                        <span className="text-blue-600 font-medium tracking-wide uppercase text-sm mb-2">
                            {product.category}
                        </span>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                            {product.title}
                        </h1>

                        <div className="flex items-center mb-6">
                            <div className="flex text-yellow-400 mr-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-5 w-5 ${i < Math.round(product.rating.rate) ? "fill-current" : "text-gray-300"
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className="text-gray-500 text-sm">
                                ({product.rating.count} reviews)
                            </span>
                        </div>

                        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                            {product.description}
                        </p>

                        <div className="flex items-end justify-between mb-8 border-b border-gray-100 pb-8">
                            <div>
                                <span className="text-gray-500 text-sm block mb-1">Price</span>
                                <span className="text-4xl font-bold text-gray-900">${product.price}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center border border-gray-300 rounded-lg">
                                <button
                                    className="px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-l-lg"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                >
                                    -
                                </button>
                                <span className="px-4 py-3 font-medium text-gray-900 min-w-[3rem] text-center">
                                    {quantity}
                                </span>
                                <button
                                    className="px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-r-lg"
                                    onClick={() => setQuantity(quantity + 1)}
                                >
                                    +
                                </button>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-blue-600 text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2 transform active:scale-95"
                            >
                                <ShoppingCart className="h-5 w-5" />
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params as { id: string };
    try {
        const product = await fetchProduct(id);
        return {
            props: {
                product,
            },
        };
    } catch (error) {
        return {
            notFound: true,
        };
    }
};

export default ProductDetailsPage;
