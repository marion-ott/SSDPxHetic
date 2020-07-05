import React from 'react'
import { StyleSheet } from 'react-native'
import { Icon } from '@ui-kitten/components'

const IconUI = ({ name, fill, width, height }) => (
  <Icon style={styles.icon} name={name} fill={fill} />
)

const styles = StyleSheet.create({
  icon: {
    width: 23,
    height: 23
  }
})

export default IconUI
