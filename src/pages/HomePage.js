import React, { Component } from 'react';
import styled from 'styled-components'
import Header from "../components/Header"
import AddMemory from "../components/AddMemory"
import TimelineWrapper from "../components/Timeline"
import credentials from "../firebase/credentials/client"
import { observer } from 'mobx-react/index'
import { memoryStore } from "../mobx/MemoryStore"
import axios from 'axios/index'


class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: null
    }
  }

  static defaultProps = {
    calClientId: credentials.clientId,
    gApiKey: credentials.apiKey
  }

  getCalendarList = () => {
    axios.get(`/api/getCalendarList/${this.props.accessToken}`).then(res => {
      console.table(res);
      const allEvents = res.data.calendarEvents.items;
      console.log("exampleEvent: ", allEvents[0])
      this.setState({
        events: allEvents.slice(0, 10) // 10 first events
      })
      console.log("SUCCESS FETCHING CALENDAR LIST");
    }).catch((err) => {
      console.error(err)
    })
  }

  componentDidMount = () => {
    this.getCalendarList();
    this.props.memoryStore.getGoogleCalendarEvents()
  }

  componentDidReceiveProps() {
    this.setState({
      events: memoryStore.calendarList
    })
  }

  render() {
    return (
      <Wrapper>
        <Header onClick={() => this.props.logoutUser}/>
        <Width>
          <AddMemory />
          { this.state.events ? <TimelineWrapper events={this.state.events}/> : <div>Loading</div>}
        </Width>
      </Wrapper>
    );
  }
}

export default observer(HomePage);

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Width = styled.div`
  width: 80%;
`;