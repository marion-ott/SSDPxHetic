import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from '@ui-kitten/components'
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
      <Text style={styles.labelUser} category='h5'>
        Bonjour {name},
      </Text>
      <Text appearance='hint'>Voici le récapitulatif de votre journée.</Text>
      <View style={styles.details}>
        {details.map((el, index) => (
          <Details key={index} {...el} />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  labelUser: {
    fontWeight: 'bold',
    marginBottom: 4
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  }
})

export default ListHead
