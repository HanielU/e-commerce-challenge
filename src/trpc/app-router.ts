import * as trpc from "@trpc/server";
import type { inferAsyncReturnType } from "@trpc/server";
import type { RequestEvent } from "@sveltejs/kit";

export const createContext = async (event: RequestEvent) => {
  return {
    event
  };
};

type Context = inferAsyncReturnType<typeof createContext>;

export const createRouter = () => trpc.router<Context>();
