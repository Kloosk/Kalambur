import React,{useState,useEffect} from 'react';
import styled from 'styled-components'
import {socket} from "../hooks/socketHooks";

const Container = styled.div`
  height: 100vh;
  width: 10%;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-right: 1px solid red;
  padding-top: 5px;
`;
const H1 =styled.h1`
  font-size: 1.5rem;
  text-transform: uppercase;
`;
const Nick = styled.p`
  font-size: 1rem;
  text-align: center;
`;
const ScoreBoard = () => {
    const [score,setScore] = useState([]);
    const updateRating = () => {

    };

    useEffect(() => {
       socket.on("scoreBoard",updateRating);
    });
    return (
        <Container>
            <H1>Wyniki</H1>
            <Nick>Madzia 2000</Nick>
            <Nick>Łukasz 999</Nick>
        </Container>
    );
};

export default ScoreBoard;