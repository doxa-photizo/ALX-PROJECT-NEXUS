// ...existing code...
import React from "react";
import ProductCard from "@/components/common/ProductCard";
import { ProductCardProp } from "@/interfaces";

interface Props {
  products: ProductCardProp[];
}

const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="mb-8 text-3xl font-bold text-gray-800">Products</h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
// ...existing code...