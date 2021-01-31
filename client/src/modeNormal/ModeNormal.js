import React from 'react';
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
`;
const Main = styled.div`
  width: 70%;
  height: 100vh;
  border: 2px solid violet;
`;
const ModeNormal = () => {
    return (
        <Container>
            <ScoreBoard/>
            <Main>
                <WordBar/>
                <Canvas/>
                <Toolbar/>
            </Main>
            <Chat/>
        </Container>
    );
};

export default ModeNormal;