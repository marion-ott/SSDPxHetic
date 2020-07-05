import React, { useContext } from 'react'
import userContext from '../context/userContext'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Text, Layout, Divider } from '@ui-kitten/components'
import Details from '../components/molecules/Details'
import Card from '../components/molecules/Card'

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
              Voici le récapitulatif de votre journée.
            </Text>
          </View>
          <View style={styles.cards}>
            {Object.keys(smallCardDatas).map((scard, index) => {
              var card = smallCardDatas[scard]
              return (
                <Details
                  key={index}
                  backgroundColor='#F4F4F4'
                  {...card}
                />
              )
            })}
          </View>
          <View style={styles.middleContainer}>
            <Text style={[styles.text, styles.subtitle]} category='s1'>
              Visites prioritaires
            </Text>
            <Divider style={[{ marginBottom: 10 }]} />
            <ScrollView style={styles.cardsContain}>
              {[null, null].map((c, i) => {
                return <Card index={i} key={i} backgroundColor="#FFF2EB" />
              })}
              <View>
                <Text style={[styles.text, styles.subtitle]}>Visite standare</Text>
                <Divider style={[{ marginBottom: 20 }]} />
              </View>
              {[null, null, null, null, null, null].map((c, i) => {
                return <Card key={i} backgroundColor="#FFF2EB" />
              })}
            </ScrollView>
          </View>
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
    paddingBottom: 20,
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: '#3D52D5',
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
  subtitle: {
    marginBottom: 7,
    marginTop: 20
  },
  cardsContain: {
    flex: 1,
    marginTop: 10,
    // backgroundColor: 'blue',
    // paddingBottom: 200
  },
  cards: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})
