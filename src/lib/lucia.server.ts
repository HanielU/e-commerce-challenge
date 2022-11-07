import lucia from "lucia-sveltekit";
import prisma from "@lucia-sveltekit/adapter-prisma";
import { dev } from "$app/environment";
import { prismaClient } from "./db";

export const auth = lucia({
  adapter: prisma(prismaClient),
  env: dev ? "DEV" : "PROD",
  secret: crypto.randomUUID()
});

export type Auth = typeof auth;
