import React from 'react';
import styled,{keyframes} from 'styled-components'
import {Link} from "react-router-dom";

const morph = keyframes`
    0% {border-radius:  60% 40% 30% 70% / 60% 30% 70% 40%;}
    50% {border-radius:  30% 60% 70% 40% / 50% 60% 30% 60%;}
    100% {border-radius:  60% 40% 30% 70% / 60% 30% 70% 40%;}
`;
const Container = styled.div`
  margin-top: 100px;
  display: flex;
`;
const Btn = styled.button`
  user-select:none;
  font-size: 2rem;
  cursor: pointer;
  background: linear-gradient(45deg,#6EFF7D 0%, #FFF254 100%);
  border: none;
  height: 200px;
  transition: all 1s ease-in-out;
  width: 200px;
  color:#FF4781;
  z-index: 5;
  outline: none;
  animation: ${morph} 8s ease-in-out infinite;
  &:hover{
    transform: scale(1.05);
  }
`;
const Linkk = styled(Link)`
  text-decoration: none;
  &:nth-child(1){
  margin-right: 100px;
  }
`;
const Buttons = () => {
    return (
        <Container>
            <Linkk to="/login"><Btn>Zaloguj</Btn></Linkk>
            <Linkk to="/createroom"><Btn>Graj</Btn></Linkk>
        </Container>
    );
};

export default Buttons;