// Chat и Message
export interface Message {
  id: string;
  role: 'system' | 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
}

// Состояние чатов
export interface ChatState {
  chats: Chat[];
  activeChatId: string | null;
  isLoading: boolean;
  error: string | null;
}

// Действия
export interface ChatActions {
  setActiveChat: (id: string) => void;
  addChat: (chat: Chat) => void;
  removeChat: (id: string) => void;
  addMessage: (chatId: string, message: Message) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  updateChatTitle: (chatId: string, newTitle: string) => void;
}

export interface MessageType {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}