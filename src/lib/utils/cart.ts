import { cart } from "$lib/stores/user";

export const addToCart = (productId: string) => {
  // uses set to remove duplicate values
  cart.update(prev => [...new Set([productId, ...prev])]);
};

export const removeFromCart = (productId: string) => {
  cart.update(prev => prev.filter(id => id !== productId));
};
