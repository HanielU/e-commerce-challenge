import { createTRPCProxyClient } from "@trpc/client";
import type { AppRouter } from "$trpc"; // 👈 only the types are imported from the server
import type { LoadEvent } from "@sveltejs/kit";
import { browser } from "$app/environment";

const url = browser ? "/trpc" : "http://localhost:3000/trpc";

export const trpcClient = (loadFetch?: LoadEvent["fetch"]) =>
  createTRPCProxyClient<AppRouter>({
    url: loadFetch ? "/trpc" : url,
    ...(loadFetch && { fetch: loadFetch as typeof fetch })
  });
