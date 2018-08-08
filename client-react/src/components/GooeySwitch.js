import React from 'react'
import styled from 'styled-components'


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
            <div className={ this.state.switchOn ? "switchContainer switchOn" : "switchContainer switchOff"} id="switchContainer" onClick={() => this.toggleSwitch()}>
                <div className="switchBg"></div>
                <div className="switchBtn"></div>
            </div>
            <svg className="gooey-svg" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <defs>
                    <filter id="gooey">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur"></feGaussianBlur>
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                    </filter>
                </defs>
            </svg>
            <Label>
                {this.props.label}
            </Label>
        </GooeyWrapper>
    )
    }
  }
  
  export default GooeySwitch
  
const Label = styled.div`
  margin-top: 30px;
`; 
const GooeyWrapper = styled.div`
  display: block;
  position: relative;

`;
