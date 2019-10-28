import React, { Component } from 'react'
import styled from 'styled-components'

const Anchor = styled.a`
  text-decoration: none;
  color: white;
  margin-bottom: 2em;
  &:hover {
    text-decoration: underline;
    color: white;
  }
`

class Selector extends Component {
  constructor() {
    super()
    this.state = {
      prevPokemonId: '',
      nextPokemonId: '',
      currentPokemonId: '',
    }
  }

  componentDidMount() {
    
    const {prevPokemonId, nextPokemonId, currentPokemonId} = this.props
    this.setState({
      prevPokemonId,
      nextPokemonId,
      currentPokemonId
    }) 

  }
  
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-12 d-flex justify-content-between">
            <div className="d-flex align-items-center justify-content-center">
              {this.props.prevPokemonId > 0 ?
                <React.Fragment>
                  <img className="pb-5 mx-2" alt={`${this.props.prevPokemonName}`} src={
                    this.state.currentPokemonId < 650 ? 

                    `https://img.pokemondb.net/sprites/black-white/anim/normal/${this.props.prevPokemonName}.gif`
                  : ""

                  }/>
                  <Anchor href={`/pokemon/pokemongen/pokemon/${this.props.prevPokemonId}/`}> {this.props.prevPokemonName.charAt(0).toUpperCase() + this.props.prevPokemonName.slice(1)}</Anchor>
                </React.Fragment>
              : null}
            </div>
            {this.props.nextPokemonId !== "" ? 
              <div className="d-flex align-items-center justify-content-center">
              <img className="pb-5 mx-2" alt={`${this.props.nextPokemonName}`} src={`https://img.pokemondb.net/sprites/black-white/anim/normal/${this.props.nextPokemonName}.gif`}/>
              <Anchor href={`/pokemon/pokemongen/pokemon/${this.props.nextPokemonId}/`}> {this.props.nextPokemonName.charAt(0).toUpperCase() + this.props.nextPokemonName.slice(1)}</Anchor>
              </div>
              :
              ""}
           </div>
        </div>
      </div>
    )
  }
}

export default Selector