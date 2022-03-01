// React Hooks for managing state
import { useState } from "react";

// Button representing a shoulder button on a gamepad
// (outlined when idle and filled when pressed)
const ShoulderButton = ({ type, className, onStateChanged }) => {
    // Stores whether the button is currently being pressed
    const [isPressed, setPressed] = useState(false);

    return (
        <button
            className={`border-gray-500 ${isPressed ? "bg-gray-500 text-white" : "text-gray-400"} ${className} select-none border-4 w-24 h-12 rounded-xl font-bold text-xl`}
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
            {type}
        </button>
    )
}

export default ShoulderButton;