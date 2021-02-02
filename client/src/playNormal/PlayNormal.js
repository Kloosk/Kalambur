import React,{useState} from 'react';
import styled from 'styled-components';
import {useParams} from "react-router-dom";
import {socket,initiateSocket} from "../hooks/socketHooks";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  
`;
const PlayNormal = () => {
    let { room } = useParams();
    const [name,setName] = useState("");
    const handleNick = e => {
      setName(e.target.value);
    };
    const handleJoin = () => {
        if(!socket) initiateSocket();
        socket.emit("joinRoom",{room,name});
    };
    return (
        <Container>
            <input type="text" onChange={handleNick}/>
            <button onClick={handleJoin}>Join to room</button>
        </Container>
    );
};

export default PlayNormal;