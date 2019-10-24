import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css'
import NavBar from './components/layout/NavBar'
import Dashboard from './components/layout/Dashboard'
import PokemonStats from './components/pokemon/PokemonStats'
import PokemonV1 from './components/pokemon/PokemonV1'
import PokemonV2 from './components/pokemon/PokemonV2'

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
          <Route/>
        </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
