import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Navbar from './components/navbar/Navbar'
import Home from './components/home/Home'
import Favorites from './components/favorites/Favorites'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/favorites' exact component={Favorites}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
