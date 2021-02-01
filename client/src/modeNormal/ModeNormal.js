import React,{useReducer,useEffect} from 'react';
import styled from 'styled-components'
import ScoreBoard from "../scoreBoard/ScoreBoard";
import WordBar from "../wordbar/WordBar";
import Canvas from "../canvas/Canvas";
import Toolbar from "../toolbar/Toolbar";
import Chat from "../chat/Chat";
import {useParams} from "react-router-dom";
import io from "socket.io-client";

const socket = io("http://localhost:4000");


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
    let { id } = useParams();
    const initialState = {
        color: "#000000",
        line: 5,
    };
    useEffect(() => {
        socket.emit("joinRoom",id);
    },[]);
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
        <Container>
            <ScoreBoard/>
            <Main>
                <WordBar/>
                <Canvas state={state}/>
                <Toolbar dispatch={dispatch}/>
            </Main>
            <Chat/>
        </Container>
    );
};

export default ModeNormal;