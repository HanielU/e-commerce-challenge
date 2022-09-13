<script lang="ts">
  import clsx from "clsx";

  let name = ""; // for html form names
  let image: File;
  let className = "";
  export { className as class, name, image };

  let imgSrc = "";
  let imgSize = "";
  let showAlert = false;

  const addFileToVar = (e: Event) => {
    showAlert = false;
    const currentImage = (<HTMLInputElement>e.target).files?.[0];

    // makes sure only images are selected and Image exists(to avoid typescript errors)
    if (!currentImage || !currentImage.type.startsWith("image/")) return;

    imgSize = returnFileSize(currentImage.size);
    const [num, suffix] = imgSize.split(" ");

    if (+num >= 5 && suffix === "MB") {
      showAlert = true;
      image = undefined as unknown as File;
      return;
    }

    image = currentImage;
    imgSrc = URL.createObjectURL(currentImage);
  };

  function returnFileSize(fileSize: number): string {
    if (fileSize >= 1024 && fileSize < 1048576) {
      return `${(fileSize / 1024).toFixed(1)} KB`;
    } else if (fileSize >= 1048576) {
      return `${(fileSize / 1048576).toFixed(1)} MB`;
    }
    // fileSize < 1024
    return `${fileSize} bytes`;
  }
</script>

<label
  class={clsx(
    "input relative flex h-64 cursor-pointer items-center justify-center hover:brightness-150 group",
    {
      "hover:after:!opacity-60 hover:brightness-100 p-0": !!image
    },
    className
  )}
>
  <h1
    class={clsx("text-primary-content text-2xl z-10 transition-opacity", {
      "absolute opacity-0 group-hover:opacity-100": !!image
    })}
  >
    {image ? "Click to update Image" : "Click To Upload Image"}
  </h1>

  {#if image}
    <div class="relative h-full w-full">
      <img src={imgSrc} alt="" class="h-full w-full object-cover object-center" />
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

<div class="mb-4">
  {#if image && !showAlert}
    <h1>
      {imgSize}
    </h1>
  {:else if showAlert}
    <div class="alert alert-error shadow-lg">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 flex-shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          /></svg
        >
        <span>Error! The file you selected Is too large. ({imgSize})</span>
      </div>
    </div>
  {/if}
</div>

<style>
  label::after {
    content: "";
    @apply absolute top-0 left-0 h-full w-full bg-black opacity-0 transition-opacity;
  }
</style>
