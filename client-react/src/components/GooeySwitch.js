import React from 'react'
import styled from 'styled-components'
import gooeySVGUrl from "../assets/svg/gooey.xhtml"

class GooeySwitch extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      switchOn: false
    };

  }

  toggleSwitch = () => {
    this.props.handleToggle();
    this.setState({ switchOn: !this.state.switchOn })
  }

  render() {
    return (
      <GooeyWrapper>
        <svg className="gooey-svg" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <defs>
            <filter id="gooey">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
            </filter>
          </defs>
        </svg>
        <SwitchContainer className={ this.state.switchOn ? "switchContainer switchOn" : "switchContainer switchOff"} id="switchContainer" onClick={() => this.toggleSwitch()}>
          <div className="switchBg" />
          <div className="switchBtn" />
        </SwitchContainer>
        <Label>
          {this.props.label}
        </Label>
      </GooeyWrapper>
    )
  }
}

export default GooeySwitch

const SwitchContainer = styled.div`
  filter: url(${gooeySVGUrl}#gooey);//${document.getElementById("gooey")};
  -webkit-filter: url("#gooey");
  position: absolute;
  left:50%;top:50%;
  cursor: pointer;
  transform: translate(-50%, -50%) scale(2);
`;
const Label = styled.div`
  margin-top: 30px;
`;
const GooeyWrapper = styled.div`
  display: block;
  position: relative;

`;
