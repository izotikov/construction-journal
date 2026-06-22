import { createStore } from "@shared/model/createStore";

interface AuthState {
  accessToken: string | null,
  isAuthenticated: boolean,
  setAuthenticated: (val: boolean) => void,
  setAccessToken: (val: string | null) => void,
  clearAuth: () => void;
}

export const useAuthStore = createStore<AuthState>((set) => {
  return {
    accessToken: null,
    isAuthenticated: false,
    setAuthenticated: (value) => set({ isAuthenticated: value }),
    setAccessToken: (value) => set({accessToken: value}),
    clearAuth: () => set({ accessToken: null, isAuthenticated: false }),
  }
});