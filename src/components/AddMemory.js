import React, { Component } from 'react';
import styled, {css} from 'styled-components'
import DatePicker from "./DatePickerImpl"

class AddMemory extends Component {
  constructor(props) {
    super();
    this.state = {
      showForm: false
    }
  }

  render() {
    return (
      <Wrapper>
        { this.state.showForm &&
        <FlexContainerCol>
          <NewMemoryForm>
            <Inline>Date: <DatePicker /></Inline>
            <WideInput type="text" placeholder="Title"/>
            <DescriptionInput placeholder="Description" />
          </NewMemoryForm>
          <div>
            Drop images here:
            <ImageDropper />
          </div>

        </FlexContainerCol>
        }
        <ButtonContainerFlex>
        <Button redColor={this.state.showForm} onClick={ () => {this.setState({showForm: !this.state.showForm})}}>
          {this.state.showForm ? <span>Hide</span> : <span>Add Memory</span>}
        </Button>
        { this.state.showForm &&
          <Button>Post memory</Button>
        }
        </ButtonContainerFlex>
      </Wrapper>
    );
  }
}

export default AddMemory;


const sizes = {
  giant: 1170,
  desktop: 992,
  tablet: 768,
  phone: 376
}

// iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce((accumulator, label) => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  const emSize = sizes[label] / 16
  accumulator[label] = (...args) => css`
    @media (max-width: ${emSize}em) {
      ${css(...args)}
    }
  `
  return accumulator
}, {})

const Inline = styled.div`
  display: inline;
`;
const ImageDropper = styled.div`
  margin: 20px 0;
  width: 250px;
  height: 250px;
  border: 2px dashed white;
  border-radius: 5px;
`;
const ButtonContainerFlex = styled.div`
  display: flex;
  flex-direction: row;
`;
const Wrapper = styled.div`
  background: rgba(0, 0, 0, 0.2);
  color: white;
  height: auto;
  width: 100%;
  border-radius: 5px;
  margin-top: 10px;

`;

const Button = styled.button`
  padding: 10px;
  width: 100%;
  background-color: ${props => props.redColor ? "red" : "#2A2A2A"};
  color: white;
  border: 1px solid white;
  border-radius: 5px;
  cursor: pointer;
  transition: 500ms all;
  :hover {
    background-color: white;
    color: #2A2A2A;
  }
`;
const NewMemoryForm = styled.form `
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
`;
const WideInput = styled.input`
  width: 100%;
  margin-bottom: 20px;
  padding: 6px 12px;
`;
const DescriptionInput = styled.textarea`
  width: 100%;
  height: 20em;
  margin-bottom: 20px;
  padding: 6px 12px;
  resize: vertical;
`;
const FlexContainerCol = styled.div`
  display: flex;
  flex-direction: row;
  ${media.giant`
  flex-direction: column;
  `}
  justify-content: space-around;
  padding: 20px;
`;
