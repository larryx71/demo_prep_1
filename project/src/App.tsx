import React, { useState } from 'react';
import Header from './components/Header';
import Categories from './components/Categories';
import FilterBar from './components/FilterBar';
import SessionTable from './components/SessionTable';
import TagManager from './components/TagManager';
import { mockSessionReplays, mockTags } from './data/mockData';
import { SessionReplay, Tag, TagColor } from './types';
import { Settings } from 'lucide-react';

function App() {
  const [sessions, setSessions] = useState<SessionReplay[]>(mockSessionReplays);
  const [tags, setTags] = useState<Tag[]>(mockTags);
  const [filters, setFilters] = useState<{ tags: Tag[] }>({ tags: [] });
  const [showTagManager, setShowTagManager] = useState(false);
  const [showTopTags, setShowTopTags] = useState(false);

  // Get top 2 most used tags
  const getTopTags = () => {
    const tagUsage = new Map<string, number>();
    sessions.forEach(session => {
      session.tags.forEach(tag => {
        const count = tagUsage.get(tag.id) || 0;
        tagUsage.set(tag.id, count + 1);
      });
    });

    return tags
      .map(tag => ({
        tag,
        count: tagUsage.get(tag.id) || 0
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 2)
      .map(item => item.tag);
  };

  // Filter sessions based on selected tags
  const filteredSessions = filters.tags.length > 0
    ? sessions.filter(session => 
        filters.tags.every(filterTag => 
          session.tags.some(sessionTag => sessionTag.id === filterTag.id)
        )
      )
    : sessions;

  const handleFilterChange = (newFilters: { tags: Tag[] }) => {
    setFilters(newFilters);
  };

  const handleTagClick = (tag: Tag) => {
    // Toggle the tag filter
    setFilters(currentFilters => {
      const isTagSelected = currentFilters.tags.some(t => t.id === tag.id);
      
      if (isTagSelected) {
        // Remove the tag from filters
        return {
          ...currentFilters,
          tags: currentFilters.tags.filter(t => t.id !== tag.id)
        };
      } else {
        // Add the tag to filters
        return {
          ...currentFilters,
          tags: [...currentFilters.tags, tag]
        };
      }
    });
  };

  // Tag management
  const handleCreateTag = (name: string, color: TagColor) => {
    const newTag: Tag = {
      id: Date.now().toString(),
      name,
      color,
      createdBy: 'current-user',
      createdAt: new Date()
    };
    setTags([...tags, newTag]);
  };

  const handleUpdateTag = (id: string, name: string, color: TagColor) => {
    const updatedTags = tags.map(tag => 
      tag.id === id ? { ...tag, name, color } : tag
    );
    setTags(updatedTags);
    
    // Update tags in sessions
    const updatedSessions = sessions.map(session => ({
      ...session,
      tags: session.tags.map(tag => 
        tag.id === id ? { ...tag, name, color } : tag
      )
    }));
    setSessions(updatedSessions);
  };

  const handleDeleteTag = (id: string) => {
    // Remove tag from list
    const updatedTags = tags.filter(tag => tag.id !== id);
    setTags(updatedTags);
    
    // Remove tag from sessions
    const updatedSessions = sessions.map(session => ({
      ...session,
      tags: session.tags.filter(tag => tag.id !== id)
    }));
    setSessions(updatedSessions);
    
    // Remove tag from filters
    const updatedFilters = {
      ...filters,
      tags: filters.tags.filter(tag => tag.id !== id)
    };
    setFilters(updatedFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        projectName="Amplitude 2.0" 
        projectId="187520"
        showTopTags={showTopTags}
        onToggleTopTags={() => setShowTopTags(!showTopTags)}
      />
      
      <div className="px-6 pb-10">
        <div className="mb-6">
          <Categories 
            showTopTags={showTopTags}
            topTags={getTopTags()}
            onTagClick={handleTagClick}
            selectedTags={filters.tags}
          />
        </div>
        
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-medium text-gray-900">All Sessions</h2>
          <button 
            onClick={() => setShowTagManager(true)}
            className="flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <Settings size={16} className="mr-1.5" />
            Manage Tags
          </button>
        </div>
        
        <FilterBar onFilterChange={handleFilterChange} />
        
        <SessionTable 
          sessions={filteredSessions} 
          onTagClick={handleTagClick}
        />
      </div>
      
      {showTagManager && (
        <TagManager 
          tags={tags}
          onCreateTag={handleCreateTag}
          onUpdateTag={handleUpdateTag}
          onDeleteTag={handleDeleteTag}
          onClose={() => setShowTagManager(false)}
        />
      )}
    </div>
  );
}

export default App;