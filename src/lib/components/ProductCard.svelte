<script lang="ts">
  import CartAddIcon from "$lib/components/icons/CartAddIcon.svelte";
  import type { ImageStore } from "$lib/utils/types";
  import type { Product } from "@prisma/client";
  import { addToCart } from "$lib/utils/cart";
  import { b64toBlob } from "$lib/utils";
  import { productsImgStore } from "$lib/stores/user";
  import { trpcClient } from "$trpc/client";

  export let product: Omit<Product, "userId" | "averageRating"> = {
    price: 200,
    id: "gahdam",
    name: "",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti, at? Dicta in obcaecati quis ab?",
    imgPath: "/arch.jpg",
    quantity: 5
  };

  let img: HTMLImageElement;

  $: main($productsImgStore).catch((err: Error) => console.log(err.message));

  async function main(prodsImgStore: ImageStore | undefined) {
    console.log({ prodsImgStore });
    if (prodsImgStore === undefined || !$productsImgStore) return;

    const [, imgName] = product.imgPath.split("/");

    if ($productsImgStore.has(imgName)) {
      const { encoded, type } = $productsImgStore.get(imgName)!;
      const data = b64toBlob(encoded, type);
      img.src = URL.createObjectURL(data);

      return;
    }

    const [encoded, type, imgId] = await trpcClient().query("products.getImg", {
      path: product.imgPath
    });

    if (!encoded || !type || !imgId) return;

    $productsImgStore.set(imgId, { encoded, type });
    $productsImgStore = $productsImgStore; // trigger reactivity

    const data = b64toBlob(encoded, type);
    img.src = URL.createObjectURL(data);
  }
</script>

<div
  class="card-compact card mx-auto mb-4 w-full min-w-[200px] max-w-96 rounded-xl bg-base-100 shadow-xl sm:m-0"
>
  <figure class="px-4 pt-4">
    <img bind:this={img} alt="Shoes" class="rounded-md" />
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
