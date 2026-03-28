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
    <div className="flex-1 flex flex-col border border-black"> {/* Единая рамка вокруг всего чата */}

      {/* Header */}
      <div className="p-4 flex justify-between items-center bg-gray-200 text-black border-b border-black">
        <h2 className="text-lg font-semibold flex-1 text-center">Мой чат</h2>
        <button
          className="text-black hover:text-gray-700 transition-colors"
          onClick={onOpenSettings}
        >
          ⚙️
        </button>
      </div>

      {/* Сообщения с прокруткой */}
      <div className="flex-1 overflow-auto border-b border-black"> {/* нижняя рамка совпадает с InputArea */}
        <MessagesList messages={messages} isLoading={isLoading} />
      </div>

      {/* Ошибка */}
      {error && <ErrorMessage text={error} />}

      {/* Поле ввода */}
      <div className="border-t border-black"> {/* рамка сверху поля ввода, чтобы совпадало с остальными */}
        <InputArea onSend={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ChatWindow;