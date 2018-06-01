import React from "react";
import styled, {keyframes} from 'styled-components'
import spray from "../assets/diamond-icon.png";

const LoadingContainer = () => (
    <Container>
        <div className="gooey-container">
            <div className="dot dot-1"></div>
            <div className="dot dot-2"></div>
            <div className="dot dot-3"></div>
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
            <defs>
                <filter id="goo">
                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7"/>
                </filter>
            </defs>
        </svg>
    </Container>
)

export default LoadingContainer;

const Container = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: transparent;
    padding: 20px;
`;


const rotate360 = keyframes`
from {
  transform: rotate(0deg);
}

to {
  transform: rotate(360deg);
}
`;

const Spinner = styled.div`
display: inline-text;
color: white;
font-size: 32px;
animation: ${rotate360} 2s linear infinite;

img {
    width: 100px;
    height: 100px;
}
`;


const LoadingText = styled.p`
    color: white;
    font-size: 1.8em;
`;
