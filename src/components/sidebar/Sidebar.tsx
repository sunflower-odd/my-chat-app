import React from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockChats = [
  { title: 'Приветствие', lastMessage: 'Сегодня 10:30', isActive: true },
  { title: 'Тестовый чат', lastMessage: 'Вчера 18:45', isActive: false },
  { title: 'Рабочие вопросы', lastMessage: 'Сегодня 09:12', isActive: false },
  { title: 'Личный чат', lastMessage: 'Вчера 22:00', isActive: false },
  { title: 'Еще один чат', lastMessage: 'Сегодня 08:00', isActive: false },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`
        fixed inset-y-0 left-0 w-64 bg-[var(--bg)] dark:bg-[var(--bg-dark)] p-4 border-r border-[var(--border)]
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 md:relative md:flex
        flex flex-col h-screen
      `}
    >
      {/* ===== Кнопка закрытия только на мобильных ===== */}
      <button
        className="mb-4 w-full bg-red-500 text-white p-2 rounded md:hidden hover:opacity-80 transition"
        onClick={onClose}
      >
        ❌ Закрыть
      </button>

      {/* ===== Новый чат (адаптивная кнопка) ===== */}
      <button
        className="mb-4 w-full bg-green-500 text-white p-3 rounded hover:bg-green-600 transition"
      >
        ➕ Новый чат
      </button>

      {/* ===== Поиск ===== */}
      <input
        type="text"
        placeholder="Поиск..."
        className="mb-4 w-full p-2 border rounded border-[var(--border)] bg-[var(--bg)] text-[var(--text)] dark:bg-[var(--bg-dark)] dark:text-[var(--text-h)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
      />

      {/* ===== Список чатов ===== */}
      <div className="flex-1 flex flex-col gap-2 overflow-y-auto">
        {mockChats.map((chat, idx) => (
          <div
            key={idx}
            className={`
              flex justify-between items-center p-2 rounded cursor-pointer 
              hover:bg-gray-200 dark:hover:bg-gray-700
              ${chat.isActive ? 'bg-gray-300 dark:bg-gray-600 font-semibold' : ''}
            `}
          >
            <div className="overflow-hidden">
              <div className="truncate">{chat.title}</div>
              <div className="text-xs text-gray-500 dark:text-gray-300">{chat.lastMessage}</div>
            </div>
            <div className="flex gap-1 opacity-0 hover:opacity-100 transition-opacity">
              <button className="text-gray-500 hover:text-gray-800 dark:hover:text-white">✏️</button>
              <button className="text-red-500 hover:text-red-700">🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;