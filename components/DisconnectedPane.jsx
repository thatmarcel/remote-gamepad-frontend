// Import the image components from other files
// that might be displayed
import FinishFlagImage from "./FinishFlagImage";
import WarningIconImage from "./WarningIconImage";

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
                {hasGameSessionEnded
                    ? <FinishFlagImage className="w-16 h-16 mb-8 mx-auto" />
                    : <WarningIconImage className="w-16 h-16 mb-8 mx-auto" />
                }

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