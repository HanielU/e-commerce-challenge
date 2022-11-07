<script lang="ts">
  import Compressor from "compressorjs";
  import ImageInput from "$lib/components/input/ImageInput.svelte";
  import TextInput from "$lib/components/input/TextInput.svelte";
  import Textarea from "$lib/components/input/Textarea.svelte";
  import clsx from "clsx";
  import type { ActionResult } from "@sveltejs/kit";
  import { goto } from "$app/navigation";
  import { session } from "$lib/stores/user";

  let image: File;
  let loading = false;

  async function handleSubmit(this: HTMLFormElement) {
    const data = new FormData(this);
    const formAction = this.action;
    if (!image) return;

    loading = true;

    new Compressor(image, {
      quality: 0.6,
      maxHeight: 1920,
      maxWidth: 1080,
      async success(compressedImg) {
        data.append("image", compressedImg);
        data.append("email", $session!.user.email);

        const response = await fetch(formAction, {
          method: "POST",
          body: data
        });

        const result = (await response.json()) as ActionResult;

        loading = false;

        if (result.type == "error") {
          console.log(result.error);
        } else if (result.type == "redirect") {
          goto(result.location);
        }
      }
    });
  }
</script>

<svelte:head>
  <title>Add Products | Belibe</title>
</svelte:head>

<!-- svelte-ignore a11y-label-has-associated-control -->
<div class="mx-auto h-full w-full max-w-screen-sm p-6">
  <form class="form-control" on:submit|preventDefault={handleSubmit}>
    <label class="label">
      <span class="label-text font-semibold">Product Name</span>
    </label>
    <TextInput placeholder="Product Name" class="mb-4" name="p-name" required />

    <label class="label">
      <span class="label-text font-semibold">Product Price</span>
    </label>
    <label class="input-group mb-4">
      <span>Ngn</span>
      <TextInput placeholder="0" name="p-price" numOnly required />
    </label>

    <label class="label">
      <span class="label-text font-semibold">Product Quantity</span>
    </label>
    <TextInput placeholder="0" class="mb-4" name="p-qty" numOnly required />

    <label class="label">
      <span class="label-text font-semibold">Product Description</span>
    </label>
    <Textarea placeholder="Product Description" class="mb-4" name="p-desc" />

    <label class="label">
      <span class="label-text font-semibold">Product Image</span>
    </label>
    <ImageInput class="mb-4" bind:image />

    <button class={clsx("btn btn-primary btn-block", { loading })}> Add Product </button>
  </form>
</div>
