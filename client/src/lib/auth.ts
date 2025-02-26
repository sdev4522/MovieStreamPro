import { create } from "zustand";
import { apiRequest } from "./queryClient";

interface User {
  id: number;
  username: string;
  isAdmin: boolean;
}

interface AuthStore {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuth = create<AuthStore>((set) => ({
  user: null,
  loading: true,
  login: async (username: string, password: string) => {
    const res = await apiRequest("POST", "/api/auth/login", { username, password });
    const user = await res.json();
    set({ user });
  },
  logout: async () => {
    await apiRequest("POST", "/api/auth/logout");
    set({ user: null });
  },
  checkAuth: async () => {
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      if (res.ok) {
        const user = await res.json();
        set({ user, loading: false });
      } else {
        set({ user: null, loading: false });
      }
    } catch {
      set({ user: null, loading: false });
    }
  },
}));
