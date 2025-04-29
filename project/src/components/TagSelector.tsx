import React, { useState, useRef, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { Tag, TagColor } from '../types';
import TagList from './TagList';

interface TagSelectorProps {
  availableTags: Tag[];
  selectedTags: Tag[];
  onTagSelect: (tag: Tag) => void;
  onTagRemove: (tagId: string) => void;
  onTagCreate?: (name: string, color: TagColor) => void;
  placeholder?: string;
}

const TagSelector: React.FC<TagSelectorProps> = ({
  availableTags,
  selectedTags,
  onTagSelect,
  onTagRemove,
  onTagCreate,
  placeholder = 'Search or create a tag...'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isCreatingTag, setIsCreatingTag] = useState(false);
  const [newTagColor, setNewTagColor] = useState<TagColor>('blue');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter tags based on search value
  const filteredTags = availableTags.filter(tag => 
    tag.name.toLowerCase().includes(searchValue.toLowerCase()) && 
    !selectedTags.some(selectedTag => selectedTag.id === tag.id)
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsCreatingTag(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus input when dropdown opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleInputFocus = () => setIsOpen(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleTagSelect = (tag: Tag) => {
    onTagSelect(tag);
    setSearchValue('');
  };

  const handleCreateTag = () => {
    if (searchValue.trim() && onTagCreate) {
      onTagCreate(searchValue.trim(), newTagColor);
      setSearchValue('');
      setIsCreatingTag(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (isCreatingTag) {
        handleCreateTag();
      } else if (filteredTags.length > 0) {
        handleTagSelect(filteredTags[0]);
      } else if (searchValue.trim() && onTagCreate) {
        setIsCreatingTag(true);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setIsCreatingTag(false);
    }
  };

  const colorOptions: TagColor[] = ['gray', 'red', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink'];

  return (
    <div className="relative min-w-[240px]" ref={dropdownRef}>
      {/* Selected Tags */}
      {selectedTags.length > 0 && (
        <div className="mb-2">
          <TagList 
            tags={selectedTags} 
            onRemove={onTagRemove} 
            isRemovable={true}
          />
        </div>
      )}

      {/* Input Field */}
      <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
        <input
          ref={inputRef}
          type="text"
          value={searchValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-grow text-sm outline-none"
        />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
          {isCreatingTag ? (
            <div className="p-3">
              <div className="text-sm font-medium mb-2">Create new tag</div>
              <div className="flex items-center mb-3">
                <span className="text-sm text-gray-600 mr-2">Tag name:</span>
                <span className="font-medium">{searchValue}</span>
              </div>
              <div className="mb-3">
                <div className="text-sm text-gray-600 mb-1">Select color:</div>
                <div className="flex gap-2 flex-wrap">
                  {colorOptions.map(color => (
                    <button
                      key={color}
                      onClick={() => setNewTagColor(color)}
                      className={`w-6 h-6 rounded-full bg-${color}-500 ${newTagColor === color ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                      aria-label={`${color} color`}
                    />
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button 
                  onClick={() => setIsCreatingTag(false)}
                  className="px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleCreateTag}
                  className="px-3 py-1.5 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-md transition-colors"
                >
                  Create tag
                </button>
              </div>
            </div>
          ) : (
            <>
              {filteredTags.length > 0 ? (
                <div>
                  {filteredTags.map(tag => (
                    <div 
                      key={tag.id} 
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                      onClick={() => handleTagSelect(tag)}
                    >
                      <div className={`w-3 h-3 rounded-full bg-${tag.color}-500 mr-2`}></div>
                      <span>{tag.name}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  {searchValue.trim() ? (
                    <div 
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                      onClick={() => setIsCreatingTag(true)}
                    >
                      <Plus size={16} className="mr-2 text-gray-500" />
                      <span>Create "{searchValue}"</span>
                    </div>
                  ) : (
                    <div className="px-3 py-2 text-gray-500 text-sm">Type to search or create tags</div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TagSelector;