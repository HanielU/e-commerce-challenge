<script lang="ts">
  let value = "";
  let name = "";
  let className = "";
  let placeholder = "";

  export { className as class, value, placeholder, name };
</script>

<textarea class="textarea textarea-bordered {className}" {name} {placeholder} bind:value />
