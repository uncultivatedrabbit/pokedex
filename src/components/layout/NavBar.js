import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import pokemonlogo from '../images/pokemon-logo-png-pokemon-logo-png-2000.png'

import styled from 'styled-components'

const NavBarStyle = {
  backgroundColor: "#ef5350",
  justifyContent: "space-between"
}

const StyledLink= styled(Link)`
  color: white;
  font-weight: bold;
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
  &:hover{
    color: #f1c40f;
  }
  
`



export default class NavBar extends Component {
  render() {
    return (
      <React.Fragment>
        <nav 
          style={NavBarStyle} 
          className="navbar navbar-expand-md navbar-dark fixed-top"
        >

        <a 
          className="navbar-brand col-sm-3 col-md-2 mr-0 align-items-center" 
          href="/"
        >
          <img style={{height: "3em", width: "auto"}}src={pokemonlogo} alt="Pokemon"/></a>

          <div>
            <StyledLink className="m-2" to="/pokemon/pokemongen/1">1st Gen Pokemon</StyledLink>
            <StyledLink className="m-2" to="/pokemon/pokemongen/2">2nd Gen Pokemon</StyledLink>
            <StyledLink className="m-2" to="/pokemon/pokemongen/3">3rd Gen Pokemon</StyledLink>
            <StyledLink className="m-2" to="/pokemon/pokemongen/4">4th Gen Pokemon</StyledLink>
            <StyledLink className="m-2" to="/pokemon/pokemongen/5">5th Gen Pokemon</StyledLink>
            <StyledLink className="m-2" to="/pokemon/pokemongen/6">6th Gen Pokemon</StyledLink>
            <StyledLink className="m-2" to="/pokemon/pokemongen/7">7th Gen Pokemon</StyledLink>
          </div>
        </nav>
      </React.Fragment>
    )
  }
}
