<script lang="ts">
  import { session } from "$lib/stores/user";
</script>

<h1>{$session?.user.firstname} {$session?.user.lastname}</h1>
<h1>
  {$session?.user.email}
</h1>
