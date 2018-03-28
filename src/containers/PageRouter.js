import React from "react"
import { Switch, Route} from "react-router-dom"
import styled from "styled-components"
import { ROUTE } from "../const/index"
import WelcomePage from "../pages/WelcomePage"
import MemoriesPage from "../pages/MemoriesPage"
import { observer } from 'mobx-react'


class PageRouter extends React.Component {

  render() {
    const {authStore, memoryStore, interfaceStore} = this.props.store;

    if (!authStore.user) {
      return (
        <WelcomePage loginUser={authStore.loginUser} />
      )
    } else {
      return (
        <MemoriesPage interfaceStore={interfaceStore} 
                      authStore={authStore}
                      memoryStore={memoryStore} />
      )
    }
  }
}

const ErrorMessage = styled.div`
  color: black;
`;

export default observer(PageRouter);

