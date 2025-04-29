import React from 'react';
import CategoryCard from './CategoryCard';
import { mockCategories } from '../data/mockData';
import { Tag } from '../types';

interface CategoriesProps {
  showTopTags?: boolean;
  topTags?: Tag[];
  onTagClick?: (tag: Tag) => void;
  selectedTags?: Tag[];
}

const Categories: React.FC<CategoriesProps> = ({ 
  showTopTags = false, 
  topTags = [], 
  onTagClick,
  selectedTags = []
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {showTopTags && topTags.map((tag) => (
        <CategoryCard
          key={tag.id}
          title={tag.name}
          description={`Filter sessions by ${tag.name.toLowerCase()}`}
          icon="Tag"
          onClick={() => onTagClick?.(tag)}
          isSelected={selectedTags.some(t => t.id === tag.id)}
        />
      ))}
      {mockCategories.map((category) => (
        <CategoryCard
          key={category.id}
          title={category.title}
          description={category.description}
          icon={category.icon}
        />
      ))}
    </div>
  );
};

export default Categories;