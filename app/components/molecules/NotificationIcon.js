import React, { useContext } from 'react'
import notificationContext from '../../context/notificationContext'
import { View, Text } from 'react-native'
import Icon from '../atoms/Icon'

const NotificationIcon = ({ name, focused, amount }) => {
  const { notifications } = useContext(notificationContext)

  return (
    <View>
      <Icon focused={focused} name={name} />
      <Text>{notifications.length}</Text>
    </View>
  )
}

export default NotificationIcon
