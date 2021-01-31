import React from 'react';
import styled from 'styled-components';
import Title from "./Title/Title";
import Buttons from "./buttons/Buttons";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #0D1117;
  overflow-x: hidden;
`;

const Start = () => {
    return (
        <Container>
             <Title/>
             <Buttons/>
        </Container>
    );
};

export default Start;