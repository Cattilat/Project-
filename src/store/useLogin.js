import { create } from "zustand";

const useLogin = create((set) => ({
    isLogin: false,
    setIsLogin: (isLogin) => set({isLogin})
}))

export default useLogin;