import {fdb, auth, provider} from '../firebase/init'
import { extendObservable } from 'mobx'
import axios from 'axios/index'
import moment from 'moment';

class InterfaceStore {
  constructor() {
    extendObservable(this, {
        showAddMemoryForm: false,
        showDate: false,
        showCalendarSuggestions: false,
        addMemoryForm: {
          title: "",
          date: moment(),
          description: ""
        },
    });
  }

  updateAddMemoryForm = (key, value) => {
    this.addMemoryForm = {...this.addMemoryForm, [key]: value}
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
