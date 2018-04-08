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
  constructor(props) {
    super(props);
    this.state = {
      counterFrom: 0,
      counterTo: 10
    }
  }

  componentDidMount = () => {
    this.props.memoryStore.getGoogleCalendarEvents();
    this.props.memoryStore.subscribeMemoryChanges()
      .then(() => {
        this.forceUpdate();
      });

    const self = this;
    window.onscroll = function(ev) {
      console.log(window.innerHeight + window.scrollY, " ", document.body.offsetHeight);
      const suggestions = self.props.interfaceStore.showCalendarSuggestions
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && suggestions) {
        // you're at the bottom of the page
        let count = self.state.counterTo + 10;
        self.setState({
          counterTo: count
        })
      }
    };
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


    const calendarList = memoryStore.calendarList
      ? memoryStore.calendarList.slice(this.state.counterFrom, this.state.counterTo)
      : null;
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