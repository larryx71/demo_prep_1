import React from 'react';
import * as LucideIcons from 'lucide-react';

interface CategoryCardProps {
  title: string;
  description: string;
  icon: string;
  onClick?: () => void;
  isSelected?: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ 
  title, 
  description, 
  icon, 
  onClick,
  isSelected = false 
}) => {
  // Dynamically get the icon component from Lucide
  const IconComponent = (LucideIcons as any)[icon] || LucideIcons.Activity;

  return (
    <div 
      className={`
        bg-white rounded-lg p-6 border transition-all cursor-pointer group relative overflow-hidden
        ${isSelected 
          ? 'border-blue-400 shadow-md bg-blue-50' 
          : 'border-gray-200 hover:border-blue-200 hover:shadow-md'
        }
      `}
      onClick={onClick}
    >
      <div className="mb-4 relative z-10">
        <IconComponent 
          size={24} 
          className={`
            transition-transform
            ${isSelected 
              ? 'text-blue-700 scale-110' 
              : 'text-blue-600 group-hover:scale-110'
            }
          `} 
        />
      </div>
      <h3 className="font-semibold text-gray-900 mb-2 relative z-10">{title}</h3>
      <p className="text-sm text-gray-600 relative z-10">{description}</p>
      <div 
        className={`
          absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent
          ${isSelected 
            ? 'opacity-100' 
            : 'opacity-0 group-hover:opacity-100'
          }
          transition-opacity
        `} 
      />
    </div>
  );
};

export default CategoryCard;