import React, { Component } from 'react';
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

const tempCheckbox = (
    <RadioContainer class="styled-input-single">
    <RadioInput type="checkbox" id="radio-one" />
    <RadioLabel for="radio-example-one">add memory</RadioLabel>
</RadioContainer>
)

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
    margin: 15px;
`;

const LogoutButton = styled.button`
    padding: 12px 15px;
    border: 2px solid white;
    border-radius: 5px;
    background: transparent;
    color: white;
    font-weight: 600;
    box-shadow: 0 2px 3px #ccc;
    margin: 15px;

`;

const RadioContainer = styled.section`
position: relative;
padding: 20px 0 20px 40px;
text-align: left;
margin: 0 20px;
`;

const RadioInput = styled.input`
position: absolute;
top: 0;
left: -9999px;
visibility: hidden;

&:checked + label {
&:before {
}
&:after {
  transform: translate3d(0, 0, 0);
  opacity: 1;
}
}
`;

const RadioLabel = styled.label`
cursor: pointer;
&:before,
&:after {
content: '';
position: absolute;
top: 50%;
border-radius: 50%;
}
&:before {
left: 0;
width: 30px;
height: 30px;
margin: -15px 0 0;
background: #f7f7f7;
box-shadow: 0 0 1px grey;
}
&:after {
left: 5px;
width: 20px;
height: 20px;
margin: -10px 0 0;
opacity: 0;
background: #37b2b2;
transform: translate3d(-40px, 0, 0) scale(0.5);
transition: opacity 0.25s ease-in-out, transform 0.25s ease-in-out;
}
`;