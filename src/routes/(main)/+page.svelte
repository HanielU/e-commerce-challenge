<script lang="ts">
  import Landing from "./components/Landing.svelte";
  import ProductCard from "$lib/components/ProductCard.svelte";
  import type { Product } from "@prisma/client";
  import { onMount } from "svelte";
  import { trpcClient } from "$trpc/client";

  let products: Product[] = [];
  let tries = 0;

  // fetching products
  const fetchProd = async () => {
    if (tries === 3) throw new Error("Stuffs broken");
    products = await trpcClient().query("products.all");
    if (products.length == 0) {
      tries++;
      fetchProd();
    }
  };

  onMount(fetchProd);
</script>

<svelte:head>
  <title>Belibe | If you belibe you can achieve</title>
</svelte:head>

<Landing />

<div class="mx-auto w-full max-w-screen-md grid-cols-3 gap-5 sm:grid">
  {#each products as product}
    <ProductCard {product} />
  {/each}
</div>
