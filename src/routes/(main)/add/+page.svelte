<script lang="ts">
  import Compressor from "compressorjs";
  import ImageInput from "$lib/components/input/ImageInput.svelte";
  import TextInput from "$lib/components/input/TextInput.svelte";
  import Textarea from "$lib/components/input/Textarea.svelte";
  import clsx from "clsx";
  import type { ActionResult } from "@sveltejs/kit";
  import { getSession } from "lucia-sveltekit/client";
  import { goto, invalidateAll } from "$app/navigation";

  let image: File;
  let loading = false;
  const lucia = getSession();

  async function handleSubmit(this: HTMLFormElement) {
    const data = new FormData(this);
    const formAction = this.action;
    if (!image) return;

    loading = true;

    new Compressor(image, {
      quality: 0.6,
      maxHeight: 1000,
      maxWidth: 1000,
      async success(compressedImg) {
        data.append("image", compressedImg);
        $lucia && data.append("email", $lucia.user.email);

        const response = await fetch(formAction, {
          method: "POST",
          body: data
        });

        const result = (await response.json()) as ActionResult;

        loading = false;

        if (result.type == "error") {
          console.log(result.error);
        } else if (result.type == "redirect") {
          await invalidateAll(); // rerun all load functions
          goto(result.location);
        }
      }
    });
  }
</script>

<svelte:head>
  <title>Add Products | Belibe</title>
</svelte:head>

<div class="h-full w-full p-6">
  <form class="form-control gap-4" on:submit|preventDefault={handleSubmit}>
    <TextInput placeholder="Product Name" name="p-name" required />

    <div class="flex items-center gap-1">
      <!-- Currency Select -->
      <div class="input input-bordered flex items-center">NGN</div>

      <TextInput placeholder="Product Price" name="p-price" numOnly required />
    </div>

    <TextInput placeholder="Quantity" name="p-qty" numOnly required />

    <Textarea placeholder="Product Description" name="p-desc" />

    <ImageInput bind:image />

    <button class={clsx("btn btn-primary btn-block rounded-md", { loading })}>
      Add Product
    </button>
  </form>
</div>
