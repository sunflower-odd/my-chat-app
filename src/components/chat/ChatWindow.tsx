import React, { useState } from 'react';
import InputArea from './InputArea';
import ErrorMessage from '../ui/ErrorMessage';
import MessagesList from './MessagesList';
import { useChatStore } from '../../stores/useChatStore';
import type { Message } from '../../components/types/types';

interface ChatWindowProps {
  onOpenSettings?: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ onOpenSettings }) => {
  const { chats, activeChatId, addMessage, setLoading, error, isLoading } = useChatStore();
  const [input, setInput] = useState('');

  const activeChat = chats.find((c) => c.id === activeChatId);

  const handleSendMessage = (content: string) => {
    if (!activeChatId || !content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(), // string
      role: 'user',
      content,
      timestamp: new Date().toISOString(), // string
    };

    setLoading(true);
    addMessage(activeChatId, userMessage);
    setInput('');

    // Симуляция ответа ассистента
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Это ответ ассистента 😎',
        timestamp: new Date().toISOString(),
      };
      addMessage(activeChatId, assistantMessage);
      setLoading(false);
    }, 1500 + Math.random() * 500);
  };

  if (!activeChat) return <div className="p-4">Выберите чат</div>;

  return (
    <div className="flex-1 flex flex-col border border-black">
      {/* Header */}
      <div className="p-4 flex justify-between items-center bg-gray-200 text-black border-b border-black">
        <h2 className="text-lg font-semibold flex-1 text-center">{activeChat.title}</h2>
        {onOpenSettings && (
          <button
            className="text-black hover:text-gray-700 transition-colors"
            onClick={onOpenSettings}
          >
            ⚙️
          </button>
        )}
      </div>

      {/* Сообщения */}
      <div className="flex-1 overflow-auto border-b border-black">
        <MessagesList messages={activeChat.messages} isLoading={isLoading} />
      </div>

      {/* Ошибка */}
      {error && <ErrorMessage text={error} />}

      {/* Поле ввода */}
      <div className="border-t border-black">
        <InputArea onSend={handleSendMessage} isLoading={isLoading} value={input} onChange={setInput} />
      </div>
    </div>
  );
};

export default ChatWindow;