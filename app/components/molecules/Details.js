import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const Details = ({ label, value, backgroundColor }) => {
  return (
    <View style={styles.smallCard}>
      <Text style={styles.text} appearance='hint'>{label}</Text>
      <Text>{value}</Text>
    </View>
  )
}

const styles = StyleSheet.create({

  smallCard: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    margin: 2,
    padding: 9,
    borderRadius: 8
  },
})

export default Details
