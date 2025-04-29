import React, { useState } from 'react';
import { X, Play, Tag as TagIcon, MessageSquare, ExternalLink } from 'lucide-react';
import { SessionReplay, Tag, SessionNote } from '../types';
import TagList from './TagList';
import TagSelector from './TagSelector';
import SessionNotes from './SessionNotes';
import Modal from './Modal';
import { mockTags } from '../data/mockData';

interface SessionDetailsProps {
  session: SessionReplay;
  isOpen: boolean;
  onClose: () => void;
}

const SessionDetails: React.FC<SessionDetailsProps> = ({ session, isOpen, onClose }) => {
  const [sessionData, setSessionData] = useState<SessionReplay>(session);
  const [showTagSelector, setShowTagSelector] = useState(false);

  // In a real app, these would update the backend
  const handleTagSelect = (tag: Tag) => {
    const newTags = [...sessionData.tags, tag];
    setSessionData({
      ...sessionData,
      tags: newTags
    });
  };

  const handleTagRemove = (tagId: string) => {
    const newTags = sessionData.tags.filter(tag => tag.id !== tagId);
    setSessionData({
      ...sessionData,
      tags: newTags
    });
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
    
    // Add to session tags
    handleTagSelect(newTag);
  };

  const handleAddNote = (content: string) => {
    const newNote: SessionNote = {
      id: Date.now().toString(),
      content,
      createdBy: 'current-user',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setSessionData({
      ...sessionData,
      notes: [...sessionData.notes, newNote]
    });
  };

  const handleEditNote = (id: string, content: string) => {
    const updatedNotes = sessionData.notes.map(note => 
      note.id === id ? { ...note, content, updatedAt: new Date() } : note
    );
    
    setSessionData({
      ...sessionData,
      notes: updatedNotes
    });
  };

  const handleDeleteNote = (id: string) => {
    const updatedNotes = sessionData.notes.filter(note => note.id !== id);
    
    setSessionData({
      ...sessionData,
      notes: updatedNotes
    });
  };

  // Available tags minus already selected ones
  const availableTags = mockTags.filter(
    tag => !sessionData.tags.some(t => t.id === tag.id)
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold">Session Details</h2>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
      </div>
      
      <div className="grid grid-cols-12 gap-6">
        {/* Video Preview */}
        <div className="col-span-12 lg:col-span-7 p-6 border-b lg:border-b-0 lg:border-r border-gray-200">
          <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-6">
            <div className="text-center">
              <Play size={48} className="mx-auto mb-2 text-gray-400" />
              <p className="text-gray-500">Session video placeholder</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              <Play size={16} className="mr-2" fill="currentColor" />
              Watch session
            </button>
            
            <button className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900">
              <ExternalLink size={16} className="mr-2" />
              Open in new tab
            </button>
          </div>
        </div>
        
        {/* Session Info */}
        <div className="col-span-12 lg:col-span-5 p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase mb-1">User</h3>
              <p className="text-md text-blue-600">{sessionData.userEmail}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase mb-1">Time</h3>
              <p className="text-md">{sessionData.time}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase mb-1">Session Length</h3>
              <p className="text-md">{sessionData.sessionLength}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase mb-1">Country</h3>
              <p className="text-md flex items-center">
                <span className="mr-1.5">🇺🇸</span>
                {sessionData.country}
              </p>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-medium text-gray-500 uppercase">Tags</h3>
                <button 
                  className="text-sm text-blue-600 hover:text-blue-800"
                  onClick={() => setShowTagSelector(!showTagSelector)}
                >
                  {sessionData.tags.length > 0 ? 'Edit tags' : '+ Add tags'}
                </button>
              </div>
              
              <div className="relative">
                {sessionData.tags.length > 0 ? (
                  <TagList 
                    tags={sessionData.tags} 
                    onRemove={handleTagRemove} 
                    isRemovable={true} 
                  />
                ) : (
                  <p className="text-sm text-gray-500">No tags added yet</p>
                )}
                
                {showTagSelector && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg p-3">
                    <TagSelector 
                      availableTags={availableTags}
                      selectedTags={sessionData.tags}
                      onTagSelect={handleTagSelect}
                      onTagRemove={handleTagRemove}
                      onTagCreate={handleTagCreate}
                      placeholder="Search or create tags..."
                    />
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <SessionNotes 
                notes={sessionData.notes}
                onAddNote={handleAddNote}
                onEditNote={handleEditNote}
                onDeleteNote={handleDeleteNote}
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SessionDetails;