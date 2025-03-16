import { create } from "zustand";
import { History } from "@/lib/validation";

interface HistoryState {
  history: History[];
  addHistory: (entry: History) => void;
  clearHistory: () => void;
}

const MAX_HISTORY_LENGTH = 10;

export const useHistoryStore = create<HistoryState>((set) => ({
  history: [],
  addHistory: (entry) =>
    set((state) => ({
      history: [...state.history, entry].slice(-MAX_HISTORY_LENGTH),
    })),
  clearHistory: () => set({ history: [] }),
}));
