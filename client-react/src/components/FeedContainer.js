import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components'

class FeedContainer extends React.Component {

  render() {
    return (
        <Wrapper>
            <FeedPost>My post</FeedPost>
            <FeedPost>My other post</FeedPost>
            <FeedPost>
              <h1>Memory title</h1>
              <p>Memory description is longer than the title and this is filled up with information about the event</p>
              <ImageWrapper>
               <FeedPostImage src="https://pixabay.com/en/image-statue-brass-child-art-1465348/" alt="Mountain View" />
               <FeedPostImage src="https://pixabay.com/en/image-statue-brass-child-art-1465348/" alt="Mountain View" />
               <FeedPostImage src="https://pixabay.com/en/image-statue-brass-child-art-1465348/" alt="Mountain View" />

              </ImageWrapper>
            </FeedPost>
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

const ImageWrapper = styled.div`
  display: flex; 
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  flex-basis: 100%;
`;

const FeedPostImage = styled.img`
  width: 200px;
  height: 200px;
  margin: 5px;
  border: 1px solid white;
`;
const FeedPost = styled.section`
    min-width: 45%;
    min-height: 5em;
    border: 1px solid purple;
    padding: 20px;
    margin: 20px;
    background: rgba(255, 255, 255, 0.6);
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: flex-start;
    
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  border-radius: 5px;
  margin: 20px 0;
`;
