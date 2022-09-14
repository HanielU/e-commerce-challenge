<script lang="ts">
  type MasonryStyles = {
    gridWrapper?: string;
    gridItem?: string;
  };
  type T = $$Generic;

  let items = [] as T[];
  let minWidth = "250px";
  let className: MasonryStyles = {
    gridWrapper: "",
    gridItem: ""
  };

  export { items, className as class, minWidth };

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

    // workaround to fix the issue where the grids are given more spans than they need
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
  {/each}
</div>
