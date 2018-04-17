import React from "react";
import styled from "styled-components";
import { media } from "../styles.const";
import { observer } from "mobx-react/index";

const ToolBar = ({ interfaceStore, authStore }) => {
  console.log("interfaceStore", interfaceStore);
  return (
    <ToolBarWrapper>
      <AlignLeft>
        <ToolbarButton
          style={
            interfaceStore.showAddMemoryForm
              ? { background: "rgba(0,0,0,0.5" }
              : null
          }
          onClick={() => interfaceStore.toggleAddMemoryForm()}
        >
          new memory
        </ToolbarButton>
        <ToolbarButton
          style={
            interfaceStore.showCalendarSuggestions
              ? { background: "rgba(0,0,0,0.5" }
              : null
          }
          onClick={() => interfaceStore.toggleCalendarSuggestions()}
        >
          google suggestions
        </ToolbarButton>
      </AlignLeft>

      <AlignRight>
        <ToolbarButton onClick={() => authStore.logoutUser()}>
          Logout
        </ToolbarButton>
      </AlignRight>
    </ToolBarWrapper>
  );
};

export default observer(ToolBar);

const ToolBarWrapper = styled.div`
  background: rgba(0, 0, 0, 0.2);
  color: white;
  min-height: 50px;
  width: 100%;
  border-radius: 5px;
  margin-top: 10px;
  display: flex;
  align-items: space-between;
  justify-content: space-between;
  padding: 20px 0;
  ${media.tablet`
flex-direction: column;
`};
`;

const AlignLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 20px;
  ${media.tablet`
flex-direction: column;
`};
`;

const AlignRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 20px;
  ${media.tablet`
flex-direction: column;
`};
`;

const ToolbarButton = styled.a`
  padding: 1vw 1.1vw;
  border: none;
  outline: none;
  border-bottom: 1px solid white;
  background: transparent;
  color: white;
  font-size: 1em;
  margin-left: 15px;
  transition: background 300ms;
  cursor: pointer;
  :hover {
    background: rgba(255, 255, 255, 0.4);
  }

  ${media.tablet`
width: 100%;
`};
`;
