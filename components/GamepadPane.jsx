import { useEffect, useState } from "react";
import { Joystick } from "react-joystick-component";

import GamepadButton from "./GamepadButton";
import ShoulderButton from "./ShoulderButton";

// List of the actions and their identifiers
// that can be sent from or to the backend
import actions from "../misc/actions.json";

const GamepadPane = ({ webSocket }) => {
    const [isLandscape, setLandscape] = useState(false);

    if (typeof window !== "undefined") {
        useEffect(() => {
            window.onresize = () => {
                setLandscape(window.innerWidth > window.innerHeight);
            }

            setLandscape(window.innerWidth > window.innerHeight);          
        }, [window]);
    }

    if (typeof document !== "undefined") {
        useEffect(() => {
            
        }, [document.getElementById('body')]);
    }

    const onButtonStateChanged = (type, value) => {
        console.log(`Button (${type}) changed to value: ${value}`);

        webSocket.send(JSON.stringify({
            action: actions.outgoing.doInput,
            inputType: type,
            inputValue: value ? 1 : 0
        }));
    }

    const onJoystickMoved = (event) => {
        const positionX = (event.x / 50).toFixed(3);
        const positionY = (event.y / 50).toFixed(3);

        console.log(`Joystick moved to X: ${positionX} and Y: ${positionY}`);

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
                    <div className="absolute bottom-20 left-36">
                        <Joystick
                            baseColor="rgb(50, 50, 50)"
                            stickColor="rgb(120, 120, 120)"
                            throttle={200}
                            move={onJoystickMoved}
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
                    <span className="font-bold text-3xl my-auto text-white">
                        Rotate your phone to play
                    </span>
                </div>
            }
        </div>
    )
}

export default GamepadPane;