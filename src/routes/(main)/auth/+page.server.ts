import type { Actions } from "./$types";
import { auth } from "$lib/server/lucia";
import { error, invalid, redirect } from "@sveltejs/kit";

export const actions: Actions = {
  login: async ({ request, locals }) => {
    const data = await request.formData();
    const [email, password] = (
      [data.get("email"), data.get("password")] as string[]
    ).map(value => value.trim());

    if (!email || !password) return invalid(400);

    try {
      const user = await auth.authenticateUser("email", email, password);
      const session = await auth.createSession(user.userId);
      locals.setSession(session);
    } catch (e) {
      throw error(401, "Something's wrong with your email/password");
    }

    throw redirect(302, "/");
  },

  register: async ({ request, locals }) => {
    const data = await request.formData();
    const [email, password, firstname, lastname] = (
      [
        data.get("email"),
        data.get("password"),
        data.get("firstname"),
        data.get("lastname"),
      ] as string[]
    ).map(value => value.trim());

    if (!email || !password || !firstname || !lastname) return invalid(400);

    try {
      const user = await auth.createUser("email", email, {
        password,
        attributes: { email, firstname, lastname },
      });
      console.log({ user });

      const session = await auth.createSession(user.userId);
      locals.setSession(session);
    } catch (e) {
      // email | identifier already in use
      console.log((<Error>e).message);
      // throw error(401, (<Error>e).message);
    }

    throw redirect(302, "/");
  },
};
