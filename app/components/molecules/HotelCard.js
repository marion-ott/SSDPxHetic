import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Card, Text, Popover, Layout, Button } from '@ui-kitten/components'
import { Icon, OpenURLButton, CardHead } from '../atoms'
import Colors from '../../constants/Colors'

const HotelCard = ({
  backgroundColor,
  name,
  address,
  city,
  zipCode,
  rooms,
  hasCta = false
}) => {
  const [actions, setActions] = useState(hasCta)
  const [options, setOptions] = useState(false)

  const displayStartOrReport = () => {
    setActions(!actions)
  }

  return (
    <Card
      onPress={() => displayStartOrReport()}
      style={[styles.card, { backgroundColor }]}
      header={() => (
        <CardHead name={name} options={options} setOptions={setOptions} />
      )}>
      <View style={styles.content}>
        <View>
          <Text style={styles.text} category='s2'>
            {address},
          </Text>
          <Text style={styles.text} category='s2'>
            {zipCode} {city}
          </Text>
        </View>
        <View style={styles.room}>
          <Icon
            style={styles.roomIcon}
            name='briefcase-outline'
            fill='#B97D08'
            width={18}
            height={18}
          />
          <Text style={(styles.text, { marginLeft: 5 })} category='s2'>
            {rooms}
          </Text>
        </View>
      </View>
      {actions && (
        <View
          style={styles.cardopen}
        >
          <TouchableOpacity
            onPress={() => reportTicket()}
            activeOpacity={0.7}
            style={styles.reportContainer}>
            <View style={styles.borderLine}>
              <Text style={[styles.text, styles.report]} category='h6'>Reporter</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => startTicket()}
            activeOpacity={0.7}
            style={styles.touchableButton}
          >
            <View style={styles.startContainer}>
              <Icon
                style={styles.startIcon}
                name='play-circle-outline'
                width={24}
                height={24}
                fill='white'
              />
              <Text
                appearance='alternative'
                style={[styles.text, styles.startLabel]}
                category='h6'>
                Commencer
            </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: 'blue',
    borderRadius: 8,
    marginBottom: 7,
    borderWidth: 0
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 0
  },
  room: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  roomIcon: {
    marginRight: 4
  },
  cardopen: {
    marginTop: 14,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  report: {
    color: Colors.brightOrange,
    textAlign: 'center'
  },
  text: {
    fontSize: 14
  },
  startContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.brightOrange,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 40
  },
  reportContainer: {
    alignItems: 'center'
  },
  startLabel: {
    color: 'white',
    textAlign: 'center'
  },
  borderLine: {
    borderBottomWidth: 1,
    textAlign: 'center',
    borderBottomColor: "#FF8139",
    width: 70
  }
})

export default HotelCard
