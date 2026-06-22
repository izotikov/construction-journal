import { createStore } from "@shared/model/createStore";
import { User } from "@entities/user/config/type";

interface UserState {
  user: User | null,
  setUser: (user: User) => void,
  clearUser: () => void,
}


export const useUserStore = createStore<UserState>((set) => {
  return {
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
  }
})