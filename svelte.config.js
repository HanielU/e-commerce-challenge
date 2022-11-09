import adapter from "@sveltejs/adapter-auto";
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess({ postcss: true }),

  kit: {
    adapter: adapter(),
    alias: {
      $trpc: "src/trpc/",
      "trpc-sveltekit": "src/lib/server/trpc-sveltekit/",
    },
  },

  // svelte inspector
  /* vitePlugin: {
    experimental: {
      inspector: {
        holdMode: true
      }
    }
  } */
};

export default config;
