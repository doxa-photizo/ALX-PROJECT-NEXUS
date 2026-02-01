import React from "react";
import { Product } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

interface Props {
  product: Product;
  onAddToCart?: (id: number) => void;
}

const ProductCard: React.FC<Props> = ({ product, onAddToCart }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product.id);
    } else {
      addToCart(product);
      alert("Added to cart!"); // Simple feedback
    }
  };

  return (
    <div className="group rounded-lg border bg-white p-4 shadow-sm hover:shadow-md flex flex-col h-full">
      <Link href={`/products/${product.id}`} className="block relative h-48 w-full overflow-hidden rounded-md bg-gray-100 mb-4">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-4 transition-transform group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-col flex-grow space-y-2">
        <Link href={`/products/${product.id}`} className="hover:text-blue-600 transition-colors">
          <h2 className="text-lg font-bold text-gray-900 line-clamp-1" title={product.title}>{product.title}</h2>
        </Link>
        <p className="line-clamp-2 text-sm text-gray-500 flex-grow">{product.description}</p>

        <div className="flex items-center justify-between pt-2">
          <p className="text-xl font-semibold text-blue-600">${product.price.toFixed(2)}</p>
          <p className="text-xs text-gray-400">
            {product.rating?.count ?? 0} reviews • {product.rating?.rate ?? 0}★
          </p>
        </div>

        <button
          className="w-full rounded-md py-2 font-medium bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition-all mt-4"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;