import React from 'react';
import { motion } from 'framer-motion';
import ProductGrid from './ProductGrid';
import { useQuery } from '@tanstack/react-query';
import { fetchAllProducts } from '@/services/productsApi';

const Products = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchAllProducts,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#700100]"></div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white">
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f1f1;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 3px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
        `}
      </style>
      
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Produits</h1>
        <ProductGrid products={products} onProductClick={(product) => console.log(product)} />
      </div>
    </div>
  );
};

export default Products;
