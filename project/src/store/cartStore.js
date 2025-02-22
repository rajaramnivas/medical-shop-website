import { create } from 'zustand';
import { usePurchaseHistoryStore } from './purchaseHistoryStore';
import { useProductStore } from './productStore';

export const useCartStore = create((set) => ({
  items: [],
  addItem: (product) => {
    const { updateStock } = useProductStore.getState();
    set((state) => {
      updateStock(product.id, product.stock - 1);
      return {
        items: [...state.items, { ...product, cartId: Date.now() }]
      };
    });
  },
  removeItem: (cartId) => {
    const { updateStock } = useProductStore.getState();
    set((state) => {
      const item = state.items.find(i => i.cartId === cartId);
      if (item) {
        updateStock(item.id, item.stock + 1);
      }
      return {
        items: state.items.filter(item => item.cartId !== cartId)
      };
    });
  },
  clearCart: () => set({ items: [] }),
  checkout: (userId) => {
    const { addPurchase } = usePurchaseHistoryStore.getState();
    const { items } = useCartStore.getState();
    
    // Record each item as a purchase
    items.forEach(item => {
      addPurchase(userId, item.id);
    });
    
    // Clear the cart
    set({ items: [] });
  }
}));