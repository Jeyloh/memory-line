import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components'
import HeaderSection from "../components/HeaderSection"
import FeedContainer from "../components/FeedContainer"
class WelcomePage extends React.Component {

  render() {
    return [
      <HeaderSection />,
      <ContentWrapper>
        <Content>
          <h1>Your feed</h1>
          <FeedContainer />
        </Content>
      </ContentWrapper>
    ]
  }
}

export default WelcomePage;

WelcomePage.propTypes = {
  children: PropTypes.element
}

const Content = styled.div`
  width: 100%;
  padding: 20px;
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  border-radius: 5px;
  margin: 20px 0;
`;
