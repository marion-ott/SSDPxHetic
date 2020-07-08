import React, { useEffect, useContext } from 'react'
import notificationContext from '../../context/notificationContext'
import { StyleSheet, View } from 'react-native'
import Icon from '../atoms/Icon'
import Colors from '../../constants/Colors'

const NotificationIcon = ({ name, focused }) => {
  const { notifications } = useContext(notificationContext)

  useEffect(() => {
    //TODO: toggle pastille
  }, [notifications])

  return (
    <View style={styles.wrapper}>
      <Icon focused={focused} name={name} />
      <View style={styles.pastille}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative'
  },
  pastille: {
    position: 'absolute',
    top: 0,
    right: 2,
    backgroundColor: Colors.red,
    width: 9,
    height: 9,
    borderRadius: 10
  }
})

export default NotificationIcon
