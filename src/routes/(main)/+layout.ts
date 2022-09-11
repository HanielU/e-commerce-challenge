import { browser } from "$app/environment";
import { trpcClient } from "$trpc/client";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async ({ fetch, parent }) => {
  const { lucia } = await parent();
  if (lucia && !browser) {
    const cartItemsCount = await trpcClient(fetch).query("cart.count", { email: lucia.user.email });

    return {
      cartItemsCount
    };
  }
};
