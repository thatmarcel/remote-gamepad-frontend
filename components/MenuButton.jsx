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
            <img src="/dots.png" className="w-6 h-6 mx-auto opacity-60" />
        </button>
    )
}

export default MenuButton;