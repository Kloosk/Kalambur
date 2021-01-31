import React from 'react';
import styled from 'styled-components'

const Container = styled.div`
  height: 100%;
  width: 20%;
`;
const Messages = styled.div`
  height: 90%;
`;
const Input = styled.input`
  width: 100%;
  height: 5%;
`;
const H1 = styled.h1`
  height: 5%;
  font-size: 2rem;
  text-align: center;
  text-transform: uppercase;
  border-bottom: 1px solid green;
`;
const Msg = styled.div`
  display: flex;
  
`;
const Person = styled.p`
  font-size: 1.1rem;
  margin-right: 5px;
`;
const Txt = styled.p`
  font-size: 1.1rem;
`;
const Chat = () => {
    return (
        <Container>
            <H1>Czat</H1>
            <Messages>
                <Msg>
                    <Person>Madzia:</Person>
                    <Txt>JD</Txt>
                </Msg>
                <Msg>
                    <Person>Łukasz:</Person>
                    <Txt>Kocham Madzie 123</Txt>
                </Msg>
            </Messages>
            <Input type="text"/>
        </Container>
    );
};

export default Chat;