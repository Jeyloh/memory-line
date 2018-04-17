import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components'

class FeedContainer extends React.Component {

  render() {
    return (
        <Wrapper>
            <FeedPost>My post</FeedPost>
            <FeedPost>My other post</FeedPost>
            <FeedPost>Someones post</FeedPost>
            <FeedPost>Someones post</FeedPost>
            <FeedPost>Someones post</FeedPost>
        </Wrapper>
    )
  }
}

export default FeedContainer;

FeedContainer.propTypes = {
  children: PropTypes.element
}

const FeedPost = styled.section`
    flex-basis: 25%;
    min-height: 5em;
    border: 1px solid purple;
    padding: 20px;
    margin: 20px;
    background: rgba(255, 255, 255, 0.6);
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid black;
  width: 100%;
  border-radius: 5px;
  margin: 20px 0;
`;
