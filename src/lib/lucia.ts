import lucia from "lucia-sveltekit";
import prisma from "@lucia-sveltekit/adapter-prisma";
import { dev } from "$app/environment";
import { prismaClient } from "./db";
import type { CookieOptions } from "$lib/types";

export const auth = lucia({
  adapter: prisma(prismaClient),
  env: dev ? "DEV" : "PROD",
  secret: crypto.randomUUID()
});

export const parseLuciaCookies = (cookies: string[]) =>
  cookies.map(cookWhole => {
    const parts = cookWhole.split(";").map(s => s.trim());

    const [cookie, ...options] = parts;
    const [name, value] = cookie.split("=");

    const optionsObj = options.reduce((obj, option) => {
      const [key, val] = option.split("=");
      switch (key) {
        case "Max-Age":
          obj.maxAge = parseInt(val);
          break;
        case "Path":
          obj.path = val;
          break;
        case "HttpOnly":
          obj.httpOnly = true;
          break;
        case "SameSite":
          obj.sameSite = val.toLowerCase() as "lax" | "strict" | "none";
          break;
      }

      obj.secure = !dev;

      return obj;
    }, {} as CookieOptions);

    return { name, value, options: optionsObj };
  });
