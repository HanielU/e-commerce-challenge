import type { ImageStore } from "$lib/types";
import type { Session } from "lucia-sveltekit/types";
import { createForageStore } from "./forage-store";
import { localStorageStore } from "./local-storage";
import { writable } from "svelte/store";

/** Cart represents an array of Product IDs */
export const localCart = createCartStore();
export const productsImgStore = createForageStore<ImageStore>("image", new Map([]));
export const session = writable<Session>(null);

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
