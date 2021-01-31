import React,{useReducer} from 'react';
import styled from 'styled-components'
import ScoreBoard from "../scoreBoard/ScoreBoard";
import WordBar from "../wordbar/WordBar";
import Canvas from "../canvas/Canvas";
import Toolbar from "../toolbar/Toolbar";
import Chat from "../chat/Chat";

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