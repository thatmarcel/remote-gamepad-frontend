// Next.js component that manages routing
// (used here to get the query parameter for the session id)
import { useRouter } from "next/router";

// Next.js component that allows putting things
// in the <head> tag of the document
// (used here to set the page title)
import Head from "next/head";

// Error reporting service
import * as Sentry from "@sentry/nextjs";

// React Hooks for managing state
import { useEffect, useState } from "react";

// Import the components from other files
import GamepadPane from "../components/GamepadPane";
import StartPane from "../components/StartPane";
import DisconnectedPane from "../components/DisconnectedPane";

// List of the actions and their identifiers
// that can be sent from or to the backend
import actions from "../misc/actions.json";

// The page at path /play
const Play = () => {
    // Use the router component to retrieve the
    // session id from the query parameters
    const router = useRouter();
    const sessionId = router.query.id;

    // The socket object
    const [webSocket, setWebSocket] = useState(null);

    // Stores whether the socket is connected
    const [isWebSocketConnected, setWebSocketConnected] = useState(false);

    // Stores whether the client is currently 
    // waiting on joining a game session
    const [isJoining, setJoining] = useState(false);

    // Stores whether the client is an active
    // member of a game session
    const [isMember, setMember] = useState(false);

    // Stores whether the client has been disconnected from
    // a game session
    const [hasDisconnected, setDisconnected] = useState(false);

    // Stores whether an error has occurred in the WebSocket connection
    const [hasConnectionError, setConnectionError] = useState(false);

    // Stores whether the game session has ended / been closed
    const [hasGameSessionEnded, setGameSessionEnded] = useState(false);

    // The error that should be displayed
    // (hides the join button if set)
    const [errorText, setErrorText] = useState(null);

    // If the session identifier isn't set and no
    // other error is being displayed, display an error about
    // the session id being missing
    //
    // If the session identifier is set but was previously
    // missing, remove the error message
    // (the session identifier may not be available immediately
    // but instead only in a later execution so this check
    // is necessary)
    if (!sessionId && !errorText) {
        setErrorText("Missing session identifier");
    } else if (sessionId && errorText === "Missing session identifier") {
        setErrorText(null);
    }

    // Send a ping message to the server and setup a timer to send
    // another one in 3 seconds
    // (needed so the connection is kept alive)
    const sendPing = (socket) => {
        if (!socket || socket.readyState != 1 /* 1 => OPEN */) {
            if (socket && socket.readyState == 0 /* 0 => CONNECTING */) {
                setTimeout(() => sendPing(socket), 3000);
            }

            return;
        }
        
        socket.send(JSON.stringify({
            action: actions.outgoing.ping
        }));

        setTimeout(() => sendPing(socket), 3000);
    }

    // Run when the document has loaded
    useEffect(() => {
        // If the socket has already been created or the
        // script is running on the server instead of
        // the client, do nothing
        if (webSocket || !(typeof window)) { return; }

        // Create a new WebSocket object with the backend URL
        const socket = new WebSocket("wss://backend.gamepad.cloud");

        // When the connection has been established
        socket.onopen = () => {
            // Store that the connection has been established
            // (so the join button gets enabled)
            setWebSocketConnected(true);

            sendPing(socket);
        }

        // When a message has been received
        socket.onmessage = event => {
            // Get the message data and parse
            // it into a JSON object
            const message = event.data;
            const json = JSON.parse(message);
            if (!json || !json["action"]) { return; }

            switch (json["action"]) {
                // When the join request has been received by the backend
                // (and, if successful, sent to the host)
                case actions.incoming.gameSessionJoinRequestResult: {
                    // If the join request was not successfully received,
                    // display an error
                    // (a session with the given identifer probably doesn't exist)
                    if (!json["success"]) {
                        // Hide the loading indicator
                        setJoining(false);

                        // Display the error
                        setErrorText("Session not found");
                    }

                    break;
                }
                // When the join request was denied
                case actions.incoming.joinRequestDenied: {
                    // Hide the loading indicator
                    setJoining(false);

                    // Display the error
                    setErrorText("Join request denied");

                    break;
                }
                // When the join request has been accepted and
                // the session was joined successfully
                case actions.incoming.gameSessionJoined: {
                    // Hide the loading indicator
                    setJoining(false);

                    // Store that the client is now a member of
                    // a game session
                    // (switches to the gamepad screen)
                    setMember(true);

                    break;
                }
                // When the game session was closed
                // (the host has probably lost connection
                // or closed the game)
                case actions.incoming.gameSessionClosed: {
                    // Store that the game session was closed and has ended
                    // so the correct text can be displayed
                    setGameSessionEnded(true);

                    // Disconnect (close the WebSocket connection)
                    socket.close();

                    break;
                }
                // When a different type of message has been received,
                // ignore it
                default:
                    break;
            }
        };

        // When the WebSocket connection was closed,
        // let the user know about the disconnect
        socket.onclose = event => {
            setDisconnected(true);

            if (!event.wasClean) {
                Sentry.captureException(new Error(`WebSocket Closed (non-clean, Code: ${event.code})`));
            }
        }

        // When the WebSocket connection encountered an error,
        // let the user know about that
        socket.onerror = () => {
            setDisconnected(true);
            setConnectionError(true);

            Sentry.captureException(new Error("WebSocket Error"));
        }

        // Store the socket to allow
        // messages to be sent from outside
        // this method
        setWebSocket(socket);
    }, []);

    return (
        <div className="w-screen h-screen h-screen-ios p-0 m-0 select-none">
            <Head>
                <title>Remote Gamepad</title>
            </Head>

            {hasDisconnected
                ? <DisconnectedPane hasGameSessionEnded={hasGameSessionEnded} hasConnectionError={hasConnectionError} />
                : (isMember
                    ? <GamepadPane webSocket={webSocket} />
                    : <StartPane
                        errorText={errorText}
                        isConnected={isWebSocketConnected}
                        isJoining={isJoining}
                        onJoinButtonClick={() => {
                            // Show the loading indicator
                            setJoining(true);

                            // Send the join request after 1 second
                            // (the delay makes it so the loading spinner
                            // is shown for more than a few milliseconds
                            // which looks better)
                            setTimeout(() => {
                                webSocket.send(JSON.stringify({
                                    action: actions.outgoing.joinGameSession,
                                    gameSessionId: sessionId
                                }));
                            }, 1000);
                        }}
                    />
                )
            }
        </div>
    )
}

export default Play;