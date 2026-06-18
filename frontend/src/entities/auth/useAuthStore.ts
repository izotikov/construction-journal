import { createStore } from "@shared/model/createStore";

interface AuthState {
  isAuthenticated: boolean
  setAuthenticated: (val: boolean) => void
}


export const useAuthStore = createStore<AuthState>((set) => {
  return {
    isAuthenticated: false,
    setAuthenticated: (value) => set({ isAuthenticated: value }),
  }
})