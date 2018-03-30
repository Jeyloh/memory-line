import React from 'react'
import { VerticalTimeline, VerticalTimelineElement, WorkIcon, SchoolIcon }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';


const TimelineWrapper = ({memories, calendarList, showSuggestions}) => {
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
          return (
            <VerticalTimelineElement
              key={object.date}
              className="vertical-timeline-element--work"
              date={object.date ? object.date : "start : end"}
              iconStyle={{ background: 'pink', color: '#fff' }}
              icon={WorkIcon}
            >
              <h3 className="vertical-timeline-element-title">{object.title}</h3>
              <h4 className="vertical-timeline-element-subtitle">Subtitle</h4>
              <p>
                Desc: {object.description}
              </p>
            </VerticalTimelineElement>
          )
        })}
      { showSuggestions &&
      calendarList.map( object => {
        const createDate = object.start.dateTime
          ? `${object.start.dateTime} - ${object.end.dateTime}`
          : null;
        return (
          <VerticalTimelineElement
            key={object.id}
            className="vertical-timeline-element--work"
            date={createDate ? createDate : "start - end"}
            iconStyle={{ background: 'purple', color: '#fff' }}
            icon={WorkIcon}
          >
            <h3 className="vertical-timeline-element-title">{object.summary}</h3>
            <h4 className="vertical-timeline-element-subtitle">Subtitle</h4>
            <p>
              Desc: {object.description}
            </p>
          </VerticalTimelineElement>
        )
      })
      }

    </VerticalTimeline>
  )
}

export default TimelineWrapper



