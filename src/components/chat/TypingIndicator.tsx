// src/components/chat/TypingIndicator.tsx
import React from 'react';

interface TypingIndicatorProps {
  isVisible?: boolean;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ isVisible = true }) => {
  if (!isVisible) return null;

  return (
    <div className="flex justify-start items-center space-x-2">
      <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce"></div>
      <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce delay-200"></div>
      <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce delay-400"></div>
    </div>
  );
};

export default TypingIndicator;