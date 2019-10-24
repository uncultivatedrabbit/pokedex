import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css'
import NavBar from './components/layout/NavBar'
import Dashboard from './components/layout/Dashboard'
import PokemonStats from './components/pokemon/PokemonStats'
import PokemonV1 from './components/pokemon/PV1'
import PokemonV2 from './components/pokemon/PV2'
import PokemonV3 from './components/pokemon/PV3'
import PokemonV4 from './components/pokemon/PV4'
import PokemonV5 from './components/pokemon/PV5'
import PokemonV6 from './components/pokemon/PV6'
import PokemonV7 from './components/pokemon/PV7'
import Error from './components/layout/Error'

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar/>
        <div className="container">
        <Switch>
          <Route exact path="/" component={Dashboard}/>
          <Route exact path="/pokemon/pokemongen/pokemon/:pokemonIndex" component={PokemonStats}/>
          <Route exact path="/pokemon/pokemongen/1/" component={PokemonV1}/>
          <Route exact path="/pokemon/pokemongen/2/" component={PokemonV2}/>
          <Route exact path="/pokemon/pokemongen/3/" component={PokemonV3}/>
          <Route exact path="/pokemon/pokemongen/4/" component={PokemonV4}/>
          <Route exact path="/pokemon/pokemongen/5/" component={PokemonV5}/>
          <Route exact path="/pokemon/pokemongen/6/" component={PokemonV6}/>
          <Route exact path="/pokemon/pokemongen/7/" component={PokemonV7}/>
          <Route component={Error}/>
        </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
