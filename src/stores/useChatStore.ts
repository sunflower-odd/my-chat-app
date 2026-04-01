import { create } from 'zustand';
import type { Chat, Message, ChatState, ChatActions } from '../components/types/types';
import { devtools } from 'zustand/middleware';

interface ChatStore extends ChatState, ChatActions {}

const STORAGE_KEY = 'chat_app_state';

export const useChatStore = create<ChatStore>()(
  devtools((set, get) => {
    // Загрузка состояния из localStorage
    let initialState: ChatState = {
      chats: [],
      activeChatId: null,
      isLoading: false,
      error: null,
    };

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        initialState = JSON.parse(stored);
      }
    } catch (err) {
      console.warn('Ошибка при чтении localStorage:', err);
    }

    const persist = () => {
      try {
        const state = get();
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          chats: state.chats,
          activeChatId: state.activeChatId,
        }));
      } catch (err) {
        console.warn('Ошибка при записи в localStorage:', err);
      }
    };

    return {
      ...initialState,

      setActiveChat: (id: string) => {
        set({ activeChatId: id });
        persist();
      },

    addChat: (chat?: Partial<Chat>) => {
    set((state) => {
        const id = Date.now().toString();
        // Название берется из первого сообщения, если есть, иначе "Новый чат N"
        const title =
        chat?.title ||
        chat?.messages?.[0]?.content?.slice(0, 30) ||
        `Новый чат ${state.chats.length + 1}`;

        const newChat: Chat = {
        id,
        title,
        messages: chat?.messages || [],
        };

        const newChats = [...state.chats, newChat];
        return { chats: newChats, activeChatId: newChat.id };
    });
    persist();
    },

      removeChat: (id: string) => {
        set((state) => {
          const updatedChats = state.chats.filter((c) => c.id !== id);
          const newActive = state.activeChatId === id ? updatedChats[0]?.id || null : state.activeChatId;
          return { chats: updatedChats, activeChatId: newActive };
        });
        persist();
      },

    addMessage: (chatId: string, message: Message) => {
    set((state) => {
        const updatedChats = state.chats.map((c) => {
        if (c.id === chatId) {
            const newMessages = [...c.messages, message];
            let newTitle = c.title;

            // Если сообщений до этого не было, обновляем название чата по первому сообщению
            if (c.messages.length === 0 && message.content) {
            newTitle = message.content.slice(0, 30);
            }

            return { ...c, messages: newMessages, title: newTitle };
        }
        return c;
        });

        return { chats: updatedChats };
    });
    persist();
    },

      updateChatTitle: (chatId: string, newTitle: string) => {
        set((state) => ({
          chats: state.chats.map((c) =>
            c.id === chatId ? { ...c, title: newTitle } : c
          ),
        }));
        persist();
      },

      setLoading: (loading: boolean) => set({ isLoading: loading }),
      setError: (error: string | null) => set({ error }),
    };
  })
);