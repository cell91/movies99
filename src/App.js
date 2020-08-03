import React from 'react';
import logo from './logo.svg';
import './App.css';

import {Switch, Route, Link} from 'react-router-dom';
import Home from './components/Home'
import AddMovie from './components/AddMovie'
import Movie from './components/Movie'

function App() {


  return (
    <div className="App container">
      <div className='row my-4'>
        <div className='col-md-6 m-auto'>
          <header className='d-flex justify-content-between my-4'>
            <Link className="h4 mr-4" to='/'><i className='fas fa-home'></i>home</Link>
            <Link className="h4 mr-4 " to='/add'><i className='fas fa-search'></i>search</Link>
          </header>

          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/add' component={AddMovie} />
            <Route path='/movie/:imdbid' component={Movie} />
          </Switch>


        </div>
      </div>
    </div>
  );
}


export default App;
