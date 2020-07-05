import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Text, Divider } from '@ui-kitten/components'
import Colors from '../../constants/Colors'
import HotelCard from '../molecules/HotelCard'

const CardList = ({ label, cards }) => {
  return (
    <View style={styles.middleContainer}>
      {label && (
        <Text style={[styles.text, styles.subtitle]} category='s1'>
          {label}
        </Text>
      )}
      <Divider style={[{ marginBottom: 10 }]} />
      <ScrollView style={styles.cardsContain}>
        {cards.map(({ id, hotel }) => (
          <HotelCard key={id} {...hotel} backgroundColor='#FFF2EB' />
        ))}
        {/* 
          //TODO: Chunk results in 2 array (prio & standard)
          <View>
            <Text style={[styles.text, styles.subtitle]}>
              Visite standare
            </Text>
            <Divider style={[{ marginBottom: 20 }]} />
          </View>
          {[null, null, null, null, null, null].map((c, i) => {
            return <Card key={i} backgroundColor='#FFF2EB' />
          })} */}
      </ScrollView>
    </View>
  )
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

export default CardList
