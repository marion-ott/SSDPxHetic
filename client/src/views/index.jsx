import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import Employees from './Employees'
import Hotels from './Hotels'
import Details from './Details'
import { Nav } from '../organisms'

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/users'>
          <Employees />
        </Route>
        <Route path='/users/:id'>
          <Details />
        </Route>
        <Route exact path='/hotels'>
          <Hotels />
        </Route>
        <Route path='/hotels/:id'>
          <Details />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
