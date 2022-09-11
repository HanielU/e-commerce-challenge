/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      maxWidth: ({ theme }) => ({
        ...theme("width")
      })
    }
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["business"]
  }
};
