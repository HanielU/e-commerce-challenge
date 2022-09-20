import { auth } from "$lib/lucia";

export const load = auth.handleServerSession(async ({ request }) => ({
  session: await auth.validateRequestByCookie(request)
}));
