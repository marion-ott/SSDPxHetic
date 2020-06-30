import React, { useState } from 'react'
import moment from 'moment'
import { StyleSheet, View } from 'react-native'
import { getDateStr } from '../utils/index'
import CalendarElement from '../components/molecules/Calendar'

export default function CalendarScreen() {
  const today = getDateStr(moment())
  const [selected, setSelected] = useState(today)

  return (
    <View style={styles.container}>
      <CalendarElement
        today={today}
        selected={selected}
        setSelected={setSelected}
      />
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
