import type { LayoutServerLoad } from "./$types";
import { handleServerSession } from "@lucia-auth/sveltekit";
import { redirect } from "@sveltejs/kit";

export const load: LayoutServerLoad = handleServerSession(
  async ({ locals, url }) => {
    const { session, user } = await locals.getSessionUser();

    if (session) {
      if (isProtected(["/auth"], url.pathname)) throw redirect(302, "/");
      return {
        user,
      };
    } else {
      if (isProtected(["/add", "/me"], url.pathname))
        throw redirect(302, "/auth");
    }
  }
);

function isProtected(protectedPaths: string[], currentPath: string) {
  return protectedPaths.some(value => value === currentPath);
}
