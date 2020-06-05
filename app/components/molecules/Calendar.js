import React, { Fragment, useState } from 'react'
import { View } from 'react-native'
import { Calendar, NativeDateService } from '@ui-kitten/components'

const i18n = {
  dayNames: {
    short: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    long: [
      'Lundi',
      'Mardi',
      'Mercredi',
      'Jeudi',
      'Vendredi',
      'Samedi',
      'Dimanche'
    ]
  },
  monthNames: {
    short: [
      'Jan',
      'Fév',
      'Mar',
      'Avr',
      'Mai',
      'Juin',
      'Juil',
      'Août',
      'Sep',
      'Oct',
      'Nov',
      'Déc'
    ],
    long: [
      'Janvier',
      'Février',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Août',
      'Septembre',
      'Octobre',
      'Novembre',
      'Décembre'
    ]
  }
}

const localeDateService = new NativeDateService('fr', {
  i18n,
  startDayOfWeek: 0
})

export default function CalendarElement() {
  const [date, setDate] = useState(new Date())

  return (
    <View>
      {/* <Text category='h6'>Selected date: {date.toLocaleDateString()}</Text> */}
      <Calendar
        dateService={localeDateService}
        date={date}
        onSelect={(nextDate) => setDate(nextDate)}
      />
    </View>
  )
}
