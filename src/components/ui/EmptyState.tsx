// src/components/ui/EmptyState.tsx
import React from 'react';
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';

interface EmptyStateProps {
  text?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ text = 'Начните новый диалог' }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-gray-400">
      <ChatBubbleLeftIcon className="h-16 w-16 mb-4" />
      <span className="text-lg font-medium">{text}</span>
    </div>
  );
};

export default EmptyState;