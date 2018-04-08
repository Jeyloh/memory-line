import React from 'react';
import styled from 'styled-components'
import { observer } from 'mobx-react/index'

const ToolBar = ({interfaceStore, authStore}) => {
    console.log("interfaceStore", interfaceStore);
    return (
        <ToolBarWrapper>
            <AlignLeft>
                <LogoutButton onClick={() => authStore.logoutUser()} >Logout</LogoutButton>
                <WelcomeTitle>Welcome {authStore.user.displayName}</WelcomeTitle>
            </AlignLeft>
            
            <AlignRight>
                <ToggleButton style={interfaceStore.showAddMemoryForm ? {background: "rgba(0,0,0,0.5"}: null} 
                                onClick={() => interfaceStore.toggleAddMemoryForm()} >add memory</ToggleButton>
                <ToggleButton style={interfaceStore.showCalendarSuggestions ? {background: "rgba(0,0,0,0.5"}: null}  
                            onClick={() => interfaceStore.toggleCalendarSuggestions()}>toggle calendar</ToggleButton>
                
            </AlignRight>
        </ToolBarWrapper>
      
    );
}

export default observer(ToolBar);


const ToolBarWrapper = styled.div`
background: rgba(0, 0, 0, 0.2);
color: white;
height: 50px;
width: 100%;
border-radius: 5px;
margin-top: 10px;
display: flex;
align-items: space-between;
justify-content: space-between;
padding: 20px 0;
`;

const AlignLeft = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 20px;

`;

const AlignRight = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 20px;

`;

const WelcomeTitle = styled.p`
    color: white;
    font-weight: 300;
    font-size: 1em;
`;

const ToggleButton = styled.button`
    padding: 12px 15px;
    border: 2px solid white;
    border-radius: 5px;
    background: transparent;
    color: white;
    margin-left: 15px;
`;

const LogoutButton = styled.button`
    padding: 12px 15px;
    border: 2px solid white;
    border-radius: 5px;
    background: transparent;
    color: white;
    font-weight: 600;
    box-shadow: 0 2px 3px #ccc;
    margin-right: 15px;

`;
