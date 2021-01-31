import React from 'react';
import styled from 'styled-components'
import {useForm} from "react-hook-form";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
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
const H1 = styled.h1`
  font-size: 2rem;
`;
const Flex = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const FlexForm = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width:100%; 
`;
const Error = styled.p`
 width: 100%;
 text-align: center;
 color: red;
 font-size: 1.2rem;
`;
const Label = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-top: 30px;
`;
const PInput = styled.label`
  font-size: 1.5rem;
  height: 40px;
  padding: 5px;
  width: 200px;
`;
const Input = styled.input`
  height: 40px;
  border: 1px solid green;
  outline: none;
  font-size: 1.2rem;
  padding-left: 5px;
  background: transparent;
`;
const InputNum = styled.input`
  width: 100px;
  height: 40px;
`;
const Submit = styled.button`
  width: 80%;
  background: transparent;
  font-size: 1.8rem;
  cursor: pointer;
  padding: 7px 0;
  outline: none;
  color: #fff;
  border: 1px solid black;
  border-radius: 3px;
  margin-top: 15px;
`;
const Select = styled.select`
  height: 40px;
  border: 1px solid green;
  outline: none;
  font-size: 1.2rem;
  padding-left: 5px;
  background: transparent;
`;
const Lobby = () => {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data =>{
        console.log(data);
    };
    return (
        <Container>
            <Flex>
                <Settings>
                    <H1>Poczekalnia</H1>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Label>
                            <FlexForm>
                                <PInput htmlFor="name">Twój nick</PInput>
                                <Input type="text" id="name" name="name" ref={register({required: true})} />
                            </FlexForm>
                            {errors.name && <Error role="alert">Podaj nazwę</Error>}
                        </Label>
                        <Label>
                            <FlexForm>
                                <PInput htmlFor="name">Rundy</PInput>
                                <InputNum type="number" id="rounds" name="rounds" ref={register({required: true})} />
                            </FlexForm>
                            {errors.rounds && <Error role="alert">Podaj ilość rund</Error>}
                        </Label>
                        <Label>
                            <FlexForm>
                                <PInput htmlFor="time">Czas rysowania</PInput>
                                <InputNum type="number" id="time" name="time" ref={register({required: true})} />
                            </FlexForm>
                            {errors.time && <Error role="alert">Podaj czas na rysowanie</Error>}
                        </Label>
                        <Label>
                            <FlexForm>
                                <PInput htmlFor="mode">Tryb</PInput>
                                <Select id="mode" name="mode" ref={register}>
                                    <option value="normal">Normalny</option>
                                    <option value="pair">Pary</option>
                                </Select>
                            </FlexForm>
                        </Label>
                        <Submit type="submit">STWÓRZ</Submit>
                    </Form>
                </Settings>
            </Flex>
        </Container>
    );
};

export default Lobby;