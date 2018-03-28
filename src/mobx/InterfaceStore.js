import {fdb, auth, provider} from '../firebase/init'
import { extendObservable } from 'mobx'
import axios from 'axios/index'

class InterfaceStore {
  constructor() {
    extendObservable(this, {
        showAddMemoryForm: false,
        showDate: false,
        showCalendarSuggestions: false,
    });
  }

  toggleAddMemoryForm = () => {
    this.showAddMemoryForm = !this.showAddMemoryForm;
  }

  toggleCalendarSuggestions = () => {
    this.showCalendarSuggestions = !this.showCalendarSuggestions;
  }

  toggleDate = () => {
    this.showDate = !this.showDate;
  }
}

export const interfaceStore = new InterfaceStore();
