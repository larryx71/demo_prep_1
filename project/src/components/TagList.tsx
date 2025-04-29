import React from 'react';
import Tag from './Tag';
import { Tag as TagType } from '../types';

interface TagListProps {
  tags: TagType[];
  onRemove?: (tagId: string) => void;
  isRemovable?: boolean;
  onTagClick?: (tag: TagType) => void;
  size?: 'sm' | 'md';
}

const TagList: React.FC<TagListProps> = ({ 
  tags, 
  onRemove, 
  isRemovable = false,
  onTagClick,
  size = 'md'
}) => {
  if (tags.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Tag 
          key={tag.id} 
          tag={tag} 
          isRemovable={isRemovable} 
          onRemove={onRemove ? () => onRemove(tag.id) : undefined}
          onClick={onTagClick ? () => onTagClick(tag) : undefined}
          size={size}
        />
      ))}
    </div>
  );
};

export default TagList;