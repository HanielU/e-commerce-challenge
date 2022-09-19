import type { Handle } from "@sveltejs/kit";
import { appRouter } from "$trpc";
import { auth } from "$lib/lucia";
import { createContext } from "$trpc/app-router";
import { createTRPCHandle } from "trpc-sveltekit";
import { sequence } from "@sveltejs/kit/hooks";

const trpcHandle: Handle = async ({ event, resolve }) => {
  // 👇 add this handle
  const response = await createTRPCHandle({
    url: "/trpc",
    router: appRouter,
    createContext,
    event,
    resolve,
    responseMeta({ ctx, paths, type, errors }) {
      // console.log(paths); // paths refers to the trpc api endpoints
      // assuming you have all your public routes with the keyword `public` in them
      const allPublic = paths && paths.every(path => path.includes("products"));
      // checking that no procedures errored
      const allOk = errors.length === 0;
      // checking we're doing a query request
      const isQuery = type === "query";
      if (ctx?.event && allPublic && allOk && isQuery) {
        // cache request for 1 day + revalidate once every second
        const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
        return {
          headers: {
            "cache-control": `s-maxage=60, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`
          }
        };
      }
      return {};
    }
  });

  return response;
};

export const handle = sequence(trpcHandle, auth.handleHooks());
