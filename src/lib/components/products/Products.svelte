<script lang="ts">
  import MasonryGrid from "$lib/components/shared/MasonryGrid.svelte";
  import ProductCard from "$lib/components/ProductCard.svelte";
  import type { Product } from "@prisma/client";
  export let products: Product[] = [];
</script>

<MasonryGrid
  class={{ gridWrapper: "mx-auto w-full max-w-screen-lg gap-2.5 px-5 sm:px-2" }}
  minWidth="300px"
  items={products}
  let:prop={product}
  fallbackMsg="No Products Available"
>
  <ProductCard {product} />
</MasonryGrid>
