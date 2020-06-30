import React, { useContext } from 'react'
import userContext from '../context/userContext'
import { StyleSheet, View } from 'react-native'
import { Text, Layout } from '@ui-kitten/components'
import Details from '../components/molecules/Details'

export default function HomeScreen() {
  const { user } = useContext(userContext)

  var smallCardDatas = {
    hours: {
      label: 'Horaires',
      value: '8h30 - 16h30'
    },
    hostel: {
      label: 'Hotel',
      value: '5'
    },
    room: {
      label: 'Chambres',
      value: '30'
    }
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.currentDay, styles.text]} category='h5'>
        Mardi 12 Février
      </Text>
      <Layout style={styles.layout} level='1'>
        <View style={styles.layoutContain}>
          <View style={styles.headContain}>
            <Text style={[styles.text, styles.labelUser]} category='h5'>
              Bonjour {user.firstName},
            </Text>
            <Text style={styles.text} appearance='hint'>
              {' '}
              Voici le récapitulatif de votre journée.
            </Text>
          </View>
          <View style={styles.cards}>
            {Object.keys(smallCardDatas).map((scard) => {
              var card = smallCardDatas[scard]
              return (
                <Details backgroundColor='#F4F4F4' type='small' {...card} />
              )
            })}
          </View>
          <Text style={styles.text} category='s1'>
            S1
          </Text>
        </View>
      </Layout>
    </View>
  )
}

HomeScreen.navigationOptions = {
  header: null
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3D52D5'
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
    marginTop: 50,
    marginBottom: 20
  },
  layoutContain: {
    flex: 1
  },
  labelUser: {
    fontWeight: 'bold',
    marginBottom: 4
  },
  cards: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})
