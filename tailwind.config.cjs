/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      maxWidth: ({ theme }) => ({
        ...theme("width")
      }),
      minWidth: ({ theme }) => ({
        ...theme("width")
      }),
      minHeight: ({ theme }) => ({
        ...theme("height")
      }),
      maxHeight: ({ theme }) => ({
        ...theme("height")
      })
    }
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["business"]
  }
};
