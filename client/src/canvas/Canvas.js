import React,{useRef,useEffect,useState} from 'react';
import styled from 'styled-components'
import io from "socket.io-client";

const socket = io("http://localhost:4000");

const Container = styled.div`
  height: 90%;
  width: 100%;
`;
const Canvas = ({state:{color,line}}) => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [isDrawing,setIsDrawing] = useState(false);

    const newDrawing = ({x,y}) => {
        contextRef.current.lineTo(x,y);
        contextRef.current.stroke();
    };

    useEffect(() => {
        socket.on('mouse',newDrawing);
        const canvas = canvasRef.current;
        canvas.width = containerRef.current.offsetWidth;
        canvas.height = containerRef.current.offsetHeight;
        const context = canvas.getContext("2d");
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = 5;
        contextRef.current = context;

        //responsive canvas
        window.addEventListener("resize",() => {
            canvasRef.current.width = containerRef.current.offsetWidth;
            canvasRef.current.height = containerRef.current.offsetHeight;
        });
    },[]);
    //set color in canvas
    useEffect(() => {
        contextRef.current.strokeStyle = color;
    },[color]);

    //set line width in canvas
    useEffect(() => {
        contextRef.current.lineWidth = line;
    },[line]);

    const startDrawing = ({nativeEvent}) => {
        const {offsetX,offsetY} = nativeEvent;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX,offsetY);
        setIsDrawing(true);
    };
    const finishDrawing = () => {
        contextRef.current.closePath();
        setIsDrawing(false);
    };
    const draw = ({nativeEvent}) => {
        if(!isDrawing) return;
        const {offsetX,offsetY} = nativeEvent;
        contextRef.current.lineTo(offsetX,offsetY);
        contextRef.current.stroke();
        socket.emit('mouse',{x:offsetX,y:offsetY});
    };
    return (
        <Container ref={containerRef}>
            <canvas
                onMouseDown={startDrawing}
                onMouseUp={finishDrawing}
                onMouseMove={draw}
                ref={canvasRef}
            />
        </Container>
    );
};

export default Canvas;