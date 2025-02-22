import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const usePurchaseHistoryStore = create(
  persist(
    (set, get) => ({
      purchases: [], // [{userId, productId, purchaseDate}]
      
      addPurchase: (userId, productId) => {
        set((state) => ({
          purchases: [...state.purchases, {
            userId,
            productId,
            purchaseDate: new Date().toISOString()
          }]
        }));
      },

      canPurchaseProduct: (userId, productId) => {
        const state = get();
        const userPurchases = state.purchases.filter(
          p => p.userId === userId && p.productId === productId
        );

        if (userPurchases.length < 5) return true;

        // Sort purchases by date, newest first
        const sortedPurchases = [...userPurchases].sort(
          (a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate)
        );

        // Check if 15 days have passed since the 5th most recent purchase
        const fifthPurchaseDate = new Date(sortedPurchases[4].purchaseDate);
        const daysSinceLastPurchase = (new Date() - fifthPurchaseDate) / (1000 * 60 * 60 * 24);

        return daysSinceLastPurchase >= 15;
      },

      getPurchaseCount: (userId, productId) => {
        const state = get();
        return state.purchases.filter(
          p => p.userId === userId && p.productId === productId
        ).length;
      },

      getNextPurchaseDate: (userId, productId) => {
        const state = get();
        const userPurchases = state.purchases.filter(
          p => p.userId === userId && p.productId === productId
        );

        if (userPurchases.length < 5) return null;

        const sortedPurchases = [...userPurchases].sort(
          (a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate)
        );

        const fifthPurchaseDate = new Date(sortedPurchases[4].purchaseDate);
        const nextPurchaseDate = new Date(fifthPurchaseDate);
        nextPurchaseDate.setDate(nextPurchaseDate.getDate() + 15);

        return nextPurchaseDate;
      }
    }),
    {
      name: 'purchase-history'
    }
  )
);