import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Colors from '../../constants/Colors'

const Details = ({ label, value, margin }) => {
  return (
    <View style={[styles.details, { marginRight: margin }]}>
      <Text style={styles.text} appearance='hint'>
        {label}
      </Text>
      <Text style={styles.subtext}>{value}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  details: {
    flexGrow: 1,
    backgroundColor: Colors.offWhite,
    paddingVertical: 12,
    // paddingHorizontal: 12,
    paddingLeft: 12,
    paddingRight: 17,
    // marginRight: 10,
    borderRadius: 6
  },
  text: {
    fontWeight: '600',
    color: '#241F1F',
    opacity: 0.5,
    marginBottom: 4
  },
  subtext: {
    fontWeight: '500',
    fontSize: 14
  }
})

export default Details
