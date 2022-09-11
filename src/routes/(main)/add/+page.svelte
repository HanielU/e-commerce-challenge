<script lang="ts">
  import ImageInput from "$lib/components/input/ImageInput.svelte";
  import Textarea from "$lib/components/input/Textarea.svelte";
  import TextInput from "$lib/components/input/TextInput.svelte";
  import { enhance, type SubmitFunction } from "$app/forms";
  import { goto } from "$app/navigation";
  import { getSession } from "lucia-sveltekit/client";

  // function addProduct() {}

  let image: File;
  const lucia = getSession();

  function convertToNumber(str: string) {
    if (isNaN(+str)) throw new Error("Please input a number");
    return +str;
  }

  const handleEnhance: SubmitFunction = ({ data }) => {
    data.append("image", image);
    $lucia && data.append("email", $lucia?.user.email);

    return ({ result }) => {
      if (result.type == "error") {
        console.log(result.error);
      } else if (result.type == "redirect") {
        goto(result.location);
      }
    };
  };
</script>

<svelte:head>
  <title>Add Products | Belibe</title>
</svelte:head>

<div class="h-full w-full p-6">
  <form class="form-control gap-4" use:enhance={handleEnhance}>
    <TextInput placeholder="Product Name" name="p-name" required />

    <div class="flex items-center gap-1">
      <!-- Currency Select -->
      <div class="input input-bordered flex items-center">NGN</div>

      <TextInput placeholder="Product Price" name="p-price" required />
    </div>

    <TextInput placeholder="Quantity" name="p-qty" required />

    <Textarea placeholder="Product Info" name="p-info" />

    <ImageInput bind:image />

    <button
      class="btn btn-primary btn-block rounded-md"
      on:click={() => {
        /* const fd = new FormData();
        fd.append("hey", "lol");
        fetch("/add", { method: "Post", body: fd }); */
      }}>Add Product</button
    >
  </form>
</div>
