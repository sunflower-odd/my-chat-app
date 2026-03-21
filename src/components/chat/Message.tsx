import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MessageProps {
  variant: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

const Message: React.FC<MessageProps> = ({ variant, content, timestamp }) => {
  return (
    <div className={`flex ${variant === 'user' ? 'justify-end' : 'justify-start'} my-1`}>
      <div
        className={`
          w-auto
          max-w-[80%]
          p-3
          rounded-lg
          ${variant === 'user'
            ? 'text-gray-700'
            : 'text-black'}   
        `}
      >
        <ReactMarkdown>{content}</ReactMarkdown>
        <div className="text-xs text-gray-500 mt-1">
          {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default Message;