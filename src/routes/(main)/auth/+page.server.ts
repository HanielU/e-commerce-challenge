import type { Actions } from "./$types";
import { auth } from "$lib/lucia.server";
import { error, invalid, redirect } from "@sveltejs/kit";

export const actions: Actions = {
  login: async ({ request, locals }) => {
    const data = await request.formData();
    const [email, password] = ([data.get("email"), data.get("password")] as string[]).map(
      value => value.trim()
    );

    if (!email || !password) return invalid(400);

    try {
      const user = await auth.authenticateUser("email", email, password);
      const session = await auth.createSession(user.userId);
      locals.setSession(session);
    } catch (e) {
      return invalid(400);
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
        data.get("lastname")
      ] as string[]
    ).map(value => value.trim());

    if (!email || !password || !firstname || !lastname) return invalid(400);

    try {
      const user = await auth.createUser("email", email, {
        password,
        attributes: { email, firstname, lastname }
      });

      const session = await auth.createSession(user.userId);
      locals.setSession(session);
    } catch (e) {
      // email | identifier already in use
      return invalid(400);
    }

    throw redirect(302, "/");
  }
};
