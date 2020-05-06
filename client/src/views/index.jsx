import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './Home'
import Employees from './Employees'
import Hotels from './Hotels'
import { Nav } from '../organisms'

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/users'>
          <Employees />
        </Route>
        <Route path='/users/:userId'>
          <Home />
        </Route>
        <Route path='/hotels'>
          <Hotels />
        </Route>
        <Route path='/hotels/:hotelId'>
          <Home />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
