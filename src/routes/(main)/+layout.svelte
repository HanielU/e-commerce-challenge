<script lang="ts">
  import Header from "./components/Header.svelte";
  import type { PageData } from "./$types";
  import { handleSession } from "@lucia-auth/sveltekit/client";
  import { page } from "$app/stores";

  handleSession(page);

  export let data: PageData;
</script>

<Header user={data.user} />
<slot />
