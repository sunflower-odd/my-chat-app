// src/components/chat/ChatWindow.tsx
import React, { useState } from 'react';
import InputArea from './InputArea';
import TypingIndicator from './TypingIndicator';
import Message from './Message';
import ErrorMessage from '../ui/ErrorMessage';
import EmptyState from '../ui/EmptyState';

type MessageType = {
  id: number;
  role: 'user' | 'assistant';
  content: string;
};

interface ChatWindowProps {
  onOpenSettings?: () => void;
}

const mockMessages: MessageType[] = [
  { id: 1, role: 'assistant', content: 'Привет! Чем могу помочь?' },
  { id: 2, role: 'user', content: 'Расскажи про React' },
  { id: 3, role: 'assistant', content: 'React — это библиотека для UI 😎' },
  { id: 4, role: 'user', content: 'А что такое компоненты?' },
  { id: 5, role: 'assistant', content: 'Компоненты — это переиспользуемые части UI' },
  { id: 6, role: 'user', content: 'Понял, спасибо!' },
];

const ChatWindow: React.FC<ChatWindowProps> = ({ onOpenSettings }) => {
  // const [error, setError] = useState<string | null>(null); // 
  // const error: string | null = null;
  const [error] = useState<string | null>(null);

  return (
    <div className="flex-1 flex flex-col border-l border-gray-300 dark:border-gray-700">
      {/* Header */}
      <div className="p-4 border-b flex justify-between items-center bg-gray-50 dark:bg-gray-800">
        <h2 className="text-lg font-semibold text-center flex-1">Мой чат</h2>
        <button
          className="text-gray-500 hover:text-gray-800 dark:hover:text-white"
          onClick={onOpenSettings}
        >
          ⚙️
        </button>
      </div>

      {/* Сообщения */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white dark:bg-gray-900 flex flex-col">
        {mockMessages.length === 0 && <EmptyState />}
        {mockMessages.map((msg) => (
          <Message
            key={msg.id}
            role={msg.role}
            content={msg.content}
          />
        ))}

        {/* Индикатор печати ассистента */}
        <TypingIndicator isVisible={true} />
      </div>

      {/* Ошибка */}
      {error && <ErrorMessage text={error} />}

      {/* Поле ввода */}
      <InputArea />
    </div>
  );
};

export default ChatWindow;