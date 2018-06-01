import React from 'react'
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
// import styled from 'styled-components'

let WorkIcon, SchoolIcon = null;

const TimelineWrapper = ({memories, calendarList, showSuggestions, addIntoForm}) => {
  // TODO: Map events from Firebase here aswell as calendar

  function returnValues(obj) {
    const temp = [];
    for (const key in obj) {
      temp.push(obj[key]);
    }
    return temp;
  }

  return (
    <VerticalTimeline>
      {
        returnValues(memories).map( object => {
          const createDate = object.startDateTime
            ? `${object.startDateTime} - ${object.endDateTime}`
            : null;
          return (
            <VerticalTimelineElement
              key={object.date}
              className="vertical-timeline-element--work "
              style={{backgroundColor: 'rgba(0, 0, 0, 0.5'}}
              date={createDate ? createDate : "start - end"}
              iconStyle={{ background: '#886AD3', color: '#fff' }}
              icon={SchoolIcon}
            >
              <h3 className="vertical-timeline-element-title">{object.title}</h3>
              <h4 className="vertical-timeline-element-subtitle">Subtitle</h4>
              <p>
                Desc: {object.description}
              </p>
            </VerticalTimelineElement>
          )
        })}
      { showSuggestions && calendarList &&
      calendarList.map( object => {
        const createDate = object.start.dateTime
          ? `${object.start.dateTime} - ${object.end.dateTime}`
          : null;
        return (
            <VerticalTimelineElement
              key={object.id}
              className="vertical-timeline-element--work suggestion-opaque"
              date={createDate ? createDate : "start - end"}
              iconStyle={{ background: '#38C5C8', color: '#fff' }}
              icon={WorkIcon}
            >
              <h3 className="vertical-timeline-element-title">{object.summary}</h3>
              <h4 className="vertical-timeline-element-subtitle">Subtitle</h4>
              <p>
                Desc: {object.description}
              </p>
              <button onClick={() => addIntoForm(object)}>add to new memory</button>
            </VerticalTimelineElement>
        )
      })
      }

    </VerticalTimeline>
  )
}

export default TimelineWrapper

// const AddSuggestionButton = styled.button`
//   position: absolute;
//   display: block;
//   width: 100%;
//   padding: 15px;
// `;