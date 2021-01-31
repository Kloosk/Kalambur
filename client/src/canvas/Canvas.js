import React,{useRef,useEffect,useState} from 'react';
import styled from 'styled-components'

const Container = styled.div`
  height: 90%;
  width: 100%;
`;
const Canvas = ({state:{color,line}}) => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [isDrawing,setIsDrawing] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = containerRef.current.offsetWidth;
        canvas.height = containerRef.current.offsetHeight;
        const context = canvas.getContext("2d");
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = 5;
        contextRef.current = context;

        window.addEventListener("resize",() => {
            canvasRef.current.width = containerRef.current.offsetWidth;
            canvasRef.current.height = containerRef.current.offsetHeight;
        });
    },[]);
    useEffect(() => {
        contextRef.current.strokeStyle = color;
    },[color]);
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