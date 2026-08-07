import { create } from "zustand";


export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chatbox-theme") || "chatbox",
  setTheme: (theme) => {
    localStorage.setItem("chatbox-theme", theme);
    set({ theme });
  },
}));
