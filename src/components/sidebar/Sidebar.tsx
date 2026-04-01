import React, { useState } from 'react';
import { useChatStore } from '../../stores/useChatStore';
import type { Chat } from '../../components/types/types';
import { v4 as uuidv4 } from 'uuid';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { chats, activeChatId, setActiveChat, addChat } = useChatStore();
  const [search, setSearch] = useState('');

  const filteredChats = chats.filter(
    (chat) =>
      chat.title.toLowerCase().includes(search.toLowerCase()) ||
      chat.messages.some((m) =>
        m.content.toLowerCase().includes(search.toLowerCase())
      )
  );

  const handleNewChat = () => {
    const newChat: Chat = {
      id: uuidv4(),
      title: 'Новый чат', // пока дефолтное название, изменится после первого сообщения
      messages: [],
    };
    addChat(newChat);
    setActiveChat(newChat.id);
  };

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
      <button
        className="mb-4 w-full bg-red-500 text-white p-2 rounded md:hidden hover:opacity-80 transition"
        onClick={onClose}
      >
        ❌ Закрыть
      </button>

      <button
        className="mb-4 w-full bg-green-500 text-white p-3 rounded hover:bg-green-600 transition"
        onClick={handleNewChat}
      >
        ➕ Новый чат
      </button>

      <input
        type="text"
        placeholder="Поиск..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full p-2 border rounded border-[var(--border)] bg-[var(--bg)] text-[var(--text)] dark:bg-[var(--bg-dark)] dark:text-[var(--text-h)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
      />

      <div className="flex-1 flex flex-col gap-2 overflow-y-auto">
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            className={`
              flex justify-between items-center p-2 rounded cursor-pointer 
              hover:bg-gray-200 dark:hover:bg-gray-700
              ${chat.id === activeChatId ? 'bg-gray-300 dark:bg-gray-600 font-semibold' : ''}
            `}
            onClick={() => setActiveChat(chat.id)}
          >
            <div className="overflow-hidden">
              <div className="truncate">
                {/* Если есть сообщения, название по первому сообщению */}
                {chat.messages[0]?.content.slice(0, 40) || chat.title}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-300">
                {chat.messages[chat.messages.length - 1]?.content || 'Нет сообщений'}
              </div>
            </div>
          </div>
        ))}

        {filteredChats.length === 0 && (
          <div className="text-gray-500 dark:text-gray-400 p-2">Чаты не найдены</div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;