import React from 'react'

import { Link } from "react-router-dom"

const Navbar = () => {

  return [
      <Link style={LinkStyle} to="/"> Welcome </Link>,
      <Link style={LinkStyle} to="/home"> Mypage </Link>
  ]
}

export default Navbar;

const LinkStyle = {
  textDecoration: 'none',
  marginRight: 5,
  borderBottomStyle: 'solid',
  borderBottomColor: 'white',
  color: 'white',
  fontFamily: 'Roboto'
}