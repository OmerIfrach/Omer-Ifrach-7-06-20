import React from 'react';
import { Switch, Route, HashRouter } from "react-router-dom";
import './App.css';
import { connect } from 'react-redux'
import Navbar from './components/navbar/Navbar'
import Home from './components/home/Home'
import Favorites from './components/favorites/Favorites'
import Background from './UI/background/Background'

const App = (props) => {
  return (
    <HashRouter basename="/Omer-Ifrach-7-06-20">
      <div className='App'>
        <Background mode={props.mode} />
        <Navbar mode={props.mode} />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/favorites' component={Favorites} />
        </Switch>
      </div>
    </HashRouter>
  );
}
const mapStateToProps = state => {
  return {
    mode: state.mode
  }
}


export default connect(mapStateToProps)(App);