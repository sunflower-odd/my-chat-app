import React, { useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import ChatWindow from '../chat/ChatWindow';
import { Bars3Icon } from '@heroicons/react/24/outline';
import SettingsPanel from '../settings/SettingsPanel';

const AppLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false); 

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Основная область чата */}
      <div className="flex-1 flex flex-col">
        {/* Header с кнопкой Toggle для мобильных */}
        <header className="p-4 border-b flex items-center md:hidden">
          <button onClick={() => setSidebarOpen(true)}>
            <Bars3Icon className="h-6 w-6" />
          </button>
          <h1 className="ml-4 font-bold text-lg">GigaChat</h1>
        </header>

        {/* ChatWindow */}
        <ChatWindow 
          onOpenSettings={() => setSettingsOpen(prev => !prev)} 
        />
      </div>

      {/* Пустая область для SettingsPanel */}
      <div className="w-80 flex flex-col border-l border-gray-300 dark:border-gray-700">
        <div className="flex-1">
          <SettingsPanel isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;