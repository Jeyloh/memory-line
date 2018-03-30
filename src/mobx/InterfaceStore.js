import { extendObservable } from 'mobx'
import moment from 'moment';

const memoryFormModel = {
  title: "",
  description: "",
  startDateTime: moment(),
  endDateTime: moment(),
  imageSrc: ""
};

class InterfaceStore {
  constructor() {
    extendObservable(this, {
        showAddMemoryForm: false,
        showDate: false,
        showCalendarSuggestions: false,
        addMemoryForm: memoryFormModel,
    });
  }

  updateAddMemoryForm = (key, value) => {
    this.addMemoryForm = {...this.addMemoryForm, [key]: value}
  }

  toggleAddMemoryForm = () => {
    this.showAddMemoryForm = !this.showAddMemoryForm;
  }
  resetForm = () => {
    this.addMemoryForm = memoryFormModel;
  }

  fillFormWithSuggestions = (suggestionObj) => {
    this.showAddMemoryForm = true;
    this.addMemoryForm = suggestionObj;
  }

  toggleCalendarSuggestions = () => {
    this.showCalendarSuggestions = !this.showCalendarSuggestions;
  }

}

export const interfaceStore = new InterfaceStore();
