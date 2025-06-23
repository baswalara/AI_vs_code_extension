import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { FileItem } from '../types/chat';
import { FileDropdown } from './FileDropdown';

interface InputBarProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const InputBar: React.FC<InputBarProps> = ({ onSendMessage, disabled = false }) => {
  const [input, setInput] = useState('');
  const [showFileDropdown, setShowFileDropdown] = useState(false);
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const [atPosition, setAtPosition] = useState(-1);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Mock file list - in a real VS Code extension, this would come from the workspace
  const mockFiles: FileItem[] = [
    { name: 'main.js', path: 'src/main.js' },
    { name: 'index.html', path: 'public/index.html' },
    { name: 'App.tsx', path: 'src/App.tsx' },
    { name: 'package.json', path: 'package.json' },
    { name: 'README.md', path: 'README.md' },
    { name: 'styles.css', path: 'src/styles.css' },
  ];

  const [filteredFiles, setFilteredFiles] = useState<FileItem[]>([]);

  useEffect(() => {
    const handleAtSymbol = () => {
      const cursorPosition = inputRef.current?.selectionStart || 0;
      const textBeforeCursor = input.slice(0, cursorPosition);
      const lastAtIndex = textBeforeCursor.lastIndexOf('@');
      
      if (lastAtIndex !== -1) {
        const searchTerm = textBeforeCursor.slice(lastAtIndex + 1);
        const spaceAfterAt = searchTerm.includes(' ');
        
        if (!spaceAfterAt) {
          const filtered = mockFiles.filter(file =>
            file.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setFilteredFiles(filtered);
          setShowFileDropdown(true);
          setAtPosition(lastAtIndex);
          setSelectedFileIndex(0);
        } else {
          setShowFileDropdown(false);
        }
      } else {
        setShowFileDropdown(false);
      }
    };

    handleAtSymbol();
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (showFileDropdown) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedFileIndex(prev => 
          prev < filteredFiles.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedFileIndex(prev => 
          prev > 0 ? prev - 1 : filteredFiles.length - 1
        );
      } else if (e.key === 'Enter' || e.key === 'Tab') {
        e.preventDefault();
        if (filteredFiles[selectedFileIndex]) {
          selectFile(filteredFiles[selectedFileIndex]);
        }
      } else if (e.key === 'Escape') {
        setShowFileDropdown(false);
      }
    } else if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const selectFile = (file: FileItem) => {
    const cursorPosition = inputRef.current?.selectionStart || 0;
    const textBeforeCursor = input.slice(0, cursorPosition);
    const textAfterCursor = input.slice(cursorPosition);
    const lastAtIndex = textBeforeCursor.lastIndexOf('@');
    
    const newInput = 
      input.slice(0, lastAtIndex) + 
      `@${file.name} ` + 
      textAfterCursor;
    
    setInput(newInput);
    setShowFileDropdown(false);
    inputRef.current?.focus();
    
    // Set cursor position after the inserted filename
    setTimeout(() => {
      const newCursorPos = lastAtIndex + file.name.length + 2;
      inputRef.current?.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSendMessage(input.trim());
      setInput('');
      setShowFileDropdown(false);
    }
  };

  const adjustTextareaHeight = () => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);

  return (
    <div className="border-t border-gray-700 bg-gray-800 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          <FileDropdown
            files={filteredFiles}
            onSelectFile={selectFile}
            selectedIndex={selectedFileIndex}
            isVisible={showFileDropdown}
          />
          
          <div className="flex items-end gap-3">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message... (use @ to reference files)"
                disabled={disabled}
                className="
                  w-full px-4 py-3 pr-12 rounded-xl border border-gray-600 bg-gray-700 text-gray-100
                  focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent
                  resize-none overflow-y-auto min-h-[48px] max-h-[120px]
                  disabled:bg-gray-800 disabled:text-gray-500
                  placeholder-gray-400
                "
                rows={1}
              />
            </div>
            
            <button
              onClick={handleSend}
              disabled={!input.trim() || disabled}
              className="
                flex-shrink-0 w-12 h-12 bg-gray-600 hover:bg-gray-500 
                disabled:bg-gray-700 disabled:cursor-not-allowed
                rounded-xl flex items-center justify-center
                transition-colors duration-200
              "
            >
              <Send size={20} className="text-gray-200" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};