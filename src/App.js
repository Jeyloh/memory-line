import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from "react-router-dom"
import { authStore } from "./mobx/user.store"
import PageRouter from "./containers/PageRouter"

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <PageRouter authStore={authStore}/>
      </BrowserRouter>
    );
  }
}

export default App;
