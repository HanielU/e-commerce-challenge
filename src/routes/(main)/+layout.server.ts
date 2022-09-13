import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ parent, url }) => {
  const { lucia } = await parent();

  if (lucia) {
    if (isProtected(url.pathname, ["/auth"])) throw redirect(302, "/");
  } else {
    if (isProtected(url.pathname, ["/add", "/me"])) throw redirect(302, "/auth");
  }
};

function isProtected(path: string, protectedPaths: string[]) {
  return protectedPaths.some(value => value === path);
}
