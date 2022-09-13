import type { ImageStore } from "$lib/types";
import { createForageStore } from "./forage-store";
import { localStorageStore } from "./local-storage";

/** Cart represents an array of Product IDs */
export const localCart = createCartStore();
export const productsImgStore = createForageStore<ImageStore>("image", new Map([]));

function createCartStore() {
  const { update, subscribe } = localStorageStore<string[]>("cart", []);

  const add = (productId: string) => {
    // uses set to remove duplicate values
    update(prev => [...new Set([productId, ...prev])]);
  };

  const remove = (productId: string) => {
    update(prev => prev.filter(id => id !== productId));
  };

  return { add, subscribe, remove };
}
