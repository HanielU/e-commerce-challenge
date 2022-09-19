import type { Actions } from "./$types";
import { auth } from "$lib/lucia";
import { error } from "@sveltejs/kit";
import { setCookie } from "lucia-sveltekit";

export const actions: Actions = {
  login: async ({ request, cookies }) => {
    const data = await request.formData();
    const [email, password] = ([data.get("email"), data.get("password")] as string[]).map(
      value => value.trim()
    );

    if (!email || !password) return;

    try {
      const userSession = await auth.authenticateUser("email", email, password);

      setCookie(cookies, ...userSession.cookies);
    } catch (e) {
      switch ((e as Error).message) {
        case "AUTH_INVALID_IDENTIFIER_TOKEN":
        case "AUTH_INVALID_PASSWORD":
          throw error(400, "Incorrect email or password");
      }

      throw error(500, "Unknow error occured");
    }
  },

  register: async ({ request, cookies }) => {
    const data = await request.formData();
    const [email, password, firstname, lastname] = (
      [
        data.get("email"),
        data.get("password"),
        data.get("firstname"),
        data.get("lastname")
      ] as string[]
    ).map(value => value.trim());

    if (!email || !password || !firstname || !lastname) return;

    try {
      const userSession = await auth.createUser("email", email, {
        password,
        user_data: { email, firstname, lastname }
      });

      setCookie(cookies, ...userSession.cookies);

      return { success: true };
    } catch (e) {
      switch ((e as Error).message) {
        case "AUTH_DUPLICATE_IDENTIFIER_TOKEN":
        case "AUTH_DUPLICATE_USER_DATA":
          throw error(400, "Email already in use");
      }

      throw error(500, "Unknow error occured");
    }
  }
};
