import React, { useState } from 'react';
import { ChatMessage } from '../types/chat';
import { MessageList } from './MessageList';
import { InputBar } from './InputBar';

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI assistant. I can help you with coding questions, explain concepts, and assist with your development work. \n\nYou can reference files in your workspace by typing `@` followed by the filename.',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);

  const [isProcessing, setIsProcessing] = useState(false);

  const handleSendMessage = async (content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: generateMockResponse(content),
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsProcessing(false);
    }, 1000 + Math.random() * 2000);
  };

  const generateMockResponse = (userInput: string): string => {
    // Simple mock responses based on user input
    if (userInput.toLowerCase().includes('hello') || userInput.toLowerCase().includes('hi')) {
      return 'Hello! How can I assist you with your development work today?';
    }
    
    if (userInput.includes('@')) {
      return 'I see you\'re referencing a file! In a real VS Code extension, I would have access to the file contents and could help you with specific questions about that code.';
    }
    
    if (userInput.toLowerCase().includes('code')) {
      return 'Here\'s an example of how you might structure a React component:\n\n```typescript\nimport React from \'react\';\n\ninterface Props {\n  title: string;\n  onAction: () => void;\n}\n\nexport const MyComponent: React.FC<Props> = ({ title, onAction }) => {\n  return (\n    <div className="p-4">\n      <h2>{title}</h2>\n      <button onClick={onAction}>Click me</button>\n    </div>\n  );\n};\n```\n\nWould you like me to explain any part of this code?';
    }
    
    return 'I understand your question. In a real implementation, I would process your request and provide helpful assistance based on your VS Code workspace context.';
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <div className="flex-shrink-0 bg-gray-800 border-b border-gray-700 px-4 py-3">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-lg font-semibold text-gray-100">AI Assistant</h1>
          <p className="text-sm text-gray-400">Your coding companion in VS Code</p>
        </div>
      </div>
      
      <MessageList messages={messages} />
      
      {isProcessing && (
        <div className="flex-shrink-0 px-4 py-2 bg-gray-900">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 text-gray-400">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span className="text-sm">AI is thinking...</span>
            </div>
          </div>
        </div>
      )}
      
      <InputBar onSendMessage={handleSendMessage} disabled={isProcessing} />
    </div>
  );
};