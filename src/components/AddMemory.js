import React, { Component } from 'react';
import { observer } from 'mobx-react';
import styled, {css} from 'styled-components'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class AddMemory extends Component {

  addMemory = (e, memoryFormObj) => {
    e.preventDefault();
    if (!memoryFormObj)
      return alert("failed to add");
    this.props.addMemory(memoryFormObj);
  }

  handleTextChange = (e) => {
    e.preventDefault();
    this.props.interfaceStore.updateAddMemoryForm(e.target.name, e.target.value)
  }
  handleDateChange = (name, date) => {
    this.props.interfaceStore.updateAddMemoryForm(name, date)
  }

  render() {
    const {addMemoryForm} = this.props.interfaceStore;
    return (
      <Wrapper>
        <NewMemoryForm onSubmit={(e) => {this.addMemory(e, addMemoryForm)}}>
          <Row>
            <TextColumn>
              <DateInput>
                <Label>From</Label>
                <DatePicker
                  name="startDateTime"
                  showTimeSelect
                  dateFormat="LL"
                  selected={addMemoryForm.startDateTime}
                  onChange={(date) => this.handleDateChange("startDateTime", date)}
                />
                <Label>To</Label>
                <DatePicker
                  name="endDateTime"
                  dateFormat="LL"
                  selected={addMemoryForm.endDateTime}
                  onChange={(date) => this.handleDateChange("endDateTime", date)}
                />
              </DateInput>
              <WideInput name="title"
                         type="text"
                         placeholder="Title"
                         value={addMemoryForm.title}
                         onChange={(e) => this.handleTextChange(e)}/>
              <DescriptionInput name="description"
                                placeholder="Description"
                                value={addMemoryForm.description}
                                onChange={(e) => this.handleTextChange(e)}/>
            </TextColumn>
            {media.giant &&
            <ImageDropColumn>

              <ImageDropper>
                Drop images here
              </ImageDropper>
            </ImageDropColumn>
            }
          </Row>
          <Row>
            <Button type="submit">Post memory</Button>
          </Row>

        </NewMemoryForm>

      </Wrapper>
    );
  }
}

export default observer(AddMemory);


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

const Label = styled.div`
`;

const DateInput = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 20px;
  width: 100%;
`;
const ImageDropper = styled.div`
  width: 250px;
  height: 250px;
  border: 2px dashed white;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  background: rgba(0, 0, 0, 0.2);
  color: white;
  height: auto;
  width: 100%;
  min-width: 300px;
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
  align-items: flex-start;
  width: 100%;
  ${media.giant`
    align-items: center;
  `}
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  
  ${media.giant`
    flex-direction: column;
    align-items: center;
  `}
`;

const WideInput = styled.input`
  width: 100%;
  margin-bottom: 20px;
  padding: 6px 12px;
  border: 2px solid white;
  border-radius: 3px;
  background-color: transparent;
  color: white;
  
  ::-webkit-input-placeholder {
    color: white;
  }
`;
const DescriptionInput = styled.textarea`
  width: 100%;
  height: 20em;
  margin-bottom: 20px;
  padding: 6px 12px;
  resize: vertical;
  border: 2px solid white;
  outline: none;
  border-radius: 3px;
  background-color: transparent;
  color: white;
  
  ::-webkit-input-placeholder {
    color: white;
  }
`;

const TextColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 60%;
  align-items: flex-start;
  ${media.giant`
    flex-direction: column;
    align-items: center;
    flex-basis: 80%;
    width: 80%;
  `}
  justify-content: space-around;
  padding: 20px;
`;

const ImageDropColumn = styled.div`
display: flex;
  flex-direction: column;
  flex-basis: 40%;
  align-items: flex-end;
  justify-content: flex-start;
  ${media.giant`
    flex-direction: column;
    align-items: center;
    flex-basis: 80%;
    width: 80%;

  `}
  justify-content: space-around;
  padding: 20px;
`;

