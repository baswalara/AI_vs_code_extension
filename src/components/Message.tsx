import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import { ChatMessage } from '../types/chat';
import { Bot, User } from 'lucide-react';

interface MessageProps {
  message: ChatMessage;
}

export const Message: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  return (
    <div className={`flex gap-3 mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center">
          <Bot size={16} className="text-gray-200" />
        </div>
      )}
      
      <div className={`max-w-[80%] ${isUser ? 'order-first' : ''}`}>
        <div
          className={`
            px-4 py-3 rounded-2xl
            ${isUser 
              ? 'bg-gray-700 text-gray-100 ml-auto' 
              : 'bg-gray-800 text-gray-100 border border-gray-700'
            }
          `}
        >
          <div className="prose prose-sm max-w-none prose-invert">
            <ReactMarkdown
              rehypePlugins={[rehypeHighlight]}
              components={{
                p: ({ children }) => <p className="mb-2 last:mb-0 text-inherit">{children}</p>,
                code: ({ inline, className, children, ...props }) => {
                  if (inline) {
                    return (
                      <code
                        className={`
                          px-1.5 py-0.5 rounded text-sm font-mono
                          ${isUser 
                            ? 'bg-gray-600 text-gray-200' 
                            : 'bg-gray-700 text-gray-200'
                          }
                        `}
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  }
                  
                  return (
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-3 border border-gray-700">
                      <code className={className} {...props}>
                        {children}
                      </code>
                    </pre>
                  );
                },
                pre: ({ children }) => <>{children}</>,
                h1: ({ children }) => <h1 className="text-xl font-bold mb-3 text-inherit">{children}</h1>,
                h2: ({ children }) => <h2 className="text-lg font-semibold mb-2 text-inherit">{children}</h2>,
                h3: ({ children }) => <h3 className="text-base font-medium mb-2 text-inherit">{children}</h3>,
                ul: ({ children }) => <ul className="list-disc list-inside mb-2 text-inherit">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal list-inside mb-2 text-inherit">{children}</ol>,
                li: ({ children }) => <li className="mb-1 text-inherit">{children}</li>,
                blockquote: ({ children }) => (
                  <blockquote className={`border-l-4 pl-4 my-2 italic ${isUser ? 'border-gray-500' : 'border-gray-600'} text-inherit`}>
                    {children}
                  </blockquote>
                ),
                strong: ({ children }) => <strong className="font-semibold text-inherit">{children}</strong>,
                em: ({ children }) => <em className="italic text-inherit">{children}</em>,
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        </div>
        
        <div className={`text-xs text-gray-500 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
      
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
          <User size={16} className="text-gray-300" />
        </div>
      )}
    </div>
  );
};