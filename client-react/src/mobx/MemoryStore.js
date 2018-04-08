import { extendObservable} from 'mobx'
import axios from "axios";
import {authStore} from "./AuthStore"
import {interfaceStore} from "./InterfaceStore"
import { fdb } from "../firebase-client/init"

class MemoryStore {
  constructor() {
    extendObservable(this, {
      calendarList: null,
      memoryList: null,
      get authorizedUser() { return authStore.user },
      get currentUserToken() { return authStore.accessToken },
      get toggleAddMemoryForm() { return interfaceStore.toggleAddMemoryForm },
      get resetForm() { return interfaceStore.resetForm; }
    });
  }

  subscribeMemoryChanges = async () => {
    const uid = this.authorizedUser.uid;
    if (!uid) throw new Error("No user logged in");
    // try {
    //   const response = await axios.get(`/memory/get-async-memory-list/${uid}`);
    //   debugger;
    //   return this.memoryList = response.data.memoryList;
    // } catch (err) {
    //   return console.error(err)
    // }
    const usersMemories = fdb.ref(`memories/${uid}`);

    try {
        usersMemories.on("value", snapshot => {
          console.log("Async operation started")
          console.log(snapshot.val());
          this.memoryList = snapshot.val();
        })
      } catch (error) {
        throw new Error(error);
      }
  }

  addMemory = async (memoryFormObj) => {
    const data = memoryFormObj;
    const uid = this.authorizedUser.uid;
    if (!uid) throw new Error("No user logged in");
    try {
      await axios.post(`/memory/add-memory/${uid}`, data);
      this.resetForm();
      this.toggleAddMemoryForm();
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
        this.calendarList = allEvents;
        console.log("SUCCESS FETCHING CALENDAR LIST");
      }).catch((err) => {
        console.error(err);
    })
  }
}


export const memoryStore = new MemoryStore();
