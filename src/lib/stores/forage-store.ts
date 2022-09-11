import localforage from "localforage";
import { browser } from "$app/environment";
import { writable, type Writable } from "svelte/store";

export function createForageStore<T>(
  key: string,
  initial: T
): Omit<Writable<T | undefined>, "update"> {
  const { subscribe, set } = writable<T | undefined>(undefined, () => {
    if (!browser) return;

    async function init() {
      await localforage.ready();
      // not available in incognito mode
      await localforage.setDriver(localforage.INDEXEDDB);
      getAndSetFromLocal();
    }

    init();

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  });

  const setSync = async (value: T) => {
    await localforage.setItem(key, value);
    set(value);
  };

  const getAndSetFromLocal = async () => {
    const local = await localforage.getItem<T>(key);
    if (!local) setSync(initial);
    else {
      try {
        set(local);
      } catch {
        setSync(initial);
      }
    }
  };

  return { subscribe, set: setSync };
}
