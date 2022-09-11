<script lang="ts">
  import ProductCard from "$lib/components/ProductCard.svelte";
  import { trpcClient } from "$trpc/client";
  import type { Product } from "@prisma/client";
  import { onMount } from "svelte";
  import Landing from "./components/Landing.svelte";

  let products: Product[] = [];

  const fetchProducts = async () => {
    products = await trpcClient().query("products.getAll");
  };

  onMount(fetchProducts);
</script>

<svelte:head>
  <title>Belibe | If you belibe you can achieve</title>
</svelte:head>

<Landing />

{#each products as product}
  <ProductCard {product} />
{/each}
