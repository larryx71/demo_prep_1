import React from 'react';
import { Info, ToggleLeft, ToggleRight } from 'lucide-react';

interface HeaderProps {
  projectName: string;
  projectId: string;
  showTopTags: boolean;
  onToggleTopTags: () => void;
}

const Header: React.FC<HeaderProps> = ({ projectName, projectId, showTopTags, onToggleTopTags }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="relative">
            <button className="flex items-center text-gray-900 bg-white hover:bg-gray-50 border border-gray-300 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              <span>{projectName} ({projectId})</span>
              <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
              </svg>
            </button>
          </div>
        </div>
        <div className="flex items-center">
          <button
            onClick={onToggleTopTags}
            className="flex items-center text-sm text-gray-600 hover:text-gray-900 mr-8"
          >
            {showTopTags ? (
              <ToggleRight size={20} className="mr-2 text-blue-600" />
            ) : (
              <ToggleLeft size={20} className="mr-2" />
            )}
            Show Top Tags
          </button>
          <button className="inline-flex items-center bg-white hover:bg-gray-50 border border-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            <span>Manage</span>
            <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
            </svg>
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center mb-1">
          <h1 className="text-2xl font-bold text-gray-900 mr-2">Session Replays</h1>
          <Info size={18} className="text-gray-400 cursor-help" />
        </div>
        <p className="text-gray-600">Unlock qualitative insights by finding the most relevant session replays to watch</p>
      </div>
    </div>
  );
};

export default Header;