import React, { useState } from 'react';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { SessionNote } from '../types';
import NotesEditor from './NotesEditor';

interface SessionNotesProps {
  notes: SessionNote[];
  onAddNote: (content: string) => void;
  onEditNote: (id: string, content: string) => void;
  onDeleteNote: (id: string) => void;
}

const SessionNotes: React.FC<SessionNotesProps> = ({ 
  notes, 
  onAddNote, 
  onEditNote, 
  onDeleteNote 
}) => {
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);

  const handleAddNote = (content: string) => {
    onAddNote(content);
    setIsAddingNote(false);
  };

  const handleEditNote = (id: string, content: string) => {
    onEditNote(id, content);
    setEditingNoteId(null);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Notes</h3>
        {!isAddingNote && (
          <button
            onClick={() => setIsAddingNote(true)}
            className="flex items-center text-sm text-blue-600 hover:text-blue-800"
          >
            <Plus size={16} className="mr-1" />
            Add Note
          </button>
        )}
      </div>

      {isAddingNote && (
        <NotesEditor 
          initialContent=""
          onSave={handleAddNote}
          onCancel={() => setIsAddingNote(false)}
        />
      )}

      {notes.length === 0 && !isAddingNote ? (
        <div className="text-center py-6 text-gray-500">
          <p>No notes yet for this session.</p>
          <button 
            onClick={() => setIsAddingNote(true)}
            className="mt-2 text-blue-600 hover:text-blue-800"
          >
            Add the first note
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {notes.map((note) => (
            <div 
              key={note.id} 
              className="bg-white border border-gray-200 rounded-md p-3"
            >
              {editingNoteId === note.id ? (
                <NotesEditor 
                  initialContent={note.content}
                  onSave={(content) => handleEditNote(note.id, content)}
                  onCancel={() => setEditingNoteId(null)}
                />
              ) : (
                <>
                  <div className="text-sm whitespace-pre-wrap mb-2">{note.content}</div>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <div>
                      Added by {note.createdBy} • {formatDate(note.createdAt)}
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setEditingNoteId(note.id)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button 
                        onClick={() => onDeleteNote(note.id)}
                        className="text-gray-500 hover:text-red-600"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SessionNotes;