import React, { useRef, useEffect } from 'react';

interface InputAreaProps {
  onSend: (content: string) => void;
  onStop?: () => void;
  isLoading: boolean;
  value: string; // контролируемое значение
  onChange: (val: string) => void; // контролируемое изменение
}

const InputArea: React.FC<InputAreaProps> = ({ onSend, onStop, isLoading, value, onChange }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Автоподстройка высоты textarea (до 5 строк)
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const lineHeight = 24;
      const maxHeight = 5 * lineHeight;
      const newHeight = Math.min(textareaRef.current.scrollHeight, maxHeight);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  }, [value]);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-3 flex gap-2 items-center border rounded-lg border-[var(--border)] bg-[var(--bg)] w-full max-w-full md:max-w-[800px] mx-auto">
      {/* Иконка прикрепления */}
      <button className="text-[var(--text)] hover:text-[var(--text-h)] text-xl transition">
        📎
      </button>

      {/* Текстовое поле */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Напишите сообщение..."
        className="flex-1 resize-none p-2 rounded border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] min-h-[40px] max-h-[120px] sm:text-base"
      />

      {/* Кнопки отправки / стоп */}
      {isLoading ? (
        <button
          onClick={onStop}
          className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition text-sm sm:text-base"
        >
          Стоп
        </button>
      ) : (
        <button
          onClick={handleSend}
          disabled={!value.trim()}
          className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 transition text-sm sm:text-base"
        >
          Отправить
        </button>
      )}
    </div>
  );
};

export default InputArea;