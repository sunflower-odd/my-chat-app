import React, { useEffect, useRef } from 'react';
import Message from './Message';
import TypingIndicator from './TypingIndicator';
import type { MessageType } from '../types/message';

interface MessagesListProps {
  messages: MessageType[];
  isLoading: boolean;
}

const MessagesList: React.FC<MessagesListProps> = ({ messages, isLoading }) => {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col bg-white dark:bg-gray-900 h-full">
      {messages.length === 0 && <div>Нет сообщений</div>}

      {messages.map((msg) => (
        <Message
          key={msg.id}
          content={msg.content}
          variant={msg.role}
          timestamp={msg.timestamp}
        />
      ))}

      <TypingIndicator isVisible={isLoading} />
      <div ref={endRef} />
    </div>
  );
};

export default MessagesList;