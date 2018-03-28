import React, { Component } from 'react';
import styled from 'styled-components'
import Header from "../components/Header"
import AddMemory from "../components/AddMemory"
import LoadingContainer from "../components/LoadingContainer"
import TimelineWrapper from "../components/Timeline"
import credentials from "../firebase/credentials/client"
import { observer } from 'mobx-react/index'
import { memoryStore } from "../mobx/MemoryStore"
import Toolbar from "../components/Toolbar"
import axios from 'axios/index'


class MemoriesPage extends Component {

  componentDidMount = () => {
    this.props.memoryStore.getGoogleCalendarEvents();
  }

  componentDidReceiveProps() {
    this.setState({
      events: memoryStore.calendarList
    })
  }

  render() {
    const { interfaceStore, authStore, memoryStore } = this.props;

    const calendarList = memoryStore.calendarList;

    return (
      <Wrapper>
        <Header />
        <Width>
          <Toolbar interfaceStore={interfaceStore} authStore={authStore} />
           { interfaceStore.showAddMemoryForm && <AddMemory /> }
          { interfaceStore.showCalendarSuggestions ? calendarList 
            ? <TimelineWrapper events={calendarList}/> 
            : <LoadingContainer /> 
            : null 
            }
        </Width>
      </Wrapper>
    );
  }
}

export default observer(MemoriesPage);


const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Width = styled.div`
  width: 80%;
`;