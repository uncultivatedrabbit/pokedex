import React, { Component } from 'react'
import PokemonCard from './PokemonCard'

export default class PokemonV1 extends Component {
  constructor() {
    super()
    this.state = {
      url: "https://pokeapi.co/api/v2/pokemon/?offset=386&limit=107",
      pokemon: null
    }
  }

  async componentDidMount() {
    const res = await fetch(this.state.url)
                  .then(res=>res.json())
                  .then(data=>data)
    this.setState({pokemon: Object.values(res.results)})
  }

  render() {
    return (
      <React.Fragment>
        {this.state.pokemon ?
        <div className="container">
          <div className="row">
            {this.state.pokemon.map(pokemon => (
              <PokemonCard
                name={pokemon.name}
                url={pokemon.url}
                key={pokemon.name}
              />
              ))}
          </div>
        </div>
           : <h1>Loading pokemon...</h1>}
      </React.Fragment>
    )
  }
}