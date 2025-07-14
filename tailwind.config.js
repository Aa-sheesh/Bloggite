// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Adjust paths as needed
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blogLight: "#F7F7F2", // 👈 Add your custom text color
      },
      fontFamily: {
        ubuntuMono: ["var(--font-ubuntu-sans-mono)"], // 👈 For font variable
      },
      backgroundColor: {
        blog: "#0D0D0D", // (Optional) if you're using bg-blog
      },
    },
  },
  plugins: [],
}
