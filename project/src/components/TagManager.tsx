import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, X } from 'lucide-react';
import { Tag, TagColor, TAG_COLORS } from '../types';

interface TagManagerProps {
  tags: Tag[];
  onCreateTag: (name: string, color: TagColor) => void;
  onUpdateTag: (id: string, name: string, color: TagColor) => void;
  onDeleteTag: (id: string) => void;
  onClose: () => void;
}

const TagManager: React.FC<TagManagerProps> = ({
  tags,
  onCreateTag,
  onUpdateTag,
  onDeleteTag,
  onClose
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [editingTagId, setEditingTagId] = useState<string | null>(null);
  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState<TagColor>('blue');

  const filteredTags = tags.filter(
    tag => tag.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateTag = () => {
    if (newTagName.trim()) {
      onCreateTag(newTagName.trim(), newTagColor);
      setNewTagName('');
      setNewTagColor('blue');
      setIsCreating(false);
    }
  };

  const handleUpdateTag = (id: string) => {
    if (newTagName.trim()) {
      onUpdateTag(id, newTagName.trim(), newTagColor);
      setNewTagName('');
      setNewTagColor('blue');
      setEditingTagId(null);
    }
  };

  const startEditing = (tag: Tag) => {
    setEditingTagId(tag.id);
    setNewTagName(tag.name);
    setNewTagColor(tag.color as TagColor);
  };

  const cancelEditing = () => {
    setEditingTagId(null);
    setNewTagName('');
    setNewTagColor('blue');
  };

  const colorOptions: TagColor[] = ['gray', 'red', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Manage Tags</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div className="relative flex-grow max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
              placeholder="Search tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5"
          >
            <Plus size={16} className="mr-1.5" />
            Create Tag
          </button>
        </div>
        
        <div className="overflow-y-auto p-4 flex-grow">
          {isCreating && (
            <div className="mb-4 p-4 border border-blue-200 rounded-lg bg-blue-50">
              <h3 className="text-sm font-medium mb-2">Create new tag</h3>
              <div className="flex items-center mb-3">
                <label className="block text-sm font-medium text-gray-700 w-24">Name:</label>
                <input
                  type="text"
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter tag name"
                  autoFocus
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Color:</label>
                <div className="flex gap-2 flex-wrap">
                  {colorOptions.map(color => (
                    <button
                      key={color}
                      onClick={() => setNewTagColor(color)}
                      className={`w-8 h-8 rounded-full bg-${color}-500 ${newTagColor === color ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                      aria-label={`${color} color`}
                    />
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button 
                  onClick={() => setIsCreating(false)}
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
          )}
          
          {filteredTags.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {searchTerm ? 'No tags found matching your search.' : 'No tags have been created yet.'}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredTags.map(tag => (
                <div 
                  key={tag.id} 
                  className={`p-3 border ${editingTagId === tag.id ? 'border-blue-300 bg-blue-50' : 'border-gray-200'} rounded-lg`}
                >
                  {editingTagId === tag.id ? (
                    <div>
                      <div className="flex items-center mb-3">
                        <label className="block text-sm font-medium text-gray-700 w-24">Name:</label>
                        <input
                          type="text"
                          value={newTagName}
                          onChange={(e) => setNewTagName(e.target.value)}
                          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          placeholder="Enter tag name"
                          autoFocus
                        />
                      </div>
                      <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Color:</label>
                        <div className="flex gap-2 flex-wrap">
                          {colorOptions.map(color => (
                            <button
                              key={color}
                              onClick={() => setNewTagColor(color)}
                              className={`w-8 h-8 rounded-full bg-${color}-500 ${newTagColor === color ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                              aria-label={`${color} color`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={cancelEditing}
                          className="px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                        >
                          Cancel
                        </button>
                        <button 
                          onClick={() => handleUpdateTag(tag.id)}
                          className="px-3 py-1.5 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-md transition-colors"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div 
                          className={`w-4 h-4 rounded-full ${TAG_COLORS[tag.color as TagColor]?.bgClass || 'bg-gray-500'} mr-3`}
                        ></div>
                        <span className="font-medium">{tag.name}</span>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => startEditing(tag)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => onDeleteTag(tag.id)}
                          className="text-gray-500 hover:text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TagManager;