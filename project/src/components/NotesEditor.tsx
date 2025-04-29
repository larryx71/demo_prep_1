import React, { useState } from 'react';
import { Save, X } from 'lucide-react';

interface NotesEditorProps {
  initialContent: string;
  onSave: (content: string) => void;
  onCancel: () => void;
}

const NotesEditor: React.FC<NotesEditorProps> = ({ 
  initialContent, 
  onSave, 
  onCancel 
}) => {
  const [content, setContent] = useState(initialContent);

  const handleSave = () => {
    onSave(content);
  };

  return (
    <div className="border border-gray-300 rounded-md">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-3 rounded-t-md focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
        rows={5}
        placeholder="Add notes about this session..."
        autoFocus
      />
      <div className="flex justify-between items-center p-2 bg-gray-50 rounded-b-md border-t border-gray-200">
        <div className="text-xs text-gray-500">
          Supports basic text formatting
        </div>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="flex items-center px-3 py-1 text-sm text-gray-700 hover:bg-gray-200 rounded transition-colors"
          >
            <X size={14} className="mr-1" />
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center px-3 py-1 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded transition-colors"
          >
            <Save size={14} className="mr-1" />
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotesEditor;