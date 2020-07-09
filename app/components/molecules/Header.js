import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from '@ui-kitten/components'
import Colors from '../../constants/Colors'

const Header = ({ text }) => (
  <View style={styles.header}>
    <Text style={[styles.date, styles.text]} >
      {text}
    </Text>
  </View>
)

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: Colors.main,
    zIndex: -1,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0
  },
  date: {
    color: Colors.white,
    textAlign: 'center',
    paddingTop: 60,
    paddingBottom: 20,
    fontWeight: "600",
    fontSize: 22
  }
})

export default Header
