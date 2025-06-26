import React, { useState } from 'react';
import { ChatMessage } from '../types/chat';
import { MessageList } from './MessageList';
import { InputBar } from './InputBar';
import { fetchChatResponse } from './chatApi'; // Make sure this is correct

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content:
        "Hello! I'm your AI assistant. I can help you with coding questions, explain concepts, and assist with your development work.\n\nYou can reference files in your workspace by typing `@` followed by the filename.",
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

    setMessages((prev) => [...prev, userMessage]);
    setIsProcessing(true);

    try {
      const aiContent = await fetchChatResponse(content);

      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: aiContent,
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      const errorResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content:
          '⚠️ Failed to get response from AI: ' + (error as Error).message,
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <div className="flex-shrink-0 bg-gray-800 border-b border-gray-700 px-4 py-3">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-lg font-semibold text-gray-100">AI Assistant</h1>
          <p className="text-sm text-gray-400">
            Your coding companion in VS Code
          </p>
        </div>
      </div>

      <MessageList messages={messages} />

      {isProcessing && (
        <div className="flex-shrink-0 px-4 py-2 bg-gray-900">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 text-gray-400">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                  style={{ animationDelay: '0.1s' }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                  style={{ animationDelay: '0.2s' }}
                ></div>
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
