import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import {connect} from 'react-redux'
import Navbar from './components/navbar/Navbar'
import Home from './components/home/Home'
import Favorites from './components/favorites/Favorites'
import Background from './UI/background/Background'

const App=(props)=> {



  return (
    <Router>
      <div className='App'>
        <Background mode={props.mode}/>
        <Navbar mode={props.mode}/>
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/favorites' exact component={Favorites}/>
        </Switch>
      </div>
    </Router>
  );
}
const mapStateToProps=state=>{
  return{
      mode:state.mode
  }
}


export default connect(mapStateToProps)(App);