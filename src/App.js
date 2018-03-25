import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from "react-router-dom"
import { authStore } from "./mobx/user.store"
import { memoryStore } from "./mobx/MemoryStore"
import PageRouter from "./containers/PageRouter"

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <PageRouter authStore={authStore} memoryStore={memoryStore}/>
      </BrowserRouter>
    );
  }
}

export default App;
