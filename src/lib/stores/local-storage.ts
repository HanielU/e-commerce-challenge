import type { StartStopNotifier, Unsubscriber, Updater, Writable } from "svelte/store";
import { writable } from "svelte/store";

const client = typeof window !== "undefined";
type WritableLocalStorage<T> = Writable<T>;
export function localStorageStore<T>(
  key: string,
  initial: T,
  start?: StartStopNotifier<T>
): WritableLocalStorage<T> {
  const {
    set: setStore,
    update: updateStore,
    subscribe
  } = writable(initial, set => {
    if (!client) return;

    const external = start?.(set) as Unsubscriber;

    getAndSetFromLocalStorage();

    const updateFromStorageEvents = (event: StorageEvent) => {
      if (event.key === key) getAndSetFromLocalStorage();
    };
    window.addEventListener("storage", updateFromStorageEvents);

    return () => {
      window.removeEventListener("storage", updateFromStorageEvents);
      external?.();
    };
  });

  /** Set both the localStorage and this Svelte store */
  const setSync = (value: T) => {
    setStore(value);
    client && localStorage.setItem(key, JSON.stringify(value));
  };

  /** update both the local storage and the svelte store */
  const updateSync = (value: Updater<T>) => {
    let track = 0;
    const unsub = subscribe(current => {
      // makes sure this function runs only once during the lifecycle
      // of the "updateSync" function, which is after "updateStore"
      // has run.
      if (++track == 1) return;

      if (client) {
        // console.log("I ran,", current, value);
        localStorage.setItem(key, JSON.stringify(current));
      }
    });

    updateStore(value);
    unsub(); // ends subscription
  };

  /** Synchronize the Svelte store and local storage */
  const getAndSetFromLocalStorage = () => {
    const localValue = localStorage.getItem(key);

    if (localValue === null) setSync(initial);
    else {
      try {
        setStore(JSON.parse(localValue));
      } catch {
        setSync(initial);
      }
    }
  };

  return { subscribe, update: updateSync, set: setSync };
}
