// src/components/ui/ErrorMessage.tsx
import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface ErrorMessageProps {
  text: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ text }) => {
  return (
    <div className="flex items-center bg-red-100 text-red-700 p-2 rounded-md space-x-2">
      <ExclamationCircleIcon className="h-5 w-5" />
      <span>{text}</span>
    </div>
  );
};

export default ErrorMessage;