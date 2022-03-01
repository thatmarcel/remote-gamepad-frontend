const iOSHeight = require("@rvxlab/tailwind-plugin-ios-full-height");

module.exports = {
    content: [
        "./pages/**/*.jsx",
        "./components/**/*.jsx"
    ],
    theme: {
        extend: {}
    },
    plugins: [
        iOSHeight
    ]
}
