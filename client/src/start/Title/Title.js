import React from 'react';
import styled, {keyframes} from 'styled-components'

const goDown = keyframes`
        0%   { transform: scale(1,1)      translateY(0); }
        10%  { transform: scale(1.1,.9)   translateY(0); }
        30%  { transform: scale(.9,1.1)   translateY(-200px); }
        50%  { transform: scale(1.05,.95) translateY(0); }
        57%  { transform: scale(1,1)      translateY(-7px); }
        64%  { transform: scale(1,1)      translateY(0); }
        100% { transform: scale(1,1)      translateY(0); }
`;
const goJumpLow = keyframes`
        0%   { transform: scale(1,1)      translateY(0); }
        10%  { transform: scale(1.1,.9)   translateY(0); }
        30%  { transform: scale(.9,1.1)   translateY(-20px); }
        50%  { transform: scale(1.05,.95) translateY(0); }
        57%  { transform: scale(1,1)      translateY(-7px); }
        64%  { transform: scale(1,1)      translateY(0); }
        100% { transform: scale(1,1)      translateY(0); }
`;
const goJumpHigh = keyframes`
        0%   { transform: scale(1,1)      translateY(0); }
        10%  { transform: scale(1.1,.9)   translateY(0); }
        30%  { transform: scale(.9,1.1)   translateY(-50px); }
        50%  { transform: scale(1.05,.95) translateY(0); }
        57%  { transform: scale(1,1)      translateY(-7px); }
        64%  { transform: scale(1,1)      translateY(0); }
        100% { transform: scale(1,1)      translateY(0); }
`;
const goJumpMedium = keyframes`
        0%   { transform: scale(1,1)      translateY(0); }
        10%  { transform: scale(1.1,.9)   translateY(0); }
        30%  { transform: scale(.9,1.1)   translateY(-30px); }
        50%  { transform: scale(1.05,.95) translateY(0); }
        57%  { transform: scale(1,1)      translateY(-7px); }
        64%  { transform: scale(1,1)      translateY(0); }
        100% { transform: scale(1,1)      translateY(0); }
`;
const Span = styled.span`
  font-family: 'Hachi Maru Pop', cursive;
  font-size: 100px;
  text-transform: uppercase;
  letter-spacing: 4px;
  display: inline-block;
  &:nth-child(1){
    color: #54518A;
  }
  &:nth-child(2){
    color: #4AC2A0;
  }
  &:nth-child(3){
    color: #08A360;
  }
  &:nth-child(4){
    color: #F2E057;
  }
  &:nth-child(5){
    color: #ED8F4C;
  }
  &:nth-child(6){
    color: #0798DA;
  }
  &:nth-child(7){
    color: #262478;
  }
  &:nth-child(8){
    color: #91320B;
  }
  &:nth-child(9){
    color: #FBC954;
  }
  &:nth-child(1n+0){
    animation: 2s ${goDown} ease-out,1.5s ease-out 1.8s infinite ${goJumpHigh};
  }
  &:nth-child(2n+0){
    animation: 2s ${goDown} ease-out,1.5s ease-out 1.8s infinite ${goJumpMedium};
  }
  &:nth-child(3n+0){
    animation: 2s ${goDown} ease-out,1.5s ease-out 1.8s infinite ${goJumpLow};
  }
`;
const Hr = styled.hr`
  display: block;
  height: 20px;
  width: 500px;
  background-color: #161B22;
  border: none;
  border-radius: 50%;
`;
const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  user-select: none;
`;
const Title = () => {
    return (
       <Flex>
           <div>
               <Span>K</Span>
               <Span>a</Span>
               <Span>l</Span>
               <Span>a</Span>
               <Span>m</Span>
               <Span>b</Span>
               <Span>u</Span>
               <Span>r</Span>
               <Span>y</Span>
           </div>
           <Hr/>
       </Flex>
    );
};

export default Title;