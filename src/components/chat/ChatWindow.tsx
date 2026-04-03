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
  const { chats, activeChatId, addMessage, setLoading, setError, error, isLoading } = useChatStore();
  const [input, setInput] = useState('');

  // Находим активный чат
  const activeChat = chats.find((c) => c.id === activeChatId);

  // РАННИЙ возврат, если чат не выбран
  if (!activeChat) return <div className="p-4">Выберите чат</div>;

  // ✅ Деструктуризация после проверки, чтобы TS знал что activeChat точно существует
  const { id: activeChatIdSafe, title, messages } = activeChat;

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };

    setLoading(true);
    addMessage(activeChatIdSafe, userMessage);
    setInput('');

    try {
      // Отправка на сервер
      const response = await fetch('http://localhost:3001/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: messages.concat(userMessage),
        }),
      });

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.choices[0].message.content,
        timestamp: new Date().toISOString(),
      };

      addMessage(activeChatIdSafe, assistantMessage);
    } catch (e) {
      setError('Ошибка при запросе к GigaChat');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col border border-black">
      {/* Header */}
      <div className="p-4 flex justify-between items-center bg-gray-200 text-black border-b border-black">
        <h2 className="text-lg font-semibold flex-1 text-center">{title}</h2>
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
        <MessagesList messages={messages} isLoading={isLoading} />
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