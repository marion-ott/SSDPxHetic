import React, { useState, useContext } from 'react'
import moment from 'moment'
import appContext from '../context/appContext'
import dateContext from '../context/dateContext'
import CardList from '../components/organisms/CardList'
import Header from '../components/molecules/Header'
import CustomScrollView from '../components/molecules/CustomScrollView'

export default function HomeScreen() {
  const { today } = useContext(dateContext)
  const [visitsCompleted, setVisitsCompleted] = useState(false)

  //TODO: trigger recap display
  const onVisitsCompleted = () => {
    setVisitsCompleted(true)
  }

  return (
    <CustomScrollView
      Component={() => (
        <Header text={moment(today).locale('fr').format('dddd Do MMMM')} />
      )}>
      <CardList
        onComplete={onVisitsCompleted}
        startable={true}
        label={'Visites'}
      />
    </CustomScrollView>
  )
}

HomeScreen.navigationOptions = {
  header: null
}
