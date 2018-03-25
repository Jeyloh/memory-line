import {fdb, auth, provider} from '../firebase/init'
import { extendObservable } from 'mobx'
import axios from "axios";

class MemoryStore {
  constructor() {
    extendObservable(this, {
      calendarList: null,
    });
  }

  getCalendarList = (accessToken) => {
    axios.get(`/api/getCalendarList/${accessToken}`).then(res => {
      console.table(res);
      const allEvents = res.data.calendarEvents.items;
      console.log(allEvents[0])
      this.calendarList = allEvents;
      console.log("SUCCESS FETCHING CALENDAR LIST");
    }).catch((err) => {
      console.error(err)
    })
  }
}

export const memoryStore = new MemoryStore();
