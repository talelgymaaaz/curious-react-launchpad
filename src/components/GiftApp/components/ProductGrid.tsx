import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '@/types/product';

interface ProductGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onProductClick }) => {
  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>, product: Product) => {
    e.preventDefault();
    onProductClick(product);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <motion.div
          key={product.id}
          className="relative cursor-pointer"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          onClick={() => onProductClick(product)}
          draggable
          onDragEnd={(e) => handleDragEnd(e, product)}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="mt-2">
            <h3 className="text-sm font-medium">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.price} TND</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProductGrid;