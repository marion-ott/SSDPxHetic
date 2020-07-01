import React from 'react'
import { StyleSheet } from 'react-native'
import { Icon } from '@ui-kitten/components'
import Colors from '../../constants/Colors'

const IconUI = ({ name, fill }) => (
  <Icon
    style={styles.icon}
    name={name}
    fill={fill}
  />
)

const styles = StyleSheet.create({
  icon: {
    width: 23,
    height: 23
  }
})

export default IconUI
