// Next.js component that handles image loading and display
import Image from "next/image";

// Import the images that might be displayed
import finishFlagImage from "../public/finish-flag.svg";
import warningIconImage from "../public/warning-icon.svg";

// The component shown when the client was disconnected
// or the game has ended
const DisconnectedPane = ({ hasGameSessionEnded, hasConnectionError }) => {
    return (
        <div className="h-screen h-screen-ios w-full text-center px-16 flex">
            <style global jsx>{`
                body {
                    background-color: black !important;
                }
            `}</style>
            <div className="w-full my-auto">
                <div className="w-16 h-16 mb-8 mx-auto">
                    <Image src={hasGameSessionEnded ? finishFlagImage : warningIconImage} />
                </div>

                <span className="font-bold text-3xl mx-auto text-white">
                    {hasGameSessionEnded
                        ? "Game session ended"
                        : (hasConnectionError
                            ? "Connection error"
                            : "Connection lost"
                        )
                    }
                </span>
            </div>
        </div>
    )
}

export default DisconnectedPane;