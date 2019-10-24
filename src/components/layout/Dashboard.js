import React, { Component } from 'react'
import PokemonV1 from '../pokemon/PokemonV1'
import PokemonV2 from '../pokemon/PokemonV2'

export default class Dashboard extends Component {
  render() {
    return (
      <div className="row">
        <div className="col">
          <PokemonV1/>
        </div>
      </div>
    )
  }
}
