import React, { useState, useContext, useEffect } from 'react'
import userContext from '../context/userContext'
import dateContext from '../context/dateContext'
import moment from 'moment'
import useGetVisits from '../hooks/useGetVisits'
import { StyleSheet, View } from 'react-native'
import { Text, Layout } from '@ui-kitten/components'
import { CardList } from '../components/organisms'
import { Details } from '../components/molecules'
import Colors from '../constants/Colors'

export default function HomeScreen() {
  const { user, teamId, schedule } = useContext(userContext)
  const { today } = useContext(dateContext)
  const [visits, setVisits] = useState([])
  const [details, setDetails] = useState([])

  const { loading, error, data } = useGetVisits(teamId, today)

  useEffect(() => {
    if (data) {
      const { myVisits } = data

      let sum = 0
      myVisits.forEach(({ hotel }) => (sum += hotel.rooms))

      setVisits(myVisits)
      setDetails([
        {
          label: 'Horaires',
          value: `${schedule.startTime}-${schedule.endTime}`
        },
        {
          label: 'Hôtels',
          value: data.myVisits.length
        },
        {
          label: 'Chambres',
          value: sum
        }
      ])
    }
  }, [data])

  if (loading) {
    return <Text>loading</Text>
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.currentDay, styles.text]} category='h5'>
        {moment(today).locale('fr').format('dddd Do MMMM')}
      </Text>
      <Layout style={styles.layout} level='1'>
        <View style={styles.layoutContain}>
          <View style={styles.headContain}>
            <Text style={[styles.text, styles.labelUser]} category='h5'>
              Bonjour {user.firstName},
            </Text>
            <Text style={styles.text} appearance='hint'>
              Voici le récapitulatif de votre journée.
            </Text>
          </View>
          <View style={styles.details}>
            {details.map((el, index) => (
              <Details key={index} {...el} />
            ))}
          </View>
          {visits && (
            <CardList
              hasCta={true}
              label={'Visites prioritaires'}
              cards={visits}
            />
          )}
        </View>
      </Layout>
    </View>
  )
}

HomeScreen.navigationOptions = {
  header: null
}

const styles = StyleSheet.create({
  middleContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: Colors.main
  },
  currentDay: {
    color: '#FFFF',
    textAlign: 'center',
    paddingTop: 40,
    paddingBottom: 20
  },
  layout: {
    flex: 1,
    flexDirection: 'column',
    flexDirection: 'row',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingLeft: 15,
    paddingRight: 15
  },
  headContain: {
    marginTop: 40,
    marginBottom: 20
  },
  layoutContain: {
    flex: 1
  },
  labelUser: {
    fontWeight: 'bold',
    marginBottom: 4
  },
  subtitle: {
    marginBottom: 7,
    marginTop: 20
  },
  cardsContain: {
    flex: 1,
    marginTop: 10
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
