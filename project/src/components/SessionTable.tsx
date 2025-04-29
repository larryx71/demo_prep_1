import React, { useState } from 'react';
import { Play, AlertTriangle, Info } from 'lucide-react';
import { SessionReplay, Tag } from '../types';
import TagList from './TagList';
import SessionDetails from './SessionDetails';

interface SessionTableProps {
  sessions: SessionReplay[];
  onTagClick: (tag: Tag) => void;
}

const SessionTable: React.FC<SessionTableProps> = ({ sessions, onTagClick }) => {
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

  const handleRowClick = (sessionId: string) => {
    setSelectedSessionId(sessionId === selectedSessionId ? null : sessionId);
  };

  const handleCloseDetails = () => {
    setSelectedSessionId(null);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-3/12">
                Time
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-3/12">
                <div className="flex items-center">
                  User ID
                  <Info size={14} className="ml-1 text-gray-400" />
                </div>
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">
                <div className="flex items-center">
                  Session Length
                  <Info size={14} className="ml-1 text-gray-400" />
                </div>
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">
                Country
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">
                Tags
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sessions.map((session) => (
              <React.Fragment key={session.id}>
                <tr 
                  className={`hover:bg-gray-50 cursor-pointer transition-colors ${selectedSessionId === session.id ? 'bg-blue-50' : ''}`}
                  onClick={() => handleRowClick(session.id)}
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center">
                        <Play size={16} className={`text-gray-400 ${selectedSessionId === session.id ? 'text-blue-500' : ''}`} />
                      </div>
                      <div className="ml-2">
                        <div className="text-sm font-medium text-gray-900 flex items-center">
                          {session.time}
                          {session.hasWarning && (
                            <AlertTriangle size={14} className="ml-1.5 text-yellow-500" />
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-blue-600">{session.userEmail}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{session.sessionLength}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center">
                      <span className="mr-1.5">🇺🇸</span>
                      {session.country}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {session.tags.length > 0 ? (
                      <TagList tags={session.tags} size="sm" onTagClick={onTagClick} />
                    ) : (
                      <span className="text-sm text-gray-500">—</span>
                    )}
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
        
        {selectedSessionId && (
          <SessionDetails
            session={sessions.find(s => s.id === selectedSessionId)!}
            isOpen={true}
            onClose={handleCloseDetails}
          />
        )}
      </div>
    </div>
  );
};

export default SessionTable;