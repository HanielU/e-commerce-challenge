<script lang="ts">
  import Landing from "./components/Landing.svelte";
  import Products from "$lib/components/products/Products.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<svelte:head>
  <title>Belibe | If you belibe you can achieve</title>
</svelte:head>

<Landing />

<Products products={data.products} />
