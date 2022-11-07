<script lang="ts">
  import CartAddIcon from "$lib/components/icons/CartAddIcon.svelte";
  import clsx from "clsx";
  import type { ImageStore } from "$lib/types";
  import type { Product } from "@prisma/client";
  import { b64toBlob } from "$lib/utils";
  import { localCart, productsImgStore } from "$lib/stores/user";
  import { trpc } from "$trpc/client";

  export let product: Omit<Product, "userId" | "averageRating">;

  let img: HTMLImageElement;
  let hasVerticalAspect = false; // used to indicate if an image has a vertical aspect ratio

  // wait for localforage-store to initialise & img element to exist
  $: main($productsImgStore, img).catch((err: Error) => console.log(err.message));

  async function main(prodsImgStore: ImageStore | undefined, img: HTMLImageElement) {
    if (prodsImgStore === undefined || !$productsImgStore || !img) return;

    const [, imgName] = product.imgPath.split("/");

    img.onload = () => {
      const x = img.naturalWidth;
      const y = img.naturalHeight;
      if (y > x) hasVerticalAspect = true;
    };

    if ($productsImgStore.has(imgName)) {
      const imgBlob = $productsImgStore.get(imgName) as Blob;
      img.src = URL.createObjectURL(imgBlob);
      return;
    }

    try {
      const [base64str, imgType, imgId] = await trpc().products.img.query({
        imgPath: product.imgPath
      });

      if (!base64str || !imgType || !imgId) return;

      const imgBlob = b64toBlob(base64str, imgType);
      img.src = URL.createObjectURL(imgBlob);

      $productsImgStore.set(imgId, imgBlob); // update Map
      $productsImgStore = $productsImgStore; // trigger reactivity
    } catch (e) {
      const error = e as Error;
      console.log(error.name, error.message);
    }
  }
</script>

<div
  class={clsx("card-compact card rounded-xl bg-base-100 shadow-xl", {
    // <!-- card-side is buggy when media-queries are added -->
    "[@media_screen_and_(max-width:640px)]:card-side": hasVerticalAspect
  })}
>
  <figure>
    <img
      bind:this={img}
      alt="Shoes"
      class={clsx("object-cover object-center", {
        "[@media_screen_and_(max-width:640px)]:w-40 max-h-80 w-full": hasVerticalAspect
      })}
    />
  </figure>

  <div class="card-body">
    <!-- Product price -->
    <h2 class="card-title">${product.price}</h2>

    <!-- Product Description -->
    <p class="mb-2 text-base-content/75">
      {product.description}
    </p>

    <!-- card actions -->
    <div class="card-actions justify-start">
      <button class="btn-primary btn flex-1 rounded-md">Buy Now</button>

      <button
        class="tooltip tooltip-left btn rounded-md bg-neutral text-white"
        data-tip="Add to cart"
        on:click={() => localCart.add(product.id)}
      >
        <CartAddIcon class="fill-neutral-content text-xl" />
      </button>
    </div>
  </div>
</div>
