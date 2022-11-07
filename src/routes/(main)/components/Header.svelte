<script lang="ts">
  import CartIcon from "$lib/components/icons/CartIcon.svelte";
  import SearchIcon from "$lib/components/icons/SearchIcon.svelte";
  import clsx from "clsx";
  import { goto } from "$app/navigation";
  import { localCart, session } from "$lib/stores/user";
  import { signOut } from "lucia-sveltekit/client";

  let loading = false;

  const signOutUser = async () => {
    loading = true;
    try {
      await signOut("/");
    } finally {
      loading = false;
    }
  };
</script>

<div class="sticky top-0 z-50 bg-base-300" data-sveltekit-prefetch>
  <div class="navbar mx-auto max-w-screen-lg">
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" class="btn-ghost btn-circle btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h7"
            /></svg
          >
        </div>
        <ul
          tabindex="0"
          class="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
        >
          <!-- svelte-ignore a11y-missing-attribute -->
          <li><a>Homepage</a></li>
          <li><a href="/add">Add</a></li>
          <li><a href="/me">Account</a></li>

          <button
            class={clsx("btn btn-primary btn-sm mt-1", {
              loading,
              "btn-accent": !!$session
            })}
            on:click={() => {
              if ($session) return signOutUser();
              goto("/auth");
            }}
          >
            {$session ? "Logout" : "Login"}
          </button>
        </ul>
      </div>
    </div>

    <div class="navbar-center">
      <a href="/" class="btn-ghost btn text-xl normal-case">
        Belibe <div class="my-auto ml-1 h-1 w-1 rounded-full bg-base-content" />
      </a>
    </div>

    <div class="navbar-end">
      <button class="btn-ghost btn-circle btn">
        <SearchIcon class="h-5 w-5" />
      </button>

      <button
        class="btn-ghost tooltip tooltip-left tooltip-primary btn-circle btn"
        data-tip="{$localCart} {$localCart.length == 1 ? 'item' : 'items'} in cart"
        on:click={() => !!$session && goto("/cart")}
      >
        <div class="indicator">
          <CartIcon class="h-5 w-5 fill-base-content" />

          <span class="badge-primary badge badge-xs indicator-item">
            {$localCart.length}
          </span>
        </div>
      </button>
    </div>
  </div>
</div>
