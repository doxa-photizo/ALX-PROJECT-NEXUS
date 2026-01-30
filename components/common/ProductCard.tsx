// ...existing code...
import React from "react";
import { ProductCardProp } from "@/interfaces";
import Image from "next/image";

interface Props {
  product: ProductCardProp;
  onAddToCart?: (id: number) => void;
}

const ProductList: React.FC<Props> = ({ product, onAddToCart }) => {
  return (
    <div className="group rounded-lg border bg-white p-4 shadow-sm hover:shadow-md">
      <div className="relative h-48 w-full overflow-hidden rounded-md bg-gray-100">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>

      <div className="mt-4 space-y-2">
        <h2 className="text-lg font-bold text-gray-900">{product.title}</h2>
        <p className="line-clamp-2 text-sm text-gray-500">{product.description}</p>

        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold text-blue-600">${product.price.toFixed(2)}</p>
          <p className="text-xs text-gray-400">
            {product.rating?.count ?? 0} reviews • {product.rating?.rate ?? 0}★
          </p>
        </div>

        <button
          className="w-full rounded-md py-2 font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
          onClick={() => onAddToCart?.(product.id)}
          disabled={!onAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductList;
// ...existing code...