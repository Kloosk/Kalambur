import io from "socket.io-client";
export let socket;

export const initiateSocket = () => {
    socket = io("http://localhost:4000");
    console.log(`Connecting socket...`);
};