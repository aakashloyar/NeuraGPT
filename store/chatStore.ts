import { create } from 'zustand';
import { ChatType } from "@/lib/validation";

interface ChatState {
  chats: ChatType[];
  setChats: (chats: ChatType[]) => void;
  addChat: (chat: ChatType) => void;
  clearChats: () => void;
  deleteChat: (id: string) => void;
  updateChatTitle: (chatId: string, newTitle: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  chats: [],
  
  setChats: (chats) => set({ chats }), 
  addChat: (chat) => set((state) => ({ chats: [chat, ...state.chats] })),
  deleteChat: (id) => 
    set((state) => ({
      chats: state.chats.filter((chat) => chat.id !== id)
    })),
    updateChatTitle: (chatId, newTitle) =>
      set((state) => ({
        chats: state.chats.map((chat) =>
          chat.id === chatId ? { ...chat, title: newTitle } : chat
        ),
      })),

  clearChats: () => set({ chats: [] }), 
}));
