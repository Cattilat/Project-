import { create } from "zustand";

const useNav = create((set) => ({
    navBar : 
    [
        {
            id : 1,
            name: "Account",
            isActive : true,
            href: "#profile"
        },
        {
            id : 2,
            name: "My Wish List",
            isActive : false,
            href: "#wishlist"
        },
        {
            id : 3,
            name: "Orders",
            isActive : false,
            href: "#orders"
        }
    ],
    setActive : (id) => set((state) => ({ navBar: state.navBar.map((item) => (item.id === id ? { ...item, isActive: true } : { ...item, isActive: false })) }))
}))

export default useNav;