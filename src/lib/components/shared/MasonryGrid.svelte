<script lang="ts">
  type T = $$Generic;

  type MasonryStyles = {
    gridWrapper?: string;
    gridItem?: string;
  };

  /** An Array of display Data to loop over */
  let items = [] as T[];

  /** Message to show when the list of Items is empty */
  let fallbackMsg = "";

  /** The minimum width for each element in the masonry grid */
  let minWidth = "250px";
  let className: MasonryStyles = {
    gridWrapper: "",
    gridItem: ""
  };

  export { items, className as class, minWidth, fallbackMsg };

  function resizeGridItem(gridItem: HTMLDivElement) {
    const grid = gridItem.parentElement!;
    const rowHeight = parseInt(getComputedStyle(grid).gridAutoRows);
    const rowGap = parseInt(getComputedStyle(grid).rowGap);
    const gridItemContent = gridItem.children[0]!;
    const rowSpan = Math.ceil(
      (gridItemContent.getBoundingClientRect().height + rowGap) / (rowHeight + rowGap)
    );
    gridItem.style.gridRowEnd = "span " + rowSpan;
  }

  function resizeAllGridItems() {
    const allGridItems = document.querySelectorAll<HTMLDivElement>(".grid-item");
    allGridItems.forEach(item => resizeGridItem(item));
  }

  function resizeGridItemAfterImgLoad(gridItem: HTMLDivElement) {
    gridItem.children[0]
      .querySelector("img")!
      .addEventListener("load", resizeAllGridItems);

    // workaround to fix the issue where the grids are given more spans than they need on first page load
    setTimeout(resizeAllGridItems, 1000);
  }
</script>

<svelte:window on:resize={resizeAllGridItems} />

<div
  style:--min-width={minWidth}
  class="grid auto-rows-[10px] [grid-template-columns:_repeat(auto-fill,_minmax(var(--min-width),_1fr))] {className.gridWrapper}"
>
  {#each items as item}
    <div class="grid-item {className.gridItem}" use:resizeGridItemAfterImgLoad>
      <slot prop={item} />
    </div>
  {:else}
    <h1>{fallbackMsg}</h1>
  {/each}
</div>
