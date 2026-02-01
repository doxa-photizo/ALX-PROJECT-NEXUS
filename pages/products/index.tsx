import React from "react";
import { GetStaticProps } from "next";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import ProductCard from "@/components/common/ProductCard";
import { Product } from "@/interfaces";
import { fetchProducts } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/router";
import { LayoutGrid, List, Filter, ChevronDown } from "lucide-react";

interface Props {
    products: Product[];
}

const ProductsPage: React.FC<Props> = ({ products }) => {
    const { user, logout } = useAuth();
    const { totalItems } = useCart();
    const router = useRouter();
    const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");

    const handleCartClick = () => {
        router.push("/cart");
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar
                navigationLink={[
                    { label: "Home", href: "/" },
                    { label: "Products", href: "/products" },
                    { label: "About", href: "/about" },
                    { label: "Contact", href: "/contact" },
                ]}
                searchHandlingProps={{ query: "", onSearch: () => { }, onSearchSubmit: (e) => e.preventDefault() }}
                cartSummary={{ totalItems, onCartClick: handleCartClick }}
                userProfile={{
                    isAuthenticated: !!user,
                    username: user?.username,
                    role: user?.role,
                    onLogout: logout,
                }}
            />

            <main className="flex-grow">
                {/* Hero / Header Section */}
                <div className="bg-gray-50 border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Our Collection</h1>
                        <p className="text-gray-500 font-medium max-w-2xl">
                            Explore our curated selection of high-quality products. From electronics to fashion, find everything you need in one place.
                        </p>
                    </div>
                </div>

                {/* Toolbar Section */}
                <div className="sticky top-16 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-black transition-all">
                                <Filter className="h-4 w-4" />
                                Filters
                            </button>
                            <div className="h-6 w-px bg-gray-100 hidden sm:block" />
                            <p className="text-sm font-bold text-gray-400 hidden sm:block">
                                Showing <span className="text-gray-900">{products.length}</span> Products
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100">
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-white shadow-sm text-blue-600" : "text-gray-400 hover:text-gray-600"}`}
                                >
                                    <LayoutGrid className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-white shadow-sm text-blue-600" : "text-gray-400 hover:text-gray-600"}`}
                                >
                                    <List className="h-5 w-5" />
                                </button>
                            </div>
                            <div className="h-6 w-px bg-gray-100" />
                            <button className="flex items-center gap-2 font-bold text-sm text-gray-700 hover:text-blue-600 transition-colors">
                                Sort by: Featured
                                <ChevronDown className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {viewMode === "grid" ? (
                        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {products?.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {products?.map((product) => (
                                <div key={product.id} className="group bg-white rounded-3xl border border-gray-100 p-6 flex gap-8 hover:shadow-xl hover:shadow-gray-100 transition-all">
                                    <div className="w-48 h-48 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0 p-6">
                                        <img src={product.image} alt={product.title} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                    <div className="flex-grow flex flex-col justify-center py-4">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <p className="text-xs font-black text-blue-600 uppercase tracking-widest mb-1">{product.category}</p>
                                                <h3 className="text-xl font-black text-gray-900 group-hover:text-blue-600 transition-colors leading-tight mb-4">{product.title}</h3>
                                            </div>
                                            <p className="text-2xl font-black text-gray-900">${product.price.toFixed(2)}</p>
                                        </div>
                                        <p className="text-gray-500 text-sm font-medium line-clamp-2 mb-6 max-w-2xl">{product.description}</p>
                                        <div className="flex gap-4">
                                            <button
                                                onClick={() => router.push(`/products/${product.id}`)}
                                                className="px-6 py-2.5 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-black transition-all"
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProductsPage;

export const getStaticProps: GetStaticProps = async () => {
    const products = await fetchProducts();
    return {
        props: {
            products,
        },
        // Revalidate every hour
        revalidate: 3600,
    };
};
