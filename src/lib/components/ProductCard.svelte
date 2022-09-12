<script lang="ts">
  import CartAddIcon from "$lib/components/icons/CartAddIcon.svelte";
  import type { ImageStore } from "$lib/utils/types";
  import type { Product } from "@prisma/client";
  import { addToCart } from "$lib/utils/cart";
  import { b64toBlob } from "$lib/utils";
  import { productsImgStore } from "$lib/stores/user";
  import { trpcClient } from "$trpc/client";

  export let product: Omit<Product, "userId" | "averageRating">;

  let img: HTMLImageElement;

  // wait for localforage-store to initialise
  $: main($productsImgStore, img).catch((err: Error) => console.log(err.message));

  async function main(prodsImgStore: ImageStore | undefined, img: HTMLImageElement) {
    if (prodsImgStore === undefined || !$productsImgStore || !img) return;

    const [, imgName] = product.imgPath.split("/");

    if ($productsImgStore.has(imgName)) {
      const imgBlob = $productsImgStore.get(imgName)!;
      img.src = URL.createObjectURL(imgBlob);
      return;
    }

    const [base64str, imgType, imgId] = await trpcClient().query("products.getImg", {
      path: product.imgPath
    });

    if (!base64str || !imgType || !imgId) return;

    const imgBlob = b64toBlob(base64str, imgType);
    img.src = URL.createObjectURL(imgBlob);

    $productsImgStore.set(imgId, imgBlob);
    $productsImgStore = $productsImgStore; // trigger reactivity
  }
</script>

<div
  class="card-compact card mx-auto mb-4 w-full min-w-[200px] max-w-96 rounded-xl bg-base-100 shadow-xl sm:m-0"
>
  <figure class="px-4 pt-4">
    <img
      bind:this={img}
      alt="Shoes"
      class="max-h-56 rounded-md object-fill object-center"
    />
  </figure>

  <div class="card-body">
    <h2 class="card-title">${product?.price}</h2>

    <p class="mb-2 text-base-content/75">
      {product?.description}
    </p>

    <div class="card-actions justify-start">
      <button class="btn btn-primary flex-1 rounded-md">Buy Now</button>

      <button
        class="btn tooltip tooltip-left rounded-md bg-neutral text-white"
        data-tip="Add to cart"
        on:click={() => addToCart(product?.id)}
      >
        <CartAddIcon class="fill-neutral-content text-xl" />
      </button>
    </div>
  </div>
</div>
