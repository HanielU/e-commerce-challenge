import { browser } from "$app/environment";
import type { AppRouter } from "$trpc"; // 👈 only the types are imported from the server
import type { LoadEvent } from "@sveltejs/kit";
import * as trpc from "@trpc/client";

const url = browser ? "/trpc" : "http://localhost:3000/trpc";

export const trpcClient = (loadFetch?: LoadEvent["fetch"]) =>
  trpc.createTRPCClient<AppRouter>({
    url: loadFetch ? "/trpc" : url,
    ...(loadFetch && { fetch: loadFetch as typeof fetch }),
  });
