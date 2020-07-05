import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Icon from './CommonIcon'


const Notif = ({ ico, color, type, fresh, data }) => {

  console.log(data)
  return (
    <View style={styles.container}>

      <Icon fill={color} name={ico} />

      <View style={styles.content}>
        
        <View style={styles.contentCtn}>
          <Text style={styles.type}>{type}</Text>
          <Text style={styles.new}>{fresh ? 'Nouveau' : '' }</Text>
        </View>

        <Text style={styles.details}>
          {`Le créneau de l'hôtel ${data.hotel} du ${data.initialDate} a été replannifié au ${data.newDate}.`}
        </Text>

      </View>

    </View>
  )
}

const styles =
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: '#F4F4F4',
      borderRadius: 8,
      padding: 16,
      marginBottom: 14,
    },
    content: {
      marginLeft: 16,
    },
    contentCtn: {
      flexDirection: 'row',
    },
    type: {
      marginBottom: 6,
      fontWeight: 'bold',
      color: '#241F1F',
      fontSize: 16,
      lineHeight: 19,
    },
    new: {
      color: '#5E3FDA',
      marginLeft: 6,
      opacity: 0.7,
    },
    details: {
      fontSize: 14,
      lineHeight: 16,
      color: '#241F1F',
      width: 225,
      flexShrink: 1,
      opacity: 0.7,
    }
  })

export default Notif
