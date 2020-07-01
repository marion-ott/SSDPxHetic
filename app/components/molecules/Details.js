import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const Details = ({ label, value }) => {
  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <Text>{value}</Text>
    </View>
  )
}

const styles = (props) =>
  StyleSheet.create({
    card: {
      flex: 1,
      backgroundColor: '#3D52D5',
      padding: 2
    }
  })

export default Details
