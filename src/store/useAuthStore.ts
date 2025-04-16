import { create } from 'zustand';
import { decryptData, encryptData } from '../utils/crypto';

interface AuthState {
  user: string | null;
  login: (email: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

const STORAGE_KEY = 'auth-user';
const TIMESTAMP_KEY = 'auth-last-activity';
const SESSION_TIMEOUT = 5 * 60 * 1000; // 5 minutos en ms

const getStoredUser = (): string | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const timestamp = localStorage.getItem(TIMESTAMP_KEY);

    if (!stored || !timestamp) return null;

    const lastActivity = parseInt(timestamp);
    const now = Date.now();

    if (now - lastActivity > SESSION_TIMEOUT) {
      // Sesión caducada
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(TIMESTAMP_KEY);
      return null;
    }

    return decryptData(stored);
  } catch {
    return null;
  }
};

export const useAuthStore = create<AuthState>((set) => ({
  user: getStoredUser(),

  login: (email) => {
    const encrypted = encryptData(email);
    const now = Date.now().toString();

    localStorage.setItem(STORAGE_KEY, encrypted);
    localStorage.setItem(TIMESTAMP_KEY, now);
    set({ user: email });
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(TIMESTAMP_KEY);
    set({ user: null });
  },

  isAuthenticated: () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const timestamp = localStorage.getItem(TIMESTAMP_KEY);
    const now = Date.now();

    return !!stored && !!timestamp && now - parseInt(timestamp) <= SESSION_TIMEOUT;
  },
}));
