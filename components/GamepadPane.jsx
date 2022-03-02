// React Hooks for managing state
import { useEffect, useState } from "react";

// Import the joystick component
import { Joystick } from "react-joystick-component";

// Import the components from other files
import GamepadButton from "./GamepadButton";
import ShoulderButton from "./ShoulderButton";

// List of the actions and their identifiers
// that can be sent from or to the backend
import actions from "../misc/actions.json";
import MenuButton from "./MenuButton";

// The component shown when the client is a member
// of a game session, displaying a gamepad
// and sending button presses and joystick movements
// to the backend
const GamepadPane = ({ webSocket }) => {
    // Stores whether the device is currently in landscape mode
    // (the gamepad is only shown when the device is in landscape mode
    // because in portrait mode it doesn't make sense and would look weird)
    const [isLandscape, setLandscape] = useState(false);

    // If the window object exists
    // (aka run only on the client and not server-side)
    if (typeof window !== "undefined") {
        // Run when the document has fully loaded with the
        // window object
        useEffect(() => {
            // When the window is resized, e.g. when the device is rotated,
            // re-check and store the new device orientation
            window.onresize = () => {
                setLandscape(window.innerWidth > window.innerHeight);
            }

            // Check and store the current device orientation
            setLandscape(window.innerWidth > window.innerHeight);          
        }, [window]);
    }

    // Handle a button having been pressed or released
    // and send the event to the backend
    const onButtonStateChanged = (type, value) => {
        webSocket.send(JSON.stringify({
            action: actions.outgoing.doInput,
            inputType: type,
            inputValue: value ? 1 : 0
        }));
    }

    // Handle the joystick having moved
    // and send the event to the backend
    const onJoystickMoved = (event) => {
        // The joystick component reports the joystick
        // position in percent and since the whole joystick is 100%,
        // every side has 50% available => divide by 50
        // and also round to 3 decimal places because
        // more precision is really not needed
        const positionX = (event.x / 50).toFixed(3);
        const positionY = (event.y / 50).toFixed(3);

        webSocket.send(JSON.stringify({
            action: actions.outgoing.doInput,
            inputType: "LeftJoystick",
            inputValue: positionX,
            inputValue2: positionY
        }));
    }

    return (
        <div className="h-full w-full fixed" id="lol">
            <style global jsx>{`
                body {
                    background-color: black !important;
                }
            `}</style>
            {isLandscape
                ? <div className="h-screen h-screen-ios w-full relative">
                    <div className="absolute top-8 left-0 w-full px-8">
                        <ShoulderButton type="LB" onStateChanged={onButtonStateChanged} />
                        <ShoulderButton type="RB" className="float-right" onStateChanged={onButtonStateChanged} />
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full flex pointer-events-none">
                        <MenuButton className="mx-auto mt-16 pointer-events-auto" onStateChanged={onButtonStateChanged} />
                    </div>
                    <div className="absolute bottom-20 left-36">
                        <Joystick
                            baseColor="rgb(50, 50, 50)"
                            stickColor="rgb(120, 120, 120)"
                            throttle={200}
                            move={onJoystickMoved}
                            stop={() => onJoystickMoved({ x: 0, y: 0 })}
                        />
                    </div>
                    <div className="absolute bottom-12 right-24">
                        <div className="grid grid-cols-3 grid-rows-3">
                            <div className="w-16 h-16" />
                            <div className="w-16 h-16">
                                <GamepadButton type="Y" color="yellow" onStateChanged={onButtonStateChanged} />
                            </div>
                            <div className="w-16 h-16" />
                            <div className="w-16 h-16">
                                <GamepadButton type="X" color="blue" onStateChanged={onButtonStateChanged} />
                            </div>
                            <div className="w-16 h-16" />
                            <div className="w-16 h-16">
                                <GamepadButton type="B" color="red" onStateChanged={onButtonStateChanged} />
                            </div>
                            <div className="w-16 h-16" />
                            <div className="w-16 h-16">
                                <GamepadButton type="A" color="green" onStateChanged={onButtonStateChanged} />
                            </div>
                            <div className="w-16 h-16" />
                        </div>
                    </div>
                </div>
                : <div className="h-screen h-screen-ios w-full text-center px-16 flex">
                    <span className="font-bold text-3xl mx-auto my-auto text-white">
                        Rotate your phone to play
                    </span>
                </div>
            }
        </div>
    )
}

export default GamepadPane;