import adapter from "@sveltejs/adapter-auto";
import preprocess from "svelte-preprocess";
import dotenv from "dotenv";
dotenv.config();

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess({ postcss: true }),

  kit: {
    adapter: adapter(),
    alias: {
      $trpc: "src/lib/trpc/"
    }
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
