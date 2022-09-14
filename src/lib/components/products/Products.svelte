<script lang="ts">
  import Masonry from "../Masonry.svelte";
  import ProductCard from "$lib/components/ProductCard.svelte";
  import type { Product } from "@prisma/client";
  import { onMount } from "svelte";
  import { trpcClient } from "$trpc/client";

  let products: Product[] = [];
  let tries = 0;

  // fetching products
  const fetchProd = async () => {
    try {
      if (tries === 3) throw new Error("Stuffs broken");
      products = await trpcClient().products.all.query();
      if (products.length == 0) {
        tries++;
        fetchProd();
      }
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  onMount(fetchProd);
</script>

<Masonry
  class={{
    gridWrapper: "mx-auto w-full max-w-screen-lg gap-2.5 px-5 sm:px-2"
    // gridItem: "mb-5 sm:mb-0"
  }}
  minWidth="300px"
  items={products}
  let:prop={product}
>
  <ProductCard {product} />
</Masonry>
