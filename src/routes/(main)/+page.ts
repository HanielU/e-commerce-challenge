import { trpc } from "$trpc/client";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
  const products = await trpc(fetch)
    .products.all.query()
    .catch(e => {
      console.log((<Error>e).message);
      return [];
    });

  return { products };
};
