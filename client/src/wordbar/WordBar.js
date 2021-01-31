import React from 'react';
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  height: 5%;
  border-bottom: 1px solid black;
`;
const Word = styled.h1`
  font-size: 3rem;
  text-align: center;
`;
const WordBar = () => {
    return (
        <Container>
            <Word>----- -- ----</Word>
        </Container>
    );
};

export default WordBar;