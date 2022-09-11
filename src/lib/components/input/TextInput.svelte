<script lang="ts">
  let value = "";
  let name = "";
  let placeholder = "";
  let className = "";
  let required = false;

  export { className as class, required, value, placeholder, name };
</script>

<input
  class="input input-bordered w-full {className}"
  {name}
  {placeholder}
  {required}
  type="text"
  bind:value
/>
