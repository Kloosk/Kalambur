import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import {socket} from "../hooks/socketHooks";
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Lobby = () => {
    const [roomExist,setRoomExist] = useState(false); //if false room doesnt exist
    let { room } = useParams();
    const history = useHistory();
    const startGame = () => {
      history.push(`/normal/${room}`);
    };
    useEffect(() => {
        if(!socket){
            history.push(`/playnormal/${room}`);
        }else{
            axios.get('http://localhost:4000/api/roomexist', {
                headers: {
                    room
                }
            }).then(res => {
                if(!res.data.room){ //room doesnt exist
                    setRoomExist(false);
                }else{//room exist
                    setRoomExist(true);
                    if(res.data.start){//game started
                        history.push(`/normal/${room}`);
                    }else{//waiting for admin to start game
                        socket.on("startGame",startGame);
                    }
                }
            })
        }
    },[]);
    const handleClick = () => {
        socket.emit("startGame",room);
    };

    return (
        <>
            {(socket && roomExist) && (
                <Container>
                    <button onClick={handleClick}>START GAME</button>
                </Container>
            )}
            {roomExist === false && (
                <h1>Pokój nie istnieje. Sprawdź swój link.</h1>
            )}
        </>
    );
};

export default Lobby;