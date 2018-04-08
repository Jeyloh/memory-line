import React from "react";
import styled, {keyframes} from 'styled-components'

const LoadingContainer = () => (
    <Container>
        <Spinner>[[L]]</Spinner>
        <LoadingText>Loading text...</LoadingText>
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
`;


const LoadingText = styled.p`
    color: white;
    font-size: 1.8em;
`;
