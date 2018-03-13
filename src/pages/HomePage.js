import React, { Component } from 'react';
import styled from 'styled-components'
import Header from "../components/Header"
import AddMemory from "../components/AddMemory"
import TimelineWrapper from "../components/Timeline"
import credentials from "../firebase/credentials/client"


class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {}

  }
  static defaultProps = {
    calClientId: credentials.clientId,
    gApiKey: credentials.apiKey
  }

  getCalendarEvents = () => {
    fetch("")
      .then( result => {
        this.setState({
          events: result.data
        })
      })
      .catch( err => {
        console.error(err);
      })
  }

  componentDidMount = () => {
  }

  render() {
    return (
      <Wrapper>
        <Header onClick={() => this.props.logoutUser}/>
        <Width>
          <AddMemory />
          { this.state.events && <TimelineWrapper cKey={this.props.calendarKey}/> }
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