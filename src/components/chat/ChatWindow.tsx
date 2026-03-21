import React, { useState } from 'react';
import InputArea from './InputArea';
import ErrorMessage from '../ui/ErrorMessage';
import MessagesList from './MessagesList';
import type { MessageType } from '../types/message';

interface ChatWindowProps {
  onOpenSettings?: () => void;
}

const initialMessages: MessageType[] = [
  { id: 1, role: 'assistant', content: 'Привет! Чем могу помочь?', timestamp: Date.now() - 60000 },
  { id: 2, role: 'user', content: 'Расскажи про React', timestamp: Date.now() - 50000 },
  { id: 3, role: 'assistant', content: 'React — это библиотека для UI 😎', timestamp: Date.now() - 40000 },
  { id: 4, role: 'user', content: 'А что такое компоненты?', timestamp: Date.now() - 30000 },
  { id: 5, role: 'assistant', content: 'Компоненты — это переиспользуемые части UI', timestamp: Date.now() - 20000 },
  { id: 6, role: 'user', content: 'Понял, спасибо!', timestamp: Date.now() - 10000 },
];

const ChatWindow: React.FC<ChatWindowProps> = ({ onOpenSettings }) => {
  const [messages, setMessages] = useState<MessageType[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [error] = useState<string | null>(null);

  // Отправка сообщения пользователя
  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;

    const userMessage: MessageType = {
      id: Date.now(),
      role: 'user',
      content,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Симулируем ответ ассистента через 1–2 секунды
    setTimeout(() => {
      const assistantMessage: MessageType = {
        id: Date.now() + 1,
        role: 'assistant',
        content: 'Это ответ ассистента 😎',
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500 + Math.random() * 500);
  };

  return (
    <div className="flex-1 flex flex-col border-l border-gray-300 dark:border-gray-700">
      {/* Header */}
      <div className="p-4 border-b flex justify-between items-center bg-blue-500">
        <h2 className="text-lg font-semibold text-center flex-1 text-white">Мой чат</h2>
        <button
          className="text-white hover:text-gray-200"
          onClick={onOpenSettings}
        >
          ⚙️
        </button>
      </div>

      {/* Сообщения */}
      <MessagesList messages={messages} isLoading={isLoading} />

      {/* Ошибка */}
      {error && <ErrorMessage text={error} />}

      {/* Поле ввода */}
      <InputArea onSend={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatWindow;