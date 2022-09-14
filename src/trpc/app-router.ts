import { initTRPC } from "@trpc/server";
import type { inferAsyncReturnType } from "@trpc/server";
import type { RequestEvent } from "@sveltejs/kit";

export const createContext = async (event: RequestEvent) => {
  return {
    event
  };
};

type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC.context<Context>().create();
