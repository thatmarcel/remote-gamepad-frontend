// Activate the Tailwind library
import "tailwindcss/tailwind.css";

// Import the ChakraProvider component
// (needs to be a parent of the rest of the components
// so Chakra UI works correctly)
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider>
            <Component {...pageProps} />
        </ChakraProvider>
    )
}

export default MyApp;