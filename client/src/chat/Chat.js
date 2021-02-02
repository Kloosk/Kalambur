import React,{useState,useEffect,useRef} from 'react';
import styled from 'styled-components'
import "./chat.css"
import {socket} from "../hooks/socketHooks";
import {useParams} from "react-router-dom";
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
const Chat = () => {
    let { room } = useParams();
    const [inputValue,setInputValue] = useState("");
    const messagesRef = useRef(null);
    const addMsg = ({name,msg}) => {
        const createMsg = document.createElement("div");

        const createPerson = document.createElement("p");
        const createText = document.createElement("p");

        const personName = document.createTextNode(`${name}: `);
        const msgText = document.createTextNode(msg);

        createPerson.appendChild(personName);
        createPerson.classList.add("person");
        createText.appendChild(msgText);
        createText.classList.add("txt");

        createMsg.appendChild(createPerson);
        createMsg.appendChild(createText);
        createMsg.classList.add("msg");

        messagesRef.current.appendChild(createMsg);

    };

    useEffect(() =>{
        socket.on("receiveMsg",addMsg);
    },[]);

    const handleSend = (e) => {
        if(e.key === "Enter" && inputValue !== ""){
            socket.emit("sendMsg",{name:"Madzia",msg:inputValue,room});
            setInputValue("");
        }
    };
    const handleChange = e => {
        setInputValue(e.target.value);
    };
    return (
        <Container>
            <H1>Czat</H1>
            <Messages ref={messagesRef}></Messages>
            <Input type="text" value={inputValue} onKeyDown={handleSend} onChange={handleChange}/>
        </Container>
    );
};

export default Chat;