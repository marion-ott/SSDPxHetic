import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Colors from '../../constants/Colors'

const Details = ({ label, value, backgroundColor }) => {
  return (
    <View style={styles.details}>
      <Text style={styles.text} appearance='hint'>
        {label}
      </Text>
      <Text style={styles.subtext}>{value}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  details: {
    backgroundColor: Colors.offWhite,
    paddingVertical: 12,
    paddingLeft: 12,
    paddingRight: 37,
    borderRadius: 6
  },
  text: {
    fontWeight: '600',
    color: "#241F1F",
    opacity: 0.5,
    marginBottom: 4,
  },
  subtext: {
    fontWeight: "500"
  }
})

export default Details
