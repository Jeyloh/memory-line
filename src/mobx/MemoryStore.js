import {fdb, auth, provider} from '../firebase/init'
import { extendObservable, action, computed, decorate } from 'mobx'
import axios from "axios";
import {authStore} from "./AuthStore"

class MemoryStore {
  constructor() {
    extendObservable(this, {
      newMemoryForm: {
        title: "",
        description: "",
        date: "",
        imageSrc: ""
      },
      calendarList: null,
      memoryList: null,
      get authorizedUser() { return authStore.user },
      get currentUserToken() { return authStore.accessToken }
    });
  }

  subscribeMemoryChanges = async () => {
    const uid = this.authorizedUser.uid;
    if (!uid) throw ("No user logged in");
    try {
      const response = await axios.get(`/memory/get-async-memory-list/${uid}`);
      debugger;
      return this.memoryList = response.data.memoryList;
    } catch (err) {
      return console.error(err)

    }
  }

  addMemory = async (memoryFormObj) => {
    const data = memoryFormObj;
    const uid = this.authorizedUser.uid;
    if (!uid) throw ("No user logged in");
    try {
      return await axios.post(`/memory/add-memory/${uid}`,
        data)
    } catch (err) {
      console.error(err)
      return err;
    }

  }

  getGoogleCalendarEvents = () => {
    debugger;
    const accessToken = this.currentUserToken;
    axios.get(`/calendar/get-events/${accessToken}`)
      .then(res => {
        console.table(res);
        const allEvents = res.data.calendarEvents.items;
        console.log(allEvents[0])
        this.calendarList = allEvents.slice(0, 10);
        console.log("SUCCESS FETCHING CALENDAR LIST");
      }).catch((err) => {
      console.error(err);
    })
  }
}


export const memoryStore = new MemoryStore();
