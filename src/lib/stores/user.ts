import type { ImageStore } from "$lib/utils/types";
import { createForageStore } from "./forage-store";
import { localStorageStore } from "./local-storage";

/** Cart represents an array of Product IDs */
export const cart = localStorageStore<string[]>("cart", []);
export const productsImgStore = createForageStore<ImageStore>("image", new Map([]));
