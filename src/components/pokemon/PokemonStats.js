import React, { Component } from 'react'


const TYPE_COLORS = {
  normal: 'A8A77A',
  fire:  'EE8130',
  water:  '6390F0',
  electric:  'F7D02C',
  grass:  '7AC74C',
  ice:  '96D9D6',
  fighting:  'C22E28',
  poison:  'A33EA1',
  ground:  'E2BF65',
  flying:  'A98FF3',
  psychic:  'F95587',
  bug:  'A6B91A',
  rock:  'B6A136',
  ghost:  '735797',
  dragon:  '6F35FC',
  dark:  '705746',
  steel: 'B7B7CE',
  fairy:  'D685AD',
  
}

export default class PokemonStats extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      pokemonIndex: '',
      imageUrl: '',
      types: [],
      description: '',
      stats: {
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        specialAttack: '',
        specialDefense: ''
      },
      height: '',
      weight: '',
      eggGroups: '',
      abilities: '',
      genderRatioMale: '',
      genderRatioFemale: '',
      evs: '',
      hatchSteps: '',

    }
  }

  async componentDidMount () {
    const {pokemonIndex} = this.props.match.params
    
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`
    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`

    const pokemonRes = await fetch(pokemonUrl)
      .then(res => res.json())
      .then(data => data)

      // console.log(pokemonRes)

    const name = Object.values(pokemonRes.name).join("")
    const imageUrl = Object.values(pokemonRes.sprites)[4]
    
    let {hp, attack, defense, speed, specialAttack, specialDefense} = ''

    Object.values(pokemonRes.stats).map(stat => {
      switch(stat.stat.name) {
        case 'hp':
          hp = stat['base_stat']
          break
        case 'attack':
          attack = stat['base_stat']
          break
        case 'defense':
          defense = stat['base_stat']
          break
        case 'speed':
          speed = stat['base_stat']
          break
        case 'special-attack':
          specialAttack = stat['base_stat']
          break
        case 'special-defense':
          specialDefense = stat['base_stat']
          break
      }
    })

    // convert height to feet and weight to pounds
    const height = Math.round(((pokemonRes.height) * 0.328084 + 0.0001 ) * 100 ) / 100

    const weight = Math.round(((pokemonRes.weight) * 0.220462 + 0.0001) * 100) / 100

    const types = pokemonRes.types.map(type=> type.type.name)
    
    const abilities = pokemonRes.abilities.map(ability => {
      return ability.ability.name
        .toLowerCase()
        .split('-')
        .map(s=> s.charAt(0).toUpperCase() + s.slice(1))
        .join(' ')
    }).join(", ")

    const evs = pokemonRes.stats.filter(stat => {
      if (stat.effort > 0) {
        return true
      } 
      return false
    }).map(stat => {
      const statName = stat.stat.name
        .toLowerCase()
        .split('-')
        .map(s => s.charAt(0).toUpperCase() + s.slice(1))
        .join(' ')
      return `${stat.effort} ${statName}`
    })
      .join(', ')



    await fetch(pokemonSpeciesUrl)
      .then(res => res.json())
      .then(data => {
        let description = ''
        data.flavor_text_entries.some(flavor => {
          if (flavor.language.name === 'en') {
            description = flavor.flavor_text
            return
          }
        })

        let femaleRate
        let genderRatioFemale
        let genderRatioMale
        // const femaleRate = data.gender_rate
        if (data.gender_rate > 0) {
         femaleRate = data.gender_rate
         genderRatioFemale = 12.5 * femaleRate
         genderRatioMale = 12.5 * (8 - femaleRate)
        } else {
          femaleRate = "genderless"
          genderRatioFemale = null
          genderRatioMale = null
        }

        const catchRate = Math.round((100/255) * data['capture_rate'])

        const eggGroups = data.egg_groups.map(group => {
          return group.name
            .toLowerCase()
            .split(' ')
            .map(s => s.charAt(0).toUpperCase() + s.slice(1))
            .join(' ')
        }).join(", ")

        const hatchSteps = 255 * (data["hatch_counter"] + 1)

        this.setState({
          description,
          genderRatioFemale,
          genderRatioMale,
          catchRate,
          eggGroups,
          hatchSteps
        })
      })
      this.setState({
        imageUrl,
        pokemonIndex,
        name,
        types,
        stats: {
          hp,
          attack,
          defense,
          speed,
          specialAttack,
          specialDefense
        },
        height,
        weight,
        abilities,
        evs
      })
  }


  render() {
    return (
      <div className="col">
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-5">
                <h5>{this.state.pokemonIndex}</h5>
              </div>
              <div className="col-7">
                <div className="float-right">
                  {this.state.types.map(type => (
                    <span 
                      key={type} 
                      className="badge badge-pill mr-1"
                      style={{backgroundColor: `#${TYPE_COLORS[type]}`, color: 'white'}}
                    >
                    {type
                      .toLowerCase()
                      .split(' ')
                      .map(s => s.charAt(0).toUpperCase() + s.slice(1))
                      .join(' ')
                    }
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-md-3">
                <img src={this.state.imageUrl}
                  className="card-img-top rounded mx-auto mt-2"/>
              </div>
              <div className="col-md-9">
                <h4 className="mx-auto">
                  {this.state.name
                    .toLowerCase()
                    .split(' ')
                    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
                    .join(' ')}
                </h4>
                <div className="row mb-n2 align-items-center">
                  <div className="col-12 col-md-3">
                      <p>HP</p>
                  </div>
                  <div className="col-12 col-md-9">
                    <div className="progress">
                      <div 
                        className="progress-bar bg-success" 
                        role="progressBar" 
                        style={{
                          width: `${this.state.stats.hp}%`
                          }} 
                        ariavalue="0" 
                        aria-valuemin="0" 
                        aria-valuemax="150">
                        <small>{this.state.stats.hp}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mb-n2 align-items-center">
                  <div className="col-12 col-md-3">
                      <p>Attack</p>
                  </div>
                  <div className="col-12 col-md-9">
                    <div className="progress">
                      <div 
                        className="progress-bar bg-success" 
                        role="progressBar" 
                        style={{
                          width: `${this.state.stats.attack}%`
                          }} 
                        ariavalue="0" 
                        aria-valuemin="0" 
                        aria-valuemax="150">
                        <small>{this.state.stats.attack}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mb-n2 align-items-center">
                  <div className="col-12 col-md-3">
                      <p>Defense</p>
                  </div>
                  <div className="col-12 col-md-9">
                    <div className="progress">
                      <div 
                        className="progress-bar bg-success" 
                        role="progressBar" 
                        style={{
                          width: `${this.state.stats.defense}%`
                          }} 
                        ariavalue="0" 
                        aria-valuemin="0" 
                        aria-valuemax="150">
                        <small>{this.state.stats.defense}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mb-0 align-items-center">
                  <div className="col-12 col-md-3">
                      <p>Speed</p>
                  </div>
                  <div className="col-12 col-md-9">
                    <div className="progress">
                      <div 
                        className="progress-bar bg-success" 
                        role="progressBar" 
                        style={{
                          width: `${this.state.stats.speed}%`
                          }} 
                        ariavalue="0" 
                        aria-valuemin="0" 
                        aria-valuemax="150">
                        <small>{this.state.stats.speed}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row  mb-n2 align-items-center">
                  <div className="col-12 col-md-3">
                      <p>Special Attack</p>
                  </div>
                  <div className="col-12 col-md-9">
                    <div className="progress">
                      <div 
                        className="progress-bar bg-success" 
                        role="progressBar" 
                        style={{
                          width: `${this.state.stats.specialAttack}%`
                          }} 
                        ariavalue="0" 
                        aria-valuemin="0" 
                        aria-valuemax="150">
                        <small>{this.state.stats.specialAttack}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mb-n2 align-items-center">
                  <div className="col-12 col-md-3">
                      <p>Special Defense</p>
                  </div>
                  <div className="col-12 col-md-9">
                    <div className="progress">
                      <div 
                        className="progress-bar bg-success" 
                        role="progressBar" 
                        style={{
                          width: `${this.state.stats.specialDefense}%`
                          }} 
                        ariavalue="0" 
                        aria-valuemin="0" 
                        aria-valuemax="150">
                        <small>{this.state.stats.specialDefense}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-1">
                  <div className="col">
                    <p className="p-2">{this.state.description}</p>
                  </div>
              </div>
            </div>
          </div>
          <hr/>
        <div className="card-body">
          <h5 className="card-title text-center">
            Profile
          </h5>
          <div className="row">
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-6">
                    <h6 className="float-right">
                    Height:
                    </h6>
                </div>
                <div className="col-md-6">
                    <h6 className="float-left">
                    {this.state.height} ft.
                    </h6>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                    <h6 className="float-right">
                    Weight:
                    </h6>
                </div>
                <div className="col-md-6">
                    <h6 className="float-left">
                    {this.state.weight} lbs.
                    </h6>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                    <h6 className="float-right">
                    Catch Rate:
                    </h6>
                </div>
                <div className="col-md-6">
                    <h6 className="float-left">
                    {this.state.catchRate} %
                    </h6>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                    <h6 className="float-right">
                    Gender Ratio:
                    </h6>
                </div>
                <div className="col-6">
                    




                      {this.state.genderRatioFemale === null ? <p style={{fontWeight: "500"}}>Genderless</p> : (
                        <div>
                        <div className="progress">
                          <div className="progress-bar" role="progressbar" style={{
                            width: `${this.state.genderRatioFemale}%`,
                            backgroundColor: '#C2185B',
                            color: "white"
                          }}
                          aria-valuenow="20"
                          aria-valuemin="0"
                          aria-valuemax="100">
                              <small>{this.state.genderRatioFemale}</small>
                          </div>
                          <div className="progress-bar" role="progressbar" style={{
                            width: `${this.state.genderRatioMale}%`,
                            backgroundColor: '#1976D2',
                            color: "white"
                          }}
                          aria-valuenow="30"
                          aria-valuemin="0"
                          aria-valuemax="100">
                              <small>{this.state.genderRatioMale}</small>
                          </div>
                        </div>
                      </div>
                          
                      )}
                      





                </div>
              </div>
            </div>
            <div className="col-md-6">
                <div className="row">
                  <div className="col-6">
                    <h6 className="float-right">Egg Groups:</h6>
                  </div>
            <div className="col-6">
                <h6 className="float-left">{this.state.eggGroups} </h6>
            </div>
            <div className="col-6">
              <h6 className="float-right">Hatch Steps:</h6>
            </div>
            <div className="col-6">
              <h6 className="float-left">{this.state.hatchSteps}</h6>
            </div>
            <div className="col-6">
              <h6 className="float-right">Abilities:</h6>
            </div>
            <div className="col-6">
              <h6 className="float-left">{this.state.abilities}</h6>
            </div>
            <div className="col-6">
              <h6 className="float-right">EVs:</h6>
            </div>
            <div className="col-6">
              <h6 className="float-left">{this.state.evs}</h6>
            </div>
          </div>
        </div> 
      </div>
    </div>
  </div>
</div>
    )
  }
}
