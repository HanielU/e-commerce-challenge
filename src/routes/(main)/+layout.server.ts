import { auth } from "$lib/lucia";
import { redirect } from "@sveltejs/kit";

export const load = auth.handleServerLoad(async ({ getSession, url }) => {
  const session = await getSession();

  if (session) {
    if (isProtected(url.pathname, ["/auth"])) throw redirect(302, "/");
  } else {
    if (isProtected(url.pathname, ["/add", "/me"])) throw redirect(302, "/auth");
  }
});

function isProtected(path: string, protectedPaths: string[]) {
  return protectedPaths.some(value => value === path);
}
