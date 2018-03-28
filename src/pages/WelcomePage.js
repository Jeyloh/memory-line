import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components'
import Header from "../components/Header"
import { Link } from "react-router-dom"

class WelcomeSection extends React.Component {

  render() {
    return (
      <ContentWrapper>
        <Header />
        <WelcomeText>Hi. Welcome to MemoryL|ne, the application for you who want to store
          your memories forever! Your unified portal to lookup all your memories and
          easily enjoy them.</WelcomeText>
        <ButtonWrapper>
          <TemptingButton onClick={this.props.loginUser}>Google Login</TemptingButton>
          <TemptingButton>About</TemptingButton>
          <TemptingButton>Contribute</TemptingButton>
        </ButtonWrapper>
      </ContentWrapper>
    )
  }
}

export default WelcomeSection;

WelcomeSection.propTypes = {
  children: PropTypes.element
}


const WelcomeText = styled.div`
  color: white;
  text-align: center;
  margin: 20px 30%;
`;
const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
    
`;
const TemptingButton = styled.button`
  height: 15em;
  width: 15em;
  padding: 50px;
  margin: 20px;
  border-radius: 5px;
  font-family: 'Pacifico';
  color: white;
  background: transparent;
  border: 2px solid white;
  transition: 200ms all;
  &:hover {
    background: white;
    color: black;
  }
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  font-family: 'Pacifico';
  background: #2A2A2A;
  width: 100%;
    border-radius: 5px;

`;
