import React, { useState } from 'react';
import { Filter, Search, Plus } from 'lucide-react';
import { Tag } from '../types';
import TagSelector from './TagSelector';
import { mockTags } from '../data/mockData';

interface FilterBarProps {
  onFilterChange: (filters: { tags: Tag[] }) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState<'1d' | '7d' | '30d' | 'custom'>('1d');
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [showTagFilter, setShowTagFilter] = useState(false);

  const handleTagSelect = (tag: Tag) => {
    const newSelectedTags = [...selectedTags, tag];
    setSelectedTags(newSelectedTags);
    onFilterChange({ tags: newSelectedTags });
  };

  const handleTagRemove = (tagId: string) => {
    const newSelectedTags = selectedTags.filter(tag => tag.id !== tagId);
    setSelectedTags(newSelectedTags);
    onFilterChange({ tags: newSelectedTags });
  };

  const handleTagCreate = (name: string, color: string) => {
    const newTag: Tag = {
      id: Date.now().toString(),
      name,
      color,
      createdBy: 'current-user',
      createdAt: new Date()
    };
    
    // In a real app, you would save this to your backend
    console.log('Creating new tag:', newTag);
    
    // Add to selected tags
    handleTagSelect(newTag);
  };
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex space-x-1">
          <button 
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${activeFilter === '1d' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
            onClick={() => setActiveFilter('1d')}
          >
            1d
          </button>
          <button 
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${activeFilter === '7d' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
            onClick={() => setActiveFilter('7d')}
          >
            7d
          </button>
          <button 
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${activeFilter === '30d' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
            onClick={() => setActiveFilter('30d')}
          >
            30d
          </button>
          <button 
            className={`hidden sm:flex items-center px-3 py-1.5 text-sm rounded-md transition-colors ${activeFilter === 'custom' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
            onClick={() => setActiveFilter('custom')}
          >
            <svg className="w-4 h-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            Custom
          </button>
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative">
            <button 
              className={`flex items-center px-3 py-1.5 text-sm rounded-md transition-colors ${showTagFilter || selectedTags.length > 0 ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
              onClick={() => setShowTagFilter(!showTagFilter)}
            >
              <Filter size={16} className="mr-1.5" />
              Tags
              {selectedTags.length > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 text-xs bg-blue-200 text-blue-800 rounded-full">
                  {selectedTags.length}
                </span>
              )}
            </button>
            
            {showTagFilter && (
              <div className="absolute z-10 mt-1 right-0 bg-white border border-gray-200 rounded-md shadow-lg p-3 w-72">
                <TagSelector 
                  availableTags={mockTags}
                  selectedTags={selectedTags}
                  onTagSelect={handleTagSelect}
                  onTagRemove={handleTagRemove}
                  onTagCreate={handleTagCreate}
                  placeholder="Search or create tags..."
                />
              </div>
            )}
          </div>
          
          <button className="flex items-center px-3 py-1.5 text-sm hover:bg-gray-100 rounded-md transition-colors">
            <Search size={16} className="mr-1.5" />
            Search
          </button>
          
          <button className="inline-flex items-center px-3 py-1.5 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-md transition-colors">
            <Plus size={16} className="mr-1.5" />
            Add Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;