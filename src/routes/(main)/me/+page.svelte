<script lang="ts">
  import { getUser } from "@lucia-auth/sveltekit/client";

  const user = getUser();
</script>

<h1>{$user?.firstname} {$user?.lastname}</h1>
<h1>
  {$user?.email}
</h1>
