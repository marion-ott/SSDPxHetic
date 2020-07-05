import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Colors from '../../constants/Colors'

const Details = ({ label, value, backgroundColor }) => {
  return (
    <View style={styles.details}>
      <Text style={styles.text} appearance='hint'>
        {label}
      </Text>
      <Text>{value}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  details: {
    flex: 1,
    backgroundColor: Colors.offWhite,
    margin: 2,
    padding: 9,
    borderRadius: 8
  },
  text: {
    fontWeight: '600',
    whiteSpace: 'noWrap'
  }
})

export default Details
