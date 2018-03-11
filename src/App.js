import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from "react-router-dom"
import PageRouter from "./containers/PageRouter"

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <PageRouter />
      </BrowserRouter>
    );
  }
}

export default App;
