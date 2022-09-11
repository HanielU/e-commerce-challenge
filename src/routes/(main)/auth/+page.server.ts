import type { Actions } from "./$types";
import { auth } from "$lib/lucia";
import { error } from "@sveltejs/kit";
import { parseLuciaCookies } from "$lib/utils";

export const actions: Actions = {
  login: async ({ request, cookies }) => {
    const data = await request.formData();
    const [email, password] = ([data.get("email"), data.get("password")] as string[]).map(value =>
      value.trim()
    );

    if (!email || !password) return;

    try {
      const authenticateUser = await auth.authenticateUser("email", email, password);

      parseLuciaCookies(authenticateUser.cookies).forEach(({ name, value, options }) =>
        cookies.set(name, value, options)
      );
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
      const createUser = await auth.createUser("email", email, {
        password,
        user_data: { email, firstname, lastname }
      });

      parseLuciaCookies(createUser.cookies).forEach(({ name, value, options }) =>
        cookies.set(name, value, options)
      );

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
