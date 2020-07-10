import React, { useState, useEffect } from 'react'
import {
  Redirect,
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { useSubscription } from '@apollo/react-hooks'
import { SUBSCRIBE_VISITS } from '../graphql/subscriptions/visits'
import { AppProvider } from '../context/appContext'
import { DateProvider } from '../context/dateContext'
import { NotificationProvider } from '../context/notificationContext'
import { SectorProvider } from '../context/sectorContext'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import { GET_SECTORS } from './../graphql/queries/sectors'
import { GET_USER } from './../graphql/queries/users'
import { CHECK_AUTH } from './../graphql/queries/auth'
import { formatDate } from './../utils/index'
import moment from 'moment/min/moment-with-locales'
import Login from './Login'
import Home from './Home'
import Employees from './Employees'
import Hotels from './Hotels'
import Details from './Details'
import { Nav } from '../organisms'
import { Loader } from '../atoms'

function App() {
  const [notifications, setNotifications] = useState([])
  const { data: res } = useSubscription(SUBSCRIBE_VISITS)

  const { loading: authLoading, error: authError, data: auth } = useQuery(
    CHECK_AUTH
  )
  const { loading: sectorsLoad, error: sectorsErr, data: sectors } = useQuery(
    GET_SECTORS
  )

  const [getData, { loading, error }] = useLazyQuery(GET_USER, {
    onCompleted: ({ user }) => {
      handleLogin(user)
    },
    onError: (error) => console.warn(error)
  })

  const [date] = useState({
    today: formatDate(moment())
  })

  const [context, setContext] = useState({
    user: null
  })

  const updateContext = (obj) => {
    let state = context
    state = Object.assign({ ...state, ...obj })
    setContext(state)
  }

  useEffect(() => {
    if (res) {
      if (res.visit.mutation === 'DELETED') {
        const state = notifications
        state.push(res)
        setNotifications([...state])
      }
    }
  }, [res])

  useEffect(() => {
    if (auth && auth.checkAuth.success) {
      getData({
        variables: {
          id: auth.checkAuth.id
        }
      })
    }
  }, [authError, auth, authLoading])

  const handleLogin = (userData) => {
    const user = {
      id: userData.id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone
    }

    let schedule, teamId
    userData.teams.forEach(({ id, startDate, endDate, users }) => {
      if (moment().isBetween(startDate, endDate)) {
        teamId = id
        user.mates = users.filter((user) => user.id !== userData.id)
      }
    })

    userData.sector.schedules.forEach(({ startDate, endDate, shift }) => {
      if (moment().isBetween(startDate, endDate)) {
        schedule = shift
      }
    })

    updateContext({
      user,
      teamId,
      schedule
    })
  }

  if (loading || sectorsLoad) {
    return <Loader />
  }

  if (
    (error && !error.message.includes('Authentication required')) ||
    sectorsErr
  ) {
    return <p>error</p>
  }

  return (
    <AppProvider value={{ context, setContext }}>
      <NotificationProvider value={{ notifications, setNotifications }}>
        <DateProvider value={date}>
          <SectorProvider value={sectors}>
            <Router>
              {context.user && <Nav />}
              <Switch>
                <Route
                  exact
                  path='/login'
                  render={() =>
                    !context.user ? (
                      <Login handleLogin={handleLogin} />
                    ) : (
                      <Redirect to='/' />
                    )
                  }
                />
                <Route
                  exact
                  path='/'
                  render={() =>
                    context.user ? <Home /> : <Redirect to='/login' />
                  }
                />
                <Route
                  exact
                  path='/users'
                  render={() =>
                    context.user ? <Employees /> : <Redirect to='/login' />
                  }
                />
                <Route path='/users/:id' render={Details} />
                <Route
                  exact
                  path='/hotels'
                  render={() =>
                    context.user ? <Hotels /> : <Redirect to='/login' />
                  }
                />
                <Route
                  path='/hotels/:id'
                  render={() =>
                    context.user ? <Details /> : <Redirect to='/login' />
                  }
                />
                <Route
                  path='*'
                  render={() =>
                    context.user ? <Home /> : <Redirect to='/login' />
                  }
                />
              </Switch>
            </Router>
          </SectorProvider>
        </DateProvider>
      </NotificationProvider>
    </AppProvider>
  )
}

export default App
