<script lang="ts">
  import "../app.css";
  import { Lucia } from "lucia-sveltekit/client";
  import { page } from "$app/stores";
</script>

<!-- Updates UI based on auth state -->
{#key $page.data.lucia}
  <Lucia on:error={console.log}>
    <slot />
  </Lucia>
{/key}
