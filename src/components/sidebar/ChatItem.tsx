import React from 'react';

interface ChatItemProps {
  title: string;
  lastMessage: string;
  isActive?: boolean;
}

const ChatItem: React.FC<ChatItemProps> = ({ title, lastMessage, isActive }) => {
  return (
    <div
      className={`flex justify-between items-center p-2 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 ${
        isActive ? 'bg-gray-300 dark:bg-gray-600 font-semibold' : ''
      }`}
    >
      <div className="overflow-hidden">
        <div className="truncate">{title}</div>
        <div className="text-xs text-gray-500 dark:text-gray-300">{lastMessage}</div>
      </div>
      <div className="flex gap-1 opacity-0 hover:opacity-100 transition-opacity">
        <button className="text-gray-500 hover:text-gray-800 dark:hover:text-white">✏️</button>
        <button className="text-red-500 hover:text-red-700">🗑️</button>
      </div>
    </div>
  );
};

export default ChatItem;