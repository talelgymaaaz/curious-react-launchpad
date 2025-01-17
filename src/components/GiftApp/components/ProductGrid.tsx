import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '@/types/product';

interface ProductGridProps {
  products: Product[];
  onDragStart: (e: React.DragEvent<HTMLDivElement>, product: Product) => void;
  onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onDragStart, onDragEnd }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
      {products.map((product) => (
        <motion.div
          key={product.id}
          draggable
          onDragStart={(e) => onDragStart(e, product)}
          onDragEnd={onDragEnd}
          className="cursor-grab active:cursor-grabbing"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="bg-white p-2 rounded-lg shadow-sm">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-32 object-cover rounded"
            />
            <div className="mt-2">
              <h3 className="text-sm font-medium truncate">{product.name}</h3>
              <p className="text-xs text-gray-500">{product.price} TND</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProductGrid;