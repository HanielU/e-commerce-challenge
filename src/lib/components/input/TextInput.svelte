<script lang="ts">
  import { numbersOnly } from "$lib/utils";

  let value = "";
  let name = "";
  let placeholder = "";
  let className = "";
  let required = false;
  let numOnly = false;

  export { className as class, required, value, placeholder, name, numOnly };

  // checks if the input field should be numbers only
  const enterNumsOnly = (input: HTMLInputElement) =>
    numOnly ? numbersOnly(input) : void {};
</script>

<input
  class="input w-full {className}"
  {name}
  {placeholder}
  {required}
  type="text"
  bind:value
  use:enterNumsOnly
/>
