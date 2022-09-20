<script lang="ts">
  import "../app.css";
  import { derived } from "svelte/store";
  import { fade } from "svelte/transition";
  import { navigating } from "$app/stores";
  import { session } from "$lib/stores/user";
  import { getSession } from "lucia-sveltekit/client";

  const delayedPreloading = derived(navigating, (_, set) => {
    set(true);
    setTimeout(() => set(true), 250);
  });

  const setupNavigationLoader = (loader: HTMLDivElement) => {
    loader.style.transformOrigin = "left";

    // init animejs with lazy loading
    (async () => {
      const { default: anime } = await import("animejs");
      anime({
        targets: loader,
        scaleX: [0, 1],
        complete(anim) {
          switch (loader.style.transformOrigin) {
            case "left center 0px":
            case "left center":
              loader.style.transformOrigin = "right";
              break;

            case "right center 0px":
            case "right center":
              loader.style.transformOrigin = "left";
              break;
          }
          anim.reverse();
          anim.play();
        },
        duration: 2000,
        easing: "linear"
      });
    })();
  };

  const lucia = getSession();
  session.set($lucia);
</script>

<svelte:head>
  <meta name="theme-color" content="#1a1a1a" />
</svelte:head>

{#if $navigating && $delayedPreloading}
  <div
    use:setupNavigationLoader
    transition:fade
    class="fixed top-0 left-0 z-50 h-1 w-full scale-x-0 rounded-full bg-primary"
  />
{/if}

<slot />
