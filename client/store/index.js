import create from "zustand";

const useStore = create((set) => ({
  user: null,
  login: (user) =>
    set((state) => {
      window.localStorage.setItem("user", JSON.stringify(user));
      return { ...state, user };
    }),
  logout: () => set((state) => ({ ...state, user: null })),
}));

export const useLogin = () => useStore((state) => state.login);
export const useUser = () => useStore((state) => state.user);
export const useLogout = () => useStore((state) => state.logout);
