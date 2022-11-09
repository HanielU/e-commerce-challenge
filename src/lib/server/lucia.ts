import lucia from "lucia-auth";
import prisma from "@lucia-auth/adapter-prisma";
import { dev } from "$app/environment";
import { prismaClient } from "./prisma";

export const auth = lucia({
  adapter: prisma(prismaClient),
  env: dev ? "DEV" : "PROD",
  transformUserData(userData) {
    return {
      userId: userData.id,
      email: userData.email,
      firstname: userData.firstname,
      lastname: userData.lastname,
    };
  },
});

export type Auth = typeof auth;
