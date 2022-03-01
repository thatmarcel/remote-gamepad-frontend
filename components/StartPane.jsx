import { Button } from "@chakra-ui/react";

const StartPane = ({ errorText, isConnected, onJoinButtonClick, isJoining }) => {
    return (
        <div className="w-full max-h-full h-full pt-32">
            <h2 className="text-3xl text-center font-bold px-16">
                Use your phone as a gamepad
            </h2>

            <div className="absolute bottom-0 left-0 w-full mx-auto p-16 flex">
                {errorText
                    ? <span className="mx-auto text-lg text-red-800">
                        {errorText}
                    </span>
                    : <Button
                        width="100%"
                        mx="auto"
                        maxW="700px"
                        rounded="xl"
                        py="1.8rem"
                        size="lg"
                        fontSize="1.25rem"
                        backgroundColor="black"
                        color="white"
                        isDisabled={!isConnected}
                        isLoading={isJoining}
                        colorScheme="blackAlpha"
                        onClick={() => onJoinButtonClick()}
                    >
                        Join game
                    </Button>
                }
            </div>
        </div>
    )
}

export default StartPane;