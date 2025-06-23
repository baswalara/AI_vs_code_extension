import React from 'react';
import { FileItem } from '../types/chat';
import { File } from 'lucide-react';

interface FileDropdownProps {
  files: FileItem[];
  onSelectFile: (file: FileItem) => void;
  selectedIndex: number;
  isVisible: boolean;
}

export const FileDropdown: React.FC<FileDropdownProps> = ({
  files,
  onSelectFile,
  selectedIndex,
  isVisible
}) => {
  if (!isVisible || files.length === 0) return null;

  return (
    <div className="absolute bottom-full left-0 right-0 mb-2 bg-gray-800 border border-gray-600 rounded-lg shadow-lg max-h-48 overflow-y-auto z-50">
      <div className="py-2">
        {files.map((file, index) => (
          <button
            key={file.path}
            onClick={() => onSelectFile(file)}
            className={`
              w-full px-4 py-2 text-left hover:bg-gray-700 flex items-center gap-3
              ${index === selectedIndex ? 'bg-gray-600 text-gray-100' : 'text-gray-200'}
            `}
          >
            <File size={16} className="flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">{file.name}</div>
              <div className="text-xs text-gray-400 truncate">{file.path}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};