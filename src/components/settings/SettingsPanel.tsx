import React, { useState, useEffect } from 'react';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ isOpen, onClose }) => {
  const [darkMode, setDarkMode] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-screen w-80 max-w-full shadow-lg p-6 flex flex-col z-50
          ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}
      >
        <h2 className="text-xl font-bold mb-4">Настройки чата</h2>

        {/* Модель */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Модель</label>
          <select
            className={`w-full border rounded p-2
              ${darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-black border-gray-300'}`}
          >
            <option>GigaChat</option>
            <option>GigaChat-Plus</option>
            <option>GigaChat-Pro</option>
            <option>GigaChat-Max</option>
          </select>
        </div>

        {/* Температура */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Temperature</label>
          <input
            type="range"
            min={0}
            max={2}
            step={0.1}
            defaultValue={1}
            className={`w-full ${darkMode ? 'accent-purple-400' : ''}`}
          />
        </div>

        {/* Top-P */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Top-P</label>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            defaultValue={0.9}
            className={`w-full ${darkMode ? 'accent-purple-400' : ''}`}
          />
        </div>

        {/* Max Tokens */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Max Tokens</label>
          <input
            type="number"
            defaultValue={1000}
            className={`w-full border rounded p-2
              ${darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-black border-gray-300'}`}
          />
        </div>

        {/* System Prompt */}
        <div className="mb-4">
          <label className="block font-medium mb-1">System Prompt</label>
          <textarea
            rows={3}
            className={`w-full border rounded p-2
              ${darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-black border-gray-300'}`}
            defaultValue="Привет! Настройка системы..."
          />
        </div>

        {/* Тема */}
        <div className="mb-4 flex items-center justify-between">
          <span className="font-medium">Тёмная тема</span>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={(e) => setDarkMode(e.target.checked)}
          />
        </div>

        {/* Кнопки */}
        <div className="flex justify-between mt-auto">
          <button
            className={`px-4 py-2 rounded
              ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}
            onClick={onClose}
          >
            Сбросить
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;