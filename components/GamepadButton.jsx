// React Hooks for managing state
import { useState } from "react";

// The text color class names for the
// different button colors
const textColorClasses = {
    "yellow": "text-yellow-500",
    "blue": "text-blue-500",
    "red": "text-red-500",
    "green": "text-green-500"
}

// The border color class names for the
// different button colors
const borderColorClasses = {
    "yellow": "border-yellow-500",
    "blue": "border-blue-500",
    "red": "border-red-500",
    "green": "border-green-500"
}

// The background color class names for the
// different button colors when the button is being pressed
const pressedBackgroundColorClasses = {
    "yellow": "bg-yellow-500",
    "blue": "bg-blue-500",
    "red": "bg-red-500",
    "green": "bg-green-500"
}

// Button representing a button (A, B, X, Y) on a gamepad
// (outlined when idle and filled when pressed)
const GamepadButton = ({ type, color, className, onStateChanged }) => {
    // Get the class names for the specified button color
    const textColorClass = textColorClasses[color];
    const borderColorClass = borderColorClasses[color];
    const pressedBackgroundColorClass = pressedBackgroundColorClasses[color];

    // Stores whether the button is currently being pressed
    const [isPressed, setPressed] = useState(false);

    return (
        <button
            className={`${borderColorClass} ${isPressed ? `${pressedBackgroundColorClass} text-white` : textColorClass} ${className} select-none border-4 p-4 w-16 h-16 rounded-full font-bold text-xl`}
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

export default GamepadButton;