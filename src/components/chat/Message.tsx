import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MessageProps {
  role: 'user' | 'assistant';
  content: string;
}

const Message: React.FC<MessageProps> = ({ role, content }) => {
  return (
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`
          inline-block           /* <-- добавлено: чтобы блок сообщения растягивался по содержимому */
          max-w-[80%]            /* <-- добавлено: не больше 80% ширины панели */
          p-3
          rounded-lg
          ${role === 'user'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100'}
        `}
      >
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Message;