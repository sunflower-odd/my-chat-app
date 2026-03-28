import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface MessageProps {
  variant: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

const Message: React.FC<MessageProps> = ({ variant, content, timestamp }) => {
  const [copied, setCopied] = useState(false); // ✅ Состояние для показа "Скопировано"

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content); // ✅ Копируем текст в буфер
      setCopied(true); // ✅ Показываем обратную связь
      setTimeout(() => setCopied(false), 2000); // ✅ Через 2 секунды скрываем
    } catch (err) {
      console.error('Ошибка копирования', err);
    }
  };

  return (
    <div
      className={`flex ${variant === 'user' ? 'justify-end' : 'justify-start'} my-1 relative group`}
      // ✅ Добавлен класс group для hover внутри сообщения
    >
      <div
        className={`
          w-auto max-w-[80%] p-3 rounded-lg
          ${variant === 'user' ? 'bg-blue-100 text-gray-900' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100'}
          relative
        `}
      >
        {/* Сообщение */}
        <ReactMarkdown>{content}</ReactMarkdown>

        {/* Время */}
        <div className="text-xs text-gray-500 mt-1">
          {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>

        {/* ✅ Кнопка Копировать, видна только при hover на сообщении */}
        {variant === 'assistant' && (
          <button
            onClick={handleCopy}
            className={`
              absolute top-2 right-2 text-sm px-2 py-1 rounded
              bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white
              opacity-0 group-hover:opacity-100 transition-opacity
            `}
          >
            {copied ? 'Скопировано ✅' : '📋 Копировать'}
          </button>
        )}
      </div>
    </div>
  );
};

export default Message;