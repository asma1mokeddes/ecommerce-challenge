/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {},
        colors: {
            transparent: "transparent",
            purple500: "rgb(167, 139, 250)",
            gris: "#d4d4d8",
            gray900: "rgba(17, 24, 39, 1)",
            gray800: "rgba(45, 55, 72, 1)",
            gray100: "rgba(255, 255, 255, 1)",
            gray400: "rgba(147, 147, 147, 1)",
            violet400: "rgb(127, 93, 208)",
            gray50: "rgba(249, 250, 251, 1)",
        },
    },
    plugins: [],
};
