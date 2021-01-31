import React from 'react';
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  height: 5%;
  border-top: 1px solid black;
  display: flex;
`;
const Area = styled.div`
  display: flex;
  align-items: center;
`;
const ColorBtn = styled.button`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  outline: none;
  cursor: pointer;
  border: 1px solid #000;
  &:nth-child(1){
    background-color: #B96AC9;
  }
  &:nth-child(2){
    background-color: #DDFFF7;
  }
  
`;
const LineBtn = styled.button`
  outline: none;
  cursor: pointer;
  border-radius: 50%;
  &:nth-child(1){
      width: 10px;
      height: 10px;
  }
  &:nth-child(2){
      width: 25px;
      height: 25px;
  }
  &:nth-child(3){
      width: 35px;
      height: 35px;
  }
  
`;
const Toolbar = ({dispatch}) => {
    const handleColor = color => {
        dispatch({ type: 'SET_COLOR', payload: color});
    };
    const handleLine = line => {
        dispatch({ type: 'SET_LINE', payload: line});
    };
    return (
        <Container>
            <Area>
                <ColorBtn onClick={() => handleColor("#B96AC9")}/>
                <ColorBtn onClick={() => handleColor("#DDFFF7")}/>
            </Area>
            <Area>
                <LineBtn onClick={() => handleLine(5)}/>
                <LineBtn onClick={() => handleLine(15)}/>
                <LineBtn onClick={() => handleLine(30)}/>
            </Area>
        </Container>
    );
};

export default Toolbar;