import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

const Header = props => {

  return (
    <HeaderBar>
      <HeaderTitle className="title-pop-shadow" onClick={() => props.history.push("/")}>
        <HeaderSlogan>a trip down</HeaderSlogan>
        MemoryL|ne
        {props.displayName && <WelcomeTitle>Welcome {props.displayName}</WelcomeTitle> }
        
      </HeaderTitle>

    </HeaderBar>
  )
}

export default withRouter(Header);

Header.propTypes = {
  children: PropTypes.element,
  history: PropTypes.object,
}



const HeaderBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  font-family: 'Pacifico';
  background: linear-gradient(135deg, #994fad 0%,#3960d6 70%,#3960d6 70%,#3960d6 100%); 
  width: 100%;
  border-radius: 5px;

`;
const HeaderTitle = styled.div`
  font-size: 3em;
  color: white;
  text-shadow:  0 0 10px white;
  position: relative;
  border-radius: inherit;
  padding: 5px 10px;
  mix-blend-mode: multiply;
  background: #2C2C2C;
  width: 100%;
  height: 100%;
`;

const HeaderSlogan = styled.span`
  color: white;
  font-size: .3em;
  position: absolute;
  left: 5em;
  top: 10px;
`;

const WelcomeTitle = styled.span`
    position: absolute;
    right: 1em;
    top: 10px;
    font-size: 2px;
    color: white;
    font-weight: 300;
    font-size: .3em;
`;