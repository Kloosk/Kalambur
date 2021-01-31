import React from 'react';
import styled from 'styled-components'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Settings = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 30%;
  background-color: pink;
  border: 2px solid black;
`;
const Area = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  margin-top: 15px;
`;
const P = styled.p`
  font-size: 1.5rem;
  text-align: center;
`;
const Input = styled.input`
  padding-left: 2px;
  height: 30px;
  width: 200px;
`;
const InputNum = styled.input`
  width: 30px;
  height: 30px;
`;
const Players = styled.div`
  width: 50%;
`;
const Mode = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 10px;
  width: 80%;
`;
const Btn = styled.button`
  margin-top: 5px;
  width: 200px;
  cursor: pointer;
  padding: 7px 14px;
  text-transform: uppercase;
`;
const H1 = styled.h1`
  font-size: 2rem;
`;
const Lobby = () => {
    return (
        <Container>
            <Settings>
                <H1>Poczekalnia</H1>
                <Area>
                    <P>Nazwa</P>
                    <Input type="text"/>
                </Area>
                <Area>
                    <P>Rundy</P>
                    <InputNum type="text"/>
                </Area>
                <Area>
                    <P>Czas rysowania</P>
                    <InputNum type="text"/>
                </Area>
                <Mode>
                    <P>Tryb</P>
                    <Btn>Normalny</Btn>
                    <Btn>Pary</Btn>
                </Mode>
            </Settings>
            <Players>

            </Players>
        </Container>
    );
};

export default Lobby;