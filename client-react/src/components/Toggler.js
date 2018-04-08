import React from 'react'
import styled from 'styled-components'

const Toggler = props => {

  return (
    <ToggleWrapper>
      Checkbox: Toggle "add"
      Checkbox: Toggle "calendar"
    </ToggleWrapper>
  )

}

export default Toggler


const ToggleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;