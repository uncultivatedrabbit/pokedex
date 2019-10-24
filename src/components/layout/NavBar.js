import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const NavBarStyle = {
  backgroundColor: "#ef5350",
}

export default class NavBar extends Component {
  render() {
    return (
      <div>
        <nav 
          style={NavBarStyle} 
          className="navbar navbar-expand-md navbar-dark fixed-top"
        >

        <a 
          className="navbar-brand col-sm-3 col-md-2 mr-0 align-items-center" 
          href="/"
        >
          Pokedex</a>
          <Link to="/pokemon/pokemongen/1">1st Gen Pokemon</Link>
          <Link to="/pokemon/pokemongen/2">2nd Gen Pokemon</Link>
        </nav>
      </div>
    )
  }
}
