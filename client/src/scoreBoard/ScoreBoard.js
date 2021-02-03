import React,{useState,useEffect} from 'react';
import styled from 'styled-components'
import {socket} from "../hooks/socketHooks";
import {useParams} from "react-router-dom";

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
  color: indianred;
`;
const Score = styled.p`
  font-size: 1rem;
`;
const Flex = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ScoreBoard = () => {
    let { room } = useParams();
    const [score,setScore] = useState([]);
    const updateRating = (data) => {
        setScore(data);
    };
    useEffect(() => {
       socket.on("scoreBoard",updateRating);
       socket.emit("scoreBoard",room);
    },[]);
    return (
        <Container>
            <H1>Wyniki</H1>
            {score && score.map(el => (
                <Flex>
                    <Nick>{el.name}</Nick>
                    <Score>{el.score}</Score>
                </Flex>
            ))}
        </Container>
    );
};

export default ScoreBoard;