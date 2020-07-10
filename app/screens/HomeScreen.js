import React, { useState, useContext } from 'react'
import moment from 'moment/min/moment-with-locales'
import appContext from '../context/appContext'
import dateContext from '../context/dateContext'
import RecapScreen from '../screens/RecapScreen'
import CardList from '../components/organisms/CardList'
import Header from '../components/molecules/Header'
import CustomScrollView from '../components/molecules/CustomScrollView'

export default function HomeScreen() {
  const { today } = useContext(dateContext)
  const [visitsCompleted, setVisitsCompleted] = useState(false)

  const onVisitsCompleted = () => {
    setVisitsCompleted(true)
  }

  return visitsCompleted ? (
    <RecapScreen onPress={setVisitsCompleted(false)} />
  ) : (
    <CustomScrollView
      Component={() => (
        <Header text={moment(today).locale('fr').format('dddd Do MMMM')} />
      )}>
      <CardList
        onComplete={onVisitsCompleted}
        startable={true}
        label={'Visites'}
        selected={today}
      />
    </CustomScrollView>
  )
}

HomeScreen.navigationOptions = {
  header: null
}
