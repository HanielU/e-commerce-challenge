<script lang="ts">
  import CartIcon from "$lib/components/icons/CartIcon.svelte";
  import SearchIcon from "$lib/components/icons/SearchIcon.svelte";
  import clsx from "clsx";
  import { getSession, signOut } from "lucia-sveltekit/client";
  import { goto, invalidateAll } from "$app/navigation";
  import { localCart } from "$lib/stores/user";

  const lucia = getSession();
  let loading = false;

  const signOutUser = async () => {
    loading = true;
    try {
      $lucia && (await signOut($lucia?.access_token));
      invalidateAll();
    } finally {
      loading = false;
    }
  };
</script>

<div class="sticky top-0 z-50 bg-base-300">
  <div class="navbar mx-auto max-w-screen-lg">
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" class="btn btn-ghost btn-circle">
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
              "btn-accent": !!$lucia
            })}
            on:click={() => {
              if ($lucia) return signOutUser();
              goto("/auth");
            }}
          >
            {$lucia ? "Logout" : "Login"}
          </button>
        </ul>
      </div>
    </div>

    <div class="navbar-center">
      <a href="/" class="btn btn-ghost text-xl normal-case">
        Belibe <div class="my-auto ml-1 h-1 w-1 rounded-full bg-base-content" />
      </a>
    </div>

    <div class="navbar-end">
      <button class="btn btn-ghost btn-circle">
        <SearchIcon class="h-5 w-5" />
      </button>

      <button
        class="btn tooltip tooltip-left btn-ghost btn-circle tooltip-primary"
        data-tip="{$localCart} {$localCart.length == 1 ? 'item' : 'items'} in cart"
        on:click={() => !!$lucia && goto("/cart")}
      >
        <div class="indicator">
          <CartIcon class="h-5 w-5 fill-base-content" />

          <span class="badge indicator-item badge-primary badge-xs">
            {$localCart.length}
          </span>
        </div>
      </button>
    </div>
  </div>
</div>
