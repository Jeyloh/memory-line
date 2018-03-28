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
      get authorizedUser() { return authStore.user },
      get currentUserToken() { return authStore.accessToken }
    });
  }

  subscribeMemoryChanges = async () => {
    const uid = this.authorizedUser().currentUser.uid ? this.authorizedUser().currentUser.uid : auth.currentUser.uid;
    if (!uid) throw ("No user logged in");
    try {
      const memoryList = await axios.get(`/api/get-async-memory-list/${uid}`);
    } catch (err) {
      console.error(err)
    }
  }

  addMemory = async () => {
    const headers = {
      "Content-Type": "application/json"
    }
    const userId = auth.currentUser.uid;
    try {
      const addedMemory = await axios.post(`/api/add-memory/jorgenlybeck`, headers)
    } catch (err) {
      console.error(err)
    }

  }

  getGoogleCalendarEvents = () => {
    debugger;
    console.log(auth);
    const userId = auth.currentUser.uid;
    axios.get(`/api/getCalendarList/${authStore.accessToken}`).then(res => {
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
