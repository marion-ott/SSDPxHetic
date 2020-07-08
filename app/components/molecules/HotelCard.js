import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { UPDATE_VISIT } from '../../graphql/mutations/visits'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Card, Text, Popover, Layout, Button } from '@ui-kitten/components'
import { Icon, OpenURLButton, CardHead } from '../atoms'
import Colors from '../../constants/Colors'

const HotelCard = ({
  id,
  onChange,
  startable,
  status: originalStatus,
  ...hotel
}) => {
  const [status, setStatus] = useState(originalStatus)

  const [updateVisit, { loading, data, error }] = useMutation(UPDATE_VISIT, {
    onCompleted: ({ updateVisit: { status } }) => {
      onChange(id, status)
      setStatus(status)
    },
    onError: (error) => console.error('ERREUR: ', error.message)
  })

  const onUpdate = () => {
    const variables = {
      id,
      data: {
        status: ''
      }
    }

    if (status === 'UPCOMING') variables.data.status = 'ONGOING'
    if (status === 'ONGOING') variables.data.status = 'DONE'
    if (status === 'DONE') variables.data.status = 'UPCOMING'

    updateVisit({ variables })
  }

  return (
    <Card
      style={[styles.card, styles[status]]}
      header={() => <CardHead {...hotel} />}>
      <View style={styles.content}>
        <View>
          <Text style={styles.text} category='s2'>
            {hotel.address},
          </Text>
          <Text style={styles.text} category='s2'>
            {hotel.zipCode} {hotel.city}
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
            {hotel.rooms}
          </Text>
        </View>
      </View>
      {startable && (
        <View style={styles.buttons}>
          <TouchableOpacity
            // onPress={() => onChange(id, 'startVisit')}
            activeOpacity={0.7}
            style={[styles.touchableButton, styles.button]}>
            <View style={styles.borderLine}>
              <Text style={[styles.text, styles.report]} category='h6'>
                Reporter
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onUpdate}
            activeOpacity={0.7}
            style={styles.touchableButton}>
            <View style={[styles.startContainer, styles.button]}>
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
                {status}
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
    borderRadius: 8,
    marginBottom: 7,
    borderWidth: 0
    // backgroundColor: Colors.lightOrange
  },
  UPCOMING: {
    backgroundColor: 'red'
  },
  ONGOING: {
    backgroundColor: 'blue'
  },
  DONE: {
    backgroundColor: 'orange'
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
  buttons: {
    marginTop: 14,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  touchableButton: {
    flex: 1
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 40
  },
  report: {
    color: Colors.brightOrange,
    textAlign: 'center'
  },
  text: {
    fontSize: 14
  },
  startContainer: {
    backgroundColor: Colors.brightOrange
  },
  startLabel: {
    color: 'white',
    textAlign: 'center'
  },
  borderLine: {
    borderBottomWidth: 1,
    textAlign: 'center',
    borderBottomColor: Colors.brightOrange,
    width: 70
  }
})

export default HotelCard
