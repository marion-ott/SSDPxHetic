import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { UPDATE_VISIT } from '../../graphql/mutations/visits'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Card, Text, Popover, Layout, Button } from '@ui-kitten/components'
import Icon from '../atoms/Icon'
import OpenURLButtonfrom from '../atoms/OpenURLButton'
import CardHead from '../atoms/CardHead'
import Colors from '../../constants/Colors'

const HotelCard = ({
  id,
  onChange,
  startable,
  disabled,
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

  console.log(hotel.name, disabled, status)
  
  return (
    <Card
      style={[styles.card, styles[status]]}
    >
      <CardHead {...hotel} status={status} disabled={disabled} />
      {/* DISPLAY INFO */}
      {status !== 'DONE' && (
        <View style={styles.content}>
          <View>
            <Text
              style={[
                styles.text,
                disabled
                  ? texts.grey
                  : !disabled && (status === 'ONGOING')
                  ? texts.white
                  : texts.black
              ]}
              category='s2'>
              {hotel.address},
            </Text>
            <Text
              style={[
                styles.text,
                status === 'ONGOING' && !disabled ? texts.white : texts.black,
                disabled ? texts.grey : ''
              ]}
              category='s2'>
              {hotel.zipCode} {hotel.city}
            </Text>
          </View>
          <View style={styles.room}>
            <Icon
              style={styles.roomIcon}
              name='briefcase-outline'
              fill={status === 'ONGOING' ? '#ffffff' : '#FF8139'}
              width={18}
              height={18}
            />
            <Text
              style={[
                styles.text,
                { marginLeft: 5, fontWeight: 'bold' },
                status === 'ONGOING' ? texts.white : texts.black
              ]}
              category='s2'>
              {hotel.rooms}
            </Text>
          </View>
        </View>
      )}
      {/* DISPLAY BUTTS */}
      {startable && status !== 'DONE' && !disabled && (
        <View style={styles.buttons}>
          {status == 'UPCOMING' && (
            <TouchableOpacity
              // onPress={() => onChange(id, 'startVisit')}
              activeOpacity={0.7}
              style={[styles.touchableButton, styles.button]}>
              <View style={styles.borderLine}>
                <Text
                  style={[styles.text, styles.report, styles.bold]}
                  category='h6'>
                  Reporter
                </Text>
              </View>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={onUpdate}
            activeOpacity={0.7}
            style={styles.touchableButton}>
            <View
              style={[
                styles.startContainer,
                styles.button,
                startable && status === "UPCOMING"
                  ? backgrounds.brightOrange
                  : backgrounds.white
              ]}>
              {status == 'UPCOMING' && (
                <View style={styles.translate}>
                  <Icon
                    style={styles.startIcon}
                    name='play-circle-outline'
                    width={24}
                    height={24}
                    fill={!disabled ? Colors.white : Colors.brightOrange}
                  />
                </View>
              )}
              <Text
                appearance='alternative'
                style={[
                  styles.text,
                  styles.startLabel,
                  startable && status === "UPCOMING" ? texts.whiteBold : texts.orangeBold
                ]}
                category='h6'>
                {status == 'UPCOMING' ? 'Commencer' : 'Terminer la visite'}
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
    borderWidth: 0,
    backgroundColor: Colors.lightOrange
  },
  UPCOMING: {
    // backgroundColor: Colors.brightOrange,
  },
  ONGOING: {
    backgroundColor: Colors.brightOrange
  },
  DONE: {
    // backgroundColor: Colors.lightOrange,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
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
    flex: 1,
    height: 48,
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
    // backgroundColor: Colors.brightOrange
  },
  startLabel: {
    color: 'white',
    textAlign: 'center'
  },
  translate: {
    transform: [{ translateX: -10 }]
  },
  borderLine: {
    borderBottomWidth: 1,
    textAlign: 'center',
    borderBottomColor: Colors.brightOrange,
    width: 48
  },
  bold: {
    fontWeight: 'bold'
  }
})

const backgrounds = StyleSheet.create({
  lightOrange: {
    backgroundColor: Colors.lightOrange
  },
  brightOrange: {
    backgroundColor: Colors.brightOrange
  },
  white: {
    backgroundColor: Colors.white
  }
})

const texts = StyleSheet.create({
  black: {
    color: Colors.tabIconDefault
  },
  blackBold: {
    color: Colors.tabIconDefault,
    fontWeight: 'bold'
  },
  white: {
    color: Colors.white
  },
  whiteBold: {
    color: Colors.white,
    fontWeight: 'bold'
  },
  grey: {
    color: Colors.darkGrey
  },
  greyBold: {
    color: Colors.darkGrey,
    fontWeight: 'bold'
  },
  orangeBold: {
    color: Colors.brightOrange,
    fontWeight: 'bold'
  }
})

export default HotelCard
