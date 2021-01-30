import React from 'react';
import styled from 'styled-components';
import Title from "./Title/Title";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #0D1117;
`;
const Btn = styled.button`
  
`;

const Start = () => {
    return (
        <Container>
             <Title/>
        </Container>
    );
};

export default Start;