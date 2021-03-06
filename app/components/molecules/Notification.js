import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Icon from '../atoms/Icon'

const Notification = ({ visit }) => (
  <View style={styles.container}>
    <Icon fill={'#C4DD2A'} name='flip-2-outline' />

    <View style={styles.content}>
      <View style={styles.contentCtn}>
        <Text style={styles.type}>Replanification</Text>
        <Text style={styles.new}>Nouveau</Text>
      </View>

      <Text style={styles.details}>
        {`La visite de l'hôtel ${visit.data.hotel.name} a été modifiée.`}
      </Text>
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F4F4F4',
    borderRadius: 8,
    padding: 16,
    marginBottom: 14
  },
  content: {
    marginLeft: 16
  },
  contentCtn: {
    flexDirection: 'row'
  },
  type: {
    marginBottom: 6,
    fontWeight: 'bold',
    color: '#241F1F',
    fontSize: 16,
    lineHeight: 19
  },
  new: {
    color: '#5E3FDA',
    marginLeft: 6,
    opacity: 0.7
  },
  details: {
    fontSize: 14,
    lineHeight: 16,
    color: '#241F1F',
    width: 225,
    flexShrink: 1,
    opacity: 0.7
  }
})

export default Notification
