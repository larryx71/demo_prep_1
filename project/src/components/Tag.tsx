import React from 'react';
import { X } from 'lucide-react';
import { Tag as TagType, TAG_COLORS } from '../types';

interface TagProps {
  tag: TagType;
  onRemove?: () => void;
  isRemovable?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md';
}

const Tag: React.FC<TagProps> = ({ 
  tag, 
  onRemove, 
  isRemovable = false, 
  onClick,
  size = 'md'
}) => {
  const colorClasses = TAG_COLORS[tag.color as keyof typeof TAG_COLORS] || TAG_COLORS.gray;
  
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.stopPropagation();
      onClick();
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    if (onRemove) {
      e.stopPropagation();
      onRemove();
    }
  };

  return (
    <div 
      className={`inline-flex items-center ${colorClasses.bgClass} ${colorClasses.textClass} border ${colorClasses.borderClass} rounded-md transition-all hover:shadow-sm ${size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'}`}
      onClick={handleClick}
    >
      <span className="whitespace-nowrap">{tag.name}</span>
      {isRemovable && (
        <button 
          onClick={handleRemove}
          className="ml-1.5 hover:text-gray-900 focus:outline-none"
          aria-label={`Remove ${tag.name} tag`}
        >
          <X size={size === 'sm' ? 12 : 14} />
        </button>
      )}
    </div>
  );
};

export default Tag;