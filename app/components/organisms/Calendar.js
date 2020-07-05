import React from 'react'
import { View, StyleSheet } from 'react-native'
import moment from 'moment'
import { getDateStr } from '../../utils/index'
import { Calendar } from 'react-native-calendars'
import Day from 'react-native-calendars/src/calendar/day/basic'
import { LocaleConfig } from 'react-native-calendars'
import Colors from '../../constants/Colors'

LocaleConfig.locales['fr'] = {
  monthNames: [
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
  ],
  monthNamesShort: [
    'Janv.',
    'Févr.',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juil.',
    'Août',
    'Sept.',
    'Oct.',
    'Nov.',
    'Déc.'
  ],
  dayNames: [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi'
  ],
  dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
  today: "Aujourd'hui"
}
LocaleConfig.defaultLocale = 'fr'

const CustomDay = ({ today, minDate, maxDate, ...props }) => {
  const { date, marking } = props
  const isWeekEnd =
    moment(date.timestamp).weekday() === 6 ||
    moment(date.timestamp).weekday() === 0 ||
    date.dateString < minDate ||
    date.dateString > maxDate

  marking.disabled = isWeekEnd
  return <Day {...props} />
}

const CalendarElement = ({ today, selected, onChange }) => {
  const minDate = getDateStr(moment().subtract(5, 'weeks'))
  const maxDate = getDateStr(moment().add(5, 'weeks'))

  const onDayPress = (day) => {
    onChange(day.dateString)
  }

  return (
    <View style={styles.container}>
      <Calendar
        dayComponent={(props) => {
          return (
            <CustomDay
              today={today}
              minDate={minDate}
              maxDate={maxDate}
              {...props}
            />
          )
        }}
        firstDay={1}
        disableMonthChange={true}
        markingType={'custom'}
        markedDates={{
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            customStyles: {
              container: {
                borderRadius: 8
              }
            }
          },
          [today]: {
            customStyles: {
              container: {
                borderRadius: 8
              }
            }
          }
        }}
        hideArrows={false}
        onDayPress={onDayPress}
        theme={{
          calendarBackground: Colors.main,
          selectedDayBackgroundColor: 'rgba(255, 255, 255, 0.25)',
          selectedDayTextColor: Colors.white,
          todayTextColor: Colors.white,
          todayBackgroundColor: 'rgba(255, 255, 255, 0.15)',
          dayTextColor: Colors.white,
          textDisabledColor: 'rgba(255, 255, 255, 0.15)',
          selectedDotColor: Colors.white,
          arrowColor: Colors.white,
          disabledArrowColor: '#d9e1e8',
          monthTextColor: Colors.white,
          monthTextFontSize: 16,
          textDayFontWeight: 'bold',
          textDayFontSize: 15,
          textMonthFontSize: 20,
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: 'bold',
          textDayHeaderFontSize: 12
        }}
        disableAllTouchEventsForDisabledDays={true}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.main,
    paddingTop: 34,
    paddingBottom: 44,
    paddingLeft: 14,
    paddingRight: 14
  },
  calendar: {
    flex: 1
  }
})

export default CalendarElement
