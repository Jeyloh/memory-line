import React from "react"
import { Switch, Route} from "react-router-dom"
import styled from "styled-components"
import { ROUTE } from "../const/index"
import WelcomePage from "../pages/WelcomePage"
import HomePage from "../pages/HomePage"

class PageRouter extends React.Component {


  render() {

    return (
        <Switch>
          <Route exact path={ROUTE.ROOT} component={WelcomePage} />
          <Route exact path={ROUTE.HOMEPAGE} component={HomePage} />
          <Route render={ () => (
            <ErrorMessage>
              Ops, nothing here :)
            </ErrorMessage>
          )} />
        </Switch>
    )
  }
}

const ErrorMessage = styled.div`
  color: black;
`;

export default PageRouter;

