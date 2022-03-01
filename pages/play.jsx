import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import GamepadPane from "../components/GamepadPane";

import StartPane from "../components/StartPane";

// List of the actions and their identifiers
// that can be sent from or to the backend
import actions from "../misc/actions.json";

const Index = () => {
    const router = useRouter();
    const sessionId = router.query.id;

    const [webSocket, setWebSocket] = useState(null);
    const [isWebSocketConnected, setWebSocketConnected] = useState(false);
    const [isJoining, setJoining] = useState(false);
    const [isMember, setMember] = useState(false);

    const [errorText, setErrorText] = useState(null);

    if (!sessionId && !errorText) {
        setErrorText("Missing session identifier");
    } else if (sessionId && errorText === "Missing session identifier") {
        setErrorText(null);
    }

    useEffect(() => {
        if (webSocket || !(typeof window)) { return; }

        const socket = new WebSocket("ws://192.168.4.20:4000");

        socket.onopen = () => {
            setWebSocketConnected(true);
        }

        socket.onmessage = event => {
            const message = event.data;
            const json = JSON.parse(message);
            if (!json || !json["action"]) { return; }
            console.log(message)

            switch (json["action"]) {
                case actions.incoming.gameSessionJoinRequestResult: {
                    if (!json["success"]) {
                        setJoining(false);
                        setErrorText("Session not found");
                    }

                    break;
                }
                case actions.incoming.joinRequestDenied: {
                    setJoining(false);
                    setErrorText("Join request denied");

                    break;
                }
                case actions.incoming.gameSessionJoined: {
                    setJoining(false);
                    setMember(true);

                    break;
                }
                default:
                    console.log(message)
                    break;
            }
        };

        setWebSocket(socket);
    }, []);

    return (
        <div className="w-screen h-screen h-screen-ios p-0 m-0 select-none">
            {isMember
                ? <GamepadPane webSocket={webSocket} />
                : <StartPane
                    errorText={errorText}
                    isConnected={isWebSocketConnected}
                    isJoining={isJoining}
                    onJoinButtonClick={() => {
                        setJoining(true);
                        setTimeout(() => {
                            webSocket.send(JSON.stringify({
                                action: actions.outgoing.joinGameSession,
                                gameSessionId: sessionId
                            }));
                        }, 1000);
                    }}
                />
            }
        </div>
    )
}

export default Index;