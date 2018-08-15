import React, { Component } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import store from "./mobx/index";
import PageRouter from "./containers/PageRouter";

class App extends Component {

  componentDidMount() {
    if (process.env['NODE_ENV'] !== 'production')
      document.title = `[DEV] Memory L|ne`
  }
  render() {
    return (
      <BrowserRouter>
        <PageRouter store={store} />
      </BrowserRouter>
    );
  }
}

export default App;
