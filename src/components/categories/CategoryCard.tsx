import { Category } from '../../types';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link to={`/category/${category.slug}`}>
      <div className="relative h-64 rounded-lg overflow-hidden group cursor-pointer">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300 flex flex-col items-center justify-center">
          <h3 className="text-3xl font-bold text-white mb-2">{category.name}</h3>
          <p className="text-white/90 text-sm mb-4">{category.productCount} products</p>
          <div className="flex items-center gap-2 text-white bg-white/20 px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Shop Now
            <ChevronRight size={18} />
          </div>
        </div>
      </div>
    </Link>
  );
}
