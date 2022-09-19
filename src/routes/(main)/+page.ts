import { trpc } from "$trpc/client";
import type { Product } from "@prisma/client";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
  let products: Product[] = [];

  try {
    products = await trpc(fetch).products.all.query();
  } catch (e) {
    console.log((<Error>e).message);
  }

  return { products };
};
