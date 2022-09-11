<script lang="ts">
  import clsx from "clsx";

  export let name = "";
  export let image: File;
  let imgUrl = "";

  const addFileToVar = (e: Event) => {
    image = (<HTMLInputElement>e.target).files?.[0]!;
    image && (imgUrl = URL.createObjectURL(image));
  };
</script>

<label
  class={clsx(
    "input relative input-bordered flex h-64 cursor-pointer items-center justify-center hover:brightness-150 group",
    {
      "hover:after:!opacity-60 hover:brightness-100": !!image
    }
  )}
  class:p-0={!!image}
>
  <h1
    class={clsx("text-primary-content text-2xl z-10 transition-opacity", {
      "absolute opacity-0 group-hover:opacity-100": !!image
    })}
  >
    {image ? "Click to update Image" : "Click To Upload Image"}
  </h1>

  {#if !!image}
    <div class="relative h-full w-full">
      <img src={imgUrl} alt="" class="h-full w-full object-cover object-center" />
    </div>
  {/if}
  <input
    {name}
    on:change={addFileToVar}
    class="pointer-events-none absolute opacity-0"
    type="file"
    accept="image/*"
    required
  />
</label>

<style>
  label::after {
    content: "";
    @apply absolute top-0 left-0 h-full w-full bg-black opacity-0 transition-opacity;
  }
</style>
