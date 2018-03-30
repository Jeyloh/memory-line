import React, { Component } from 'react';
import styled from 'styled-components'
import Header from "../components/Header"
import AddMemory from "../components/AddMemory"
import LoadingContainer from "../components/LoadingContainer"
import TimelineWrapper from "../components/Timeline"
import { observer } from 'mobx-react/index'
import Toolbar from "../components/Toolbar"


class MemoriesPage extends Component {

  componentDidMount = () => {
    this.props.memoryStore.getGoogleCalendarEvents();
    this.props.memoryStore.subscribeMemoryChanges()
      .then(() => {
        this.forceUpdate();
      });
  }

  render() {
    const { interfaceStore, authStore, memoryStore } = this.props;

    const calendarList = memoryStore.calendarList;
    const memoryList = memoryStore.memoryList;

    return (
      <Wrapper>
        <Header />
        <Width>
          <Toolbar interfaceStore={interfaceStore} authStore={authStore} />
           { interfaceStore.showAddMemoryForm
            && <AddMemory addMemory={this.props.memoryStore.addMemory}
                          interfaceStore={interfaceStore}/> }
          {memoryList
            ? <TimelineWrapper memories={memoryList}
                               calendarList={calendarList}
                               showSuggestions={interfaceStore.showCalendarSuggestions}/>
            : <LoadingContainer/>
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