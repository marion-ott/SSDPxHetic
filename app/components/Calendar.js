import React, { Fragment, useState } from 'react'
import { View } from 'react-native'
import { Calendar } from '@ui-kitten/components'

export default function CalendarElement() {
  const [date, setDate] = useState(new Date())

  return (
    <View>
      {/* <Text category='h6'>Selected date: {date.toLocaleDateString()}</Text> */}
      <Calendar date={date} onSelect={(nextDate) => setDate(nextDate)} />
    </View>
  )
}
