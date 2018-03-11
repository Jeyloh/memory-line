import React, { Component } from 'react';
import styled from 'styled-components'
import Header from "../components/Header"
import AddMemory from "../components/AddMemory"
import TimelineWrapper from "../components/Timeline"

class HomePage extends Component {
  render() {
    return (
      <Wrapper>
        <Header />
        <Width>
        <AddMemory />
        <TimelineWrapper />
        </Width>
      </Wrapper>
    );
  }
}

export default HomePage;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

`;

const Width = styled.div`
  width: 80%;
`;