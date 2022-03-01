import { useState } from "react";

const ShoulderButton = ({ type, className, onStateChanged }) => {
    const [isPressed, setPressed] = useState(false);

    return (
        <button
            className={`border-gray-500 ${isPressed ? "bg-gray-500 text-white" : "text-gray-400"} ${className} select-none border-4 w-24 h-12 rounded-xl font-bold text-xl`}
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

export default ShoulderButton;