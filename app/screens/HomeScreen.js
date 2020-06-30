import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Layout, Divider } from '@ui-kitten/components'
import Card from '../components/molecules/Card'
import { ScrollView } from 'react-native-gesture-handler'

export default function HomeScreen() {
  var smallCardDatas = {
    hours: {
      label: 'Horaires',
      sublabel: '8h30 - 16h30'
    },
    hostel: {
      label: 'Hotel',
      sublabel: '5'
    },
    room: {
      label: 'Chambres',
      sublabel: '30'
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
              Bonjour Vincent,
            </Text>
            <Text style={styles.text} appearance='hint'>
              Voici le récapitulatif de votre journée.
            </Text>
          </View>
          <View style={styles.cards}>
            {Object.keys(smallCardDatas).map((scard) => {
              var card = smallCardDatas[scard]
              return (
                <Card
                  key={scard}
                  backgroundColor='#F4F4F4'
                  type='small'
                  label={card.label}
                  sublabel={card.sublabel}
                />
              )
            })}
          </View>
          <View>
            <Text style={[styles.text, styles.subtitle]} category='s1'>
              Visites prioritaires
            </Text>
            <Divider style={[{ marginBottom: 20 }]} />
            <View styles={styles.cardsContain}>
              <ScrollView >
                {[null, null].map((c, i) => {
                  return <Card key={i} backgroundColor="#FFF2EB" />
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
  subtitle: {
    marginBottom: 7,
    marginTop: 20
  },
  cardsContain: {
    marginTop: 7
  },
  cards: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})
