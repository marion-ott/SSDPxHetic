import React, { useState, useEffect, useContext } from 'react'
import moment from 'moment'
import { Button } from '@ui-kitten/components'
import { Text } from 'react-native'
import userContext from '../context/userContext'
import dateContext from '../context/dateContext'
import useGetVisits from '../hooks/useGetVisits'
import { StyleSheet, View } from 'react-native'
import { getDateStr, formatDate } from '../utils/index'
import CalendarElement from '../components/organisms/Calendar'
import CardList from '../components/organisms/CardList'

export default function CalendarScreen() {
  const { teamId } = useContext(userContext)
  const { today } = useContext(dateContext)
  const [selected, setSelected] = useState(today)
  const { loading, error, data } = useGetVisits(teamId, formatDate(selected), [
    selected
  ])
  const [visits, setVisits] = useState(null)

  useEffect(() => {
    if (data) {
      setVisits(data.myVisits)
    }
  }, [data])

  return (
    <View style={styles.container}>
      <CalendarElement
        today={getDateStr(moment(today))}
        selected={selected}
        onChange={(day) => setSelected(day)}
      />
      {loading ? <Text>loading</Text> : visits && <CardList cards={visits} />}
    </View>
  )
}

CalendarScreen.navigationOptions = {
  header: null
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aaa'
  }
})
