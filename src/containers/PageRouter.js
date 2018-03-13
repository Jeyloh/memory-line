import React from "react"
import { Switch, Route} from "react-router-dom"
import styled from "styled-components"
import { ROUTE } from "../const/index"
import WelcomePage from "../pages/WelcomePage"
import HomePage from "../pages/HomePage"
import { observer } from 'mobx-react'


class PageRouter extends React.Component {

  render() {
    const {authStore} = this.props;

    if (!authStore.user) {
      return (
        <WelcomePage loginUser={authStore.login} />
      )
    } else {
      return (
        <HomePage user={authStore.user} token={authStore.token} logoutUser={authStore.logoutUser} />
      )
    }
  }
}

const ErrorMessage = styled.div`
  color: black;
`;

export default observer(PageRouter);

