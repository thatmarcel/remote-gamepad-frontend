import { useState } from "react";

const textColorClasses = {
    "yellow": "text-yellow-500",
    "blue": "text-blue-500",
    "red": "text-red-500",
    "green": "text-green-500"
}

const borderColorClasses = {
    "yellow": "border-yellow-500",
    "blue": "border-blue-500",
    "red": "border-red-500",
    "green": "border-green-500"
}

const pressedBackgroundColorClasses = {
    "yellow": "bg-yellow-500",
    "blue": "bg-blue-500",
    "red": "bg-red-500",
    "green": "bg-green-500"
}

const GamepadButton = ({ type, color, className, onStateChanged }) => {
    const textColorClass = textColorClasses[color];
    const borderColorClass = borderColorClasses[color];
    const pressedBackgroundColorClass = pressedBackgroundColorClasses[color];

    const [isPressed, setPressed] = useState(false);

    return (
        <button
            className={`${borderColorClass} ${isPressed ? `${pressedBackgroundColorClass} text-white` : textColorClass} ${className} select-none border-4 p-4 w-16 h-16 rounded-full font-bold text-xl`}
            onTouchStart={() => {
                setPressed(true);
                onStateChanged(type, true);
            }}
            onTouchEnd={() => {
                setPressed(false);
                onStateChanged(type, false);
            }}
        >
            {type}
        </button>
    )
}

export default GamepadButton;