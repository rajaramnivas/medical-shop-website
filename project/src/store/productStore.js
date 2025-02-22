import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PRODUCTS } from '../data/products';

export const useProductStore = create(
  persist(
    (set) => ({
      products: PRODUCTS,
      lastUpdate: null,
      addProduct: (product) => set((state) => ({
        products: [...state.products, { ...product, id: state.products.length + 1 }],
        lastUpdate: new Date().toISOString()
      })),
      updateStock: (id, newStock) => set((state) => ({
        products: state.products.map(product =>
          product.id === id ? { ...product, stock: parseInt(newStock) } : product
        ),
        lastUpdate: new Date().toISOString()
      }))
    }),
    {
      name: 'product-storage'
    }
  )
);