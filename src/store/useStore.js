import { create } from "zustand";

const useProductStore = create((set) => ({
  products: [], // Use consistent and correctly named state property
  addProduct: (product) =>
    set((state) => ({ products: [...state.products, product] })), // Update 'products'
  removeProduct: (id) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== id), // Correct access
    })),
}));


export default useProductStore;
