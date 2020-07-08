import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Details from '../atoms/Details'

const ListHead = ({ startTime, endTime, hotels, rooms, name }) => {
  const details = [
    {
      label: 'Horaires',
      value: `${startTime}-${endTime}`
    },
    {
      label: 'Hôtels',
      value: hotels
    },
    {
      label: 'Chambres',
      value: rooms
    }
  ]

  return (
    <View>
      <View style={styles.headWrapper}>
        <Text style={[styles.text, styles.labelUser]} category='h5'>
          Bonjour {name},
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
    </View>
  )
}

const styles = StyleSheet.create({
  headWrapper: {
    marginTop: 40,
    marginBottom: 20
  },
  labelUser: {
    fontWeight: 'bold',
    marginBottom: 4
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export default ListHead
