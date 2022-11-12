<script lang="ts">
  import Header from "./components/Header.svelte";
  import { handleSession } from "@lucia-auth/sveltekit/client";
  import { page } from "$app/stores";

  handleSession(page);
</script>

<Header />
<slot />
