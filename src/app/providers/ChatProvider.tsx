import React, { createContext, useContext, useReducer, useEffect } from 'react';

import type { Message, Chat } from '../../components/types/types.ts';

type State = {
  chats: Chat[];
  activeChatId: string | null;
  loading: boolean;
  error: string | null;
};

type Action =
  | { type: 'SET_CHATS'; payload: Chat[] }
  | { type: 'SET_ACTIVE_CHAT'; payload: string }
  | { type: 'ADD_CHAT'; payload: Chat }
  | { type: 'DELETE_CHAT'; payload: string }
  | { type: 'RENAME_CHAT'; payload: { id: string; name: string } }
  | { type: 'ADD_MESSAGE'; payload: { chatId: string; message: Message } }
  | { type: 'UPDATE_LAST_MESSAGE'; payload: { chatId: string; content: string } }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const initialState: State = {
  chats: [],
  activeChatId: null,
  loading: false,
  error: null,
};

const ChatContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | null>(null);

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_CHATS':
      return { ...state, chats: action.payload };

    case 'SET_ACTIVE_CHAT':
      return { ...state, activeChatId: action.payload };

    case 'ADD_CHAT':
      return {
        ...state,
        chats: [action.payload, ...state.chats],
        activeChatId: action.payload.id,
      };

    case 'DELETE_CHAT':
      return {
        ...state,
        chats: state.chats.filter((c) => c.id !== action.payload),
        activeChatId:
          state.activeChatId === action.payload ? null : state.activeChatId,
      };

    case 'RENAME_CHAT':
      return {
        ...state,
        chats: state.chats.map((c) =>
          c.id === action.payload.id ? { ...c, name: action.payload.name } : c
        ),
      };

    case 'ADD_MESSAGE':
      return {
        ...state,
        chats: state.chats.map((c) =>
          c.id === action.payload.chatId
            ? { ...c, messages: [...c.messages, action.payload.message] }
            : c
        ),
      };

    case 'UPDATE_LAST_MESSAGE':
      return {
        ...state,
        chats: state.chats.map((c) => {
          if (c.id !== action.payload.chatId) return c;

          const messages = [...c.messages];
          const last = messages[messages.length - 1];

          if (last?.role === 'assistant') {
            last.content = action.payload.content;
          }

          return { ...c, messages };
        }),
      };

    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // загрузка из localStorage
  useEffect(() => {
    try {
      const data = localStorage.getItem('chats');
      if (data) {
        dispatch({ type: 'SET_CHATS', payload: JSON.parse(data) });
      }
    } catch {
      console.error('Broken localStorage');
    }
  }, []);

  // сохранение
  useEffect(() => {
    localStorage.setItem('chats', JSON.stringify(state.chats));
  }, [state.chats]);

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChat must be used inside ChatProvider');
  return ctx;
};