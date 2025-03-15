import { create } from 'zustand';
import { MessageType } from "@/lib/validation";

interface MessageState {
    messages: MessageType[];
    setMessages: (chats: MessageType[]) => void;
    addMessages: (chat: MessageType) => void;
    clearMessages: () => void;
    deleteMessages: (id: string) => void;
  }
  
export const useMessageStore = create<MessageState>((set) => ({
    messages: [],
    setMessages: (messages) => set({ messages }),
    addMessages: (message) => set((state) => ({ messages: [...state.messages, message] })),
    deleteMessages: (id) =>
      set((state) => ({
        messages: state.messages.filter((message) => message.id !== id), 
    })),
    clearMessages: () => set({ messages: [] }),
}));