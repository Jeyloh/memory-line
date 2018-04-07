import React from "react"
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


export default observer(PageRouter);

