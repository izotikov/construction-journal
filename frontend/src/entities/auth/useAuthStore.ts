import { createStore } from "@shared/model/createStore";

interface AuthState {
  accessToken: string | null,
  isAuthenticated: boolean,
  isInitialized: boolean,
  setAuthenticated: (val: boolean) => void,
  setInitialized: (value: boolean) => void,
  setAccessToken: (val: string | null) => void,
  clearAuth: () => void;
}

export const useAuthStore = createStore<AuthState>((set) => {
  return {
    accessToken: null,
    isAuthenticated: false,
    isInitialized: false,
    setAuthenticated: (value) => set({ isAuthenticated: value }),
    setInitialized: (value) => set({ isInitialized: value }),
    setAccessToken: (value) => set({accessToken: value}),
    clearAuth: () => set({ accessToken: null, isAuthenticated: false }),
  }
});