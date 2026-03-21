import React, { useState, useRef, useEffect } from 'react';

interface InputAreaProps {
  onSend: (content: string) => void; 
  isLoading: boolean;                
}

const InputArea: React.FC<InputAreaProps> = ({ onSend, isLoading }) => {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Автоподстройка высоты textarea (до 5 строк)
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const newHeight = Math.min(textareaRef.current.scrollHeight, 5 * 24); // 5 строк
      textareaRef.current.style.height = `${newHeight}px`;
    }
  }, [text]);



  const handleSend = () => {
    if (!text.trim() || isLoading) return; // блокируем при пустом вводе или загрузке

    onSend(text);      // вызываем функцию отправки из ChatWindow
    setText('');       // очищаем поле ввода после отправки
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 border-t border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex items-center gap-2">
      {/* Иконка прикрепления изображения */}
      <button className="text-gray-500 hover:text-gray-800 dark:hover:text-white">📎</button>

      {/* Текстовое поле */}
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Напишите сообщение..."
        className="flex-1 resize-none p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Кнопки */}
      <button
        onClick={handleSend}
        disabled={!text.trim()}
        className={`px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50`}
      >
        Отправить
      </button>
      <button className="px-2 py-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-400">
        Стоп
      </button>
    </div>
  );
};

export default InputArea;