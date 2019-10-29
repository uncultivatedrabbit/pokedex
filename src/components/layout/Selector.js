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
      prevPokemonSprite: '',
      nextPokemonSprite: ''
    }
  }

  async componentDidMount() {
    
    const {prevPokemonId, nextPokemonId, currentPokemonId} = this.props
    const prevPokemonUrl = `https://pokeapi.co/api/v2/pokemon/${prevPokemonId}/`
    
    const nextPokemonUrl = `https://pokeapi.co/api/v2/pokemon/${nextPokemonId}/`
    
    

    const prevPokemonRes = await fetch(prevPokemonUrl)
      .then(res => res.json())

    const nextPokemonRes = await fetch(nextPokemonUrl)
      .then(res => res.json())


    const prevPokemonSprite = prevPokemonRes.sprites.front_default
    const nextPokemonSprite = nextPokemonRes.sprites.front_default

    this.setState({
      prevPokemonSprite,
      prevPokemonId,
      nextPokemonId,
      currentPokemonId,
      nextPokemonSprite
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
                  <img className="pb-5 mx-2" 
                      alt={`${this.props.prevPokemonName}`} 
                      src={
                        this.state.currentPokemonId > 650 ? 
                        this.state.prevPokemonSprite
                      :
                      `https://img.pokemondb.net/sprites/black-white/anim/normal/${this.props.prevPokemonName}.gif`
                    }
                    />
                    
                  <Anchor 
                    href={`/pokemon/pokemongen/pokemon/${this.props.prevPokemonId}/`}> 
                    {this.props.prevPokemonName.charAt(0).toUpperCase() + this.props.prevPokemonName.slice(1)}
                  </Anchor>
                </React.Fragment>
              : null}
            </div>

            {this.props.nextPokemonId !== "" ? 
              <div className="d-flex align-items-center justify-content-center">
              <img className="pb-5 mx-2" 
                  alt={`${this.props.nextPokemonName}`} 
                  src={
                    this.state.nextPokemonId >= 650 && this.state.nextPokemonId <= 802 ? 
                    this.state.nextPokemonSprite
                    :
                    `https://img.pokemondb.net/sprites/black-white/anim/normal/${this.props.nextPokemonName}.gif`
                    }
                    style={Number(this.state.nextPokemonId) === 803 ? {display: "none"} : {display: "flex"}}/>
              <Anchor 
                href={`/pokemon/pokemongen/pokemon/${this.props.nextPokemonId}/`}
                style={Number(this.state.nextPokemonId) === 803 ? {display: "none"} : {display: "flex"}}>
                {this.props.nextPokemonName.charAt(0).toUpperCase() + this.props.nextPokemonName.slice(1)}
              </Anchor>
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