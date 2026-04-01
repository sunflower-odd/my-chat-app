import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import ChatWindow from '../../components/chat/ChatWindow';
import { useChat } from '../providers/ChatProvider';

export const AppRouter = () => {
  const { state } = useChat();
  const [isSidebarOpen, setSidebarOpen] = useState(true); // состояние открытия Sidebar

  return (
    <BrowserRouter>
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      <Routes>
        <Route
          path="/"
          element={
            state.activeChatId ? (
              <Navigate to={`/chat/${state.activeChatId}`} />
            ) : (
              <div>Выберите чат</div>
            )
          }
        />
        <Route path="/chat/:id" element={<ChatWindow />} />
      </Routes>
    </BrowserRouter>
  );
};