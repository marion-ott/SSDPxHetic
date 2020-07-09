import React, { useState, useEffect, useContext } from 'react'
import moment from 'moment'
import { Button } from '@ui-kitten/components'
import { Text, ActivityIndicator } from 'react-native'
import appContext from '../context/appContext'
import dateContext from '../context/dateContext'
import useGetVisits from '../hooks/useGetVisits'
import { StyleSheet, View } from 'react-native'
import { getDateStr, formatDate } from '../utils/index'
import CalendarElement from '../components/organisms/Calendar'
import CardList from '../components/organisms/CardList'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import CustomScrollView from '../components/molecules/CustomScrollView'

export default function CalendarScreen() {
  const { today } = useContext(dateContext)
  const [selected, setSelected] = useState(today)

  return (
    <CustomScrollView
      top={320}
      Component={() => (
        <CalendarElement
          today={getDateStr(moment(today))}
          selected={selected}
          onChange={(day) => setSelected(day)}
        />
      )}>
      <CardList selected={selected} />
    </CustomScrollView>
  )
}

CalendarScreen.navigationOptions = {
  header: null
}
