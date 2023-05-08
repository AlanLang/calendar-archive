/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,tsx}"],
  theme: {
    extend: {
      flex: {
        center: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },
    },
  },
  plugins: [],
};
