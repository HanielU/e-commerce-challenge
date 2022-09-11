<script lang="ts">
  import { getSession } from "lucia-sveltekit/client";

  const lucia = getSession();
</script>

<h1>{$lucia?.user.firstname} {$lucia?.user.lastname}</h1>
<h1>
  {$lucia?.user.email}
</h1>
