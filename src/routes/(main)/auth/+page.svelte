<script lang="ts">
  import clsx from "clsx";
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";

  let loading = false;
  let error = "";
  let mode: "login" | "signup" = "login";

  const toggleAuthMode = () => (mode = mode == "login" ? "signup" : "login");
</script>

<svelte:head>
  <title>{mode == "login" ? "Login" : "Sign up"} | Belibe</title>
</svelte:head>

<form
  class="form-control mx-auto mt-12 mb-10 max-w-xs gap-4"
  method="POST"
  action={mode == "login" ? "?/login" : "?/register"}
  use:enhance={() => {
    loading = true;

    return async ({ result }) => {
      loading = false;
      if (result.type === "error") {
        error = result.error.message;
      } else if (result.type == "redirect") {
        goto(result.location);
      }
    };
  }}
>
  <h1 class="text-2xl font-bold">Join Us!</h1>

  <span class="block text-gray-400" on:click={toggleAuthMode}>
    {#if mode === "login"}
      Don't have an account? <span class="link">Sign Up!</span>
    {:else}
      Already have an account? <span class="link">Login!</span>
    {/if}
  </span>

  {#if mode === "signup"}
    <label>
      <p class="label">First Name</p>

      <input
        class="input-bordered input w-full"
        type="text"
        name="firstname"
        autocomplete="false"
        required
      />
    </label>

    <label>
      <p class="label">Last Name</p>

      <input
        class="input-bordered input w-full"
        type="text"
        name="lastname"
        autocomplete="false"
        required
      />
    </label>
  {/if}

  <label>
    <p class="label">Email</p>

    <input
      class="input-bordered input w-full"
      type="email"
      name="email"
      autocomplete="false"
      required
    />
  </label>

  <label>
    <p class="label">Password</p>

    <input
      class="input-bordered input w-full"
      type="password"
      name="password"
      autocomplete="false"
      required
    />
  </label>

  {#if !!error}
    <h1 class="text-accent">{error}</h1>
  {/if}

  <button
    type="submit"
    class={clsx("btn rounded-md", { loading })}
    disabled={loading}
    >{loading ? "Loading" : mode == "login" ? "Login" : "Signup"}
  </button>
</form>
