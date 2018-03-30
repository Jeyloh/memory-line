import React, { Component } from 'react';
import styled from 'styled-components'
import Header from "../components/Header"
import AddMemory from "../components/AddMemory"
import LoadingContainer from "../components/LoadingContainer"
import TimelineWrapper from "../components/Timeline"
import { observer } from 'mobx-react/index'
import Toolbar from "../components/Toolbar"
import moment from "moment"

class MemoriesPage extends Component {

  componentDidMount = () => {
    this.props.memoryStore.getGoogleCalendarEvents();
    this.props.memoryStore.subscribeMemoryChanges()
      .then(() => {
        this.forceUpdate();
      });
  }

  addSuggestionToForm = (object) => {
    const startDateTime = moment(object.start.dateTime, "YYYY-MM-DDTHH:mm:ss.SSSZ", true);
    const endDateTime = moment(object.end.dateTime, "YYYY-MM-DDTHH:mm:ss.SSSZ", true);
    const suggestionObject = {
      title: object.summary,
      description: object.description,
      startDateTime: startDateTime,
      endDateTime: endDateTime,
      imageSrc: ""
    }
    debugger;
    this.props.interfaceStore.fillFormWithSuggestions(suggestionObject)
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
                               addIntoForm={this.addSuggestionToForm}
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