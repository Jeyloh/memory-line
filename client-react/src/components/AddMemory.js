import React, { Component } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { media } from "../styles.const";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker-cssmodules.css";

class AddMemory extends Component {
  addMemory = (e, memoryFormObj) => {
    e.preventDefault();
    if (!memoryFormObj) return alert("failed to add");

    const memoryWithIsoDate = {
      title: memoryFormObj.title,
      description: memoryFormObj.description,
      startDateTime: memoryFormObj.startDateTime.toISOString(),
      endDateTime: memoryFormObj.endDateTime.toISOString(),
      imageSrc: memoryFormObj.imageSrc
    };
    this.props.addMemory(memoryWithIsoDate);
  };

  handleTextChange = e => {
    e.preventDefault();
    this.props.interfaceStore.updateAddMemoryForm(
      e.target.name,
      e.target.value
    );
  };
  
  handleDateChange = (name, date) => {
    this.props.interfaceStore.updateAddMemoryForm(name, date);
  };

  

  render() {
    const { addMemoryForm } = this.props.interfaceStore;
        
    const addMemoryOpacity = {
      opacity: this.props.display ? '100' : '0',
      height: this.props.display ? '100%' : 0,
      transition: this.props.display ? 'all 1000ms' : 'none'
      
    }

    return (
      <Wrapper style={addMemoryOpacity}>
        <NewMemoryForm
          onSubmit={e => {
            this.addMemory(e, addMemoryForm);
          }}
        >
          <Row>
            <TextColumn>
              <DateWrapper>
                <DateInput>
                  <Label>From</Label>
                  <DatePicker
                    name="startDateTime"
                    dateFormat="LL"
                    selected={addMemoryForm.startDateTime}
                    onChange={date =>
                      this.handleDateChange("startDateTime", date)
                    }
                  />
                </DateInput>
                <DateInput>
                  <Label>To</Label>
                  <DatePicker
                    name="endDateTime"
                    dateFormat="LL"
                    selected={addMemoryForm.endDateTime}
                    onChange={date =>
                      this.handleDateChange("endDateTime", date)
                    }
                  />
                </DateInput>
              </DateWrapper>
              <WideInput
                name="title"
                type="text"
                placeholder="Title"
                value={addMemoryForm.title}
                onChange={e => this.handleTextChange(e)}
              />
              <DescriptionInput
                name="description"
                placeholder="Description"
                value={addMemoryForm.description}
                onChange={e => this.handleTextChange(e)}
              />
            </TextColumn>
            <ImageDropColumn>
              <ImageDropper>Drop images here</ImageDropper>
            </ImageDropColumn>
          </Row>
          <Button type="submit">Post memory</Button>
        </NewMemoryForm>
      </Wrapper>
    );
  }
}

export default observer(AddMemory);

const Wrapper = styled.div`
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.2);
  color: white;
  height: auto;
  width: 100%;
  min-width: 300px;
  border-radius: 5px;
  margin-top: 10px;
`;

const Label = styled.label`
  padding: 5px 0;
  position: absolute;
  top: -25px;
  left: 10px;
`;

const DateWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 20px 0;
  justify-content: space-between;
  align-items: center;
`;
const DateInput = styled.div`
  position: relative;
`;
const ImageDropper = styled.div`
  width: 250px;
  height: 250px;
  border: 2px dashed white;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${media.tablet`
    width: 100%;
    height: 100px;
  `};
`;

const Button = styled.button`
  padding: 10px;
  width: 100%;
  background-color: ${props => (props.redColor ? "red" : "#2A2A2A")};
  color: white;
  border: 1px solid white;
  border-radius: 5px;
  cursor: pointer;
  transition: 500ms all;
  :hover {
    background-color: white;
    color: #2a2a2a;
  }
`;
const NewMemoryForm = styled.form`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: space-around;
  width: 100%;
  ${media.tablet`
    align-items: center;
  `};
`;

const Row = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  flex-direction: row;
  padding: 20px;

  ${media.tablet`
    flex-direction: column;
    align-items: center;
  `};
`;

const WideInput = styled.input`
  width: 100%;
  margin-bottom: 20px;
  padding: 12px 10px;
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
  height: 5em;
  margin-bottom: 20px;
  padding: 12px 10px;
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
  justify-content: space-around;
  ${media.tablet`
    flex-direction: column;
    align-items: center;
    flex-basis: 100%;
    width: 100%;
  `} 
`;

const ImageDropColumn = styled.div`
  display: flex;
  flex-basis: 40%;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  ${media.tablet`
    flex-direction: column;
    align-items: center;
    width: 100%;
  `};
`;
