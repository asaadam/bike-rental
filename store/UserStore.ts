import { User } from '@prisma/client';
import create from 'zustand'


type UserStoreType = {
  user: User | null;
  setUser: (user: User | null) => void;
  removeUser: () => void;

}

const useUserStore = create<UserStoreType>((set) => ({
  user: null,
  setUser: (user: User | null) => set({ user }),
  removeUser: () => set({ user: null })
}))


export { useUserStore }