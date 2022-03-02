// React Hooks for managing state
import { useState } from "react";

const type = "MENU";

// Button representing a menu (start) button on a gamepad
// (outlined when idle and filled when pressed)
const MenuButton = ({ className, onStateChanged }) => {
    // Stores whether the button is currently being pressed
    const [isPressed, setPressed] = useState(false);

    return (
        <button
            className={`border-gray-500 ${isPressed ? "bg-gray-500 text-white" : "text-gray-400"} ${className} select-none border-4 w-16 h-10 rounded-xl font-bold text-lg`}
            onTouchStart={() => {
                // Store that the button is being pressed
                setPressed(true);

                // Report state change so it can be sent
                // to the backend
                onStateChanged(type, true);
            }}
            onTouchEnd={() => {
                // Store that the button is not being pressed anymore
                setPressed(false);

                // Report state change so it can be sent
                // to the backend
                onStateChanged(type, false);
            }}
        >
            <img className="w-6 h-6 mx-auto opacity-60 pointer-events-none" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDMyIDMyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyIiB4bWw6c3BhY2U9InByZXNlcnZlIiBjbGFzcz0iIj48Zz48cGF0aCB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJYTUxJRF8yODdfIiBkPSJtMTYgMTNjLTEuNjU0IDAtMyAxLjM0Ni0zIDNzMS4zNDYgMyAzIDMgMy0xLjM0NiAzLTMtMS4zNDYtMy0zLTN6IiBmaWxsPSIjZmZmZmZmIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIj48L3BhdGg+PHBhdGggeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBpZD0iWE1MSURfMjg5XyIgZD0ibTYgMTNjLTEuNjU0IDAtMyAxLjM0Ni0zIDNzMS4zNDYgMyAzIDMgMy0xLjM0NiAzLTMtMS4zNDYtMy0zLTN6IiBmaWxsPSIjZmZmZmZmIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIj48L3BhdGg+PHBhdGggeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBpZD0iWE1MSURfMjkxXyIgZD0ibTI2IDEzYy0xLjY1NCAwLTMgMS4zNDYtMyAzczEuMzQ2IDMgMyAzIDMtMS4zNDYgMy0zLTEuMzQ2LTMtMy0zeiIgZmlsbD0iI2ZmZmZmZiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCI+PC9wYXRoPjwvZz48L3N2Zz4=" />
        </button>
    )
}

export default MenuButton;