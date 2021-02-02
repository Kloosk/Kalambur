import React,{useReducer,useEffect,useState} from 'react';
import styled from 'styled-components'
import ScoreBoard from "../scoreBoard/ScoreBoard";
import WordBar from "../wordbar/WordBar";
import Canvas from "../canvas/Canvas";
import Toolbar from "../toolbar/Toolbar";
import Chat from "../chat/Chat";
import {socket} from "../hooks/socketHooks";
import {useParams,useHistory} from "react-router-dom";
import axios from 'axios';

const Container = styled.div`
   width: 100vw;
   height: 100vh;
   display: flex;
   user-select: none;
`;
const Main = styled.div`
  width: 70%;
  height: 100vh;
  border: 2px solid violet;
`;
const ModeNormal = () => {
    const [roomExist,setRoomExist] = useState(false); //if false room doesnt exist
    let { room } = useParams();
    const history = useHistory();
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
                    if(!room.data.start){//game doesnt start
                        history.push(`/lobby/${room}`);
                    }
                }
            })
            //sprawdzamy czy pokój w ogóle istnieje jeżeli nie to wyświetlamy nie ma pokoju
            //zapytanie do axios z odpowiedzią czy gra wystartowała jeżeli tak to wyświetlamy pokój jeżeli nie to
            //przekierowujemy do lobby
        }
    },[]);
    const initialState = {
        color: "#000000",
        line: 5,
    };
    const reducer = (state,action) =>{
        switch(action.type){
            case 'SET_COLOR':{
                return{
                    ...state,
                    color: action.payload
                }
            }
            case 'SET_LINE':{
                return{
                    ...state,
                    line: action.payload
                }
            }
            default: return state
        }
    };
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <>
            {(socket && roomExist) && (
            <Container>
                <ScoreBoard/>
                <Main>
                    <WordBar/>
                    <Canvas state={state}/>
                    <Toolbar dispatch={dispatch}/>
                </Main>
                <Chat/>
            </Container>
            )}
            {roomExist === false && (
                <h1>Pokój nie istnieje. Sprawdź swój link.</h1>
            )}
        </>
    );
};

export default ModeNormal;