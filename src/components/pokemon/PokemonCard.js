import React, { Component } from 'react'
import spinner from '../images/5.gif'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

const Sprite = styled.img`
  width: 5em;
  height: 5em;
  display: none;
`;

const Card = styled.div`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0,0,0,0.35), 0 10px 10px rgba(0,0,0,0.22);
  }
  -moz-user-select: none;
  -website-user-select: none;
  user-select: none;
  -o-user-select: none;
`

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`


export default class PokemonCard extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      imageUrl: '',
      pokemonIndex: '',
      imageLoading: true,
      tooManyRequests: false,

    }
  }

  componentDidMount() {
    const { name, url } = this.props
    const pokemonIndex = url.split("/")[url.split('/').length -2]
    const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`
    this.setState({
      name,
      imageUrl,
      pokemonIndex
     })
  }
  render() {
    return (
      <div className="col-md-3 col-sm-6 mb-5">
        <StyledLink to={`pokemon/${this.state.pokemonIndex}`}>
          <Card className="card">
              <h5 className="card-header">
                {this.state.pokemonIndex}
              </h5>
              {this.state.imageLoading ? (
                <img src={spinner} 
                className="card-img-top rounded d-block mx-auto mt-2" 
                style={{width: "3em", height: "3em"}} 
                alt="spinner"/>
                ) : null}
              <Sprite 
                className="card-img-top rounded mx-auto mt-2"
                src={this.state.imageUrl}
                onLoad={() => this.setState({imageLoading: false})}
                onError={() => this.setState({tooManyRequests: true})}
                style={
                  this.state.tooManyRequests ? {display :"none"} : 
                  this.state.imageLoading ? null : {display: "block"}
                }/>
              {this.state.tooManyRequests ? 
                (<h6 className="mx-auto">
                  <span className="badge badge-danger mt-2">
                  Too Many Requests
                  </span>
                  </h6>
                ) : null}
              <div className="card-body m-auto">
                <h6 className="card-title">
                {this.state.name.charAt(0).toUpperCase() + this.state.name.substring(1)}
                </h6>
              </div>
          </Card>
        </StyledLink>
      </div>
    )
  }
}
