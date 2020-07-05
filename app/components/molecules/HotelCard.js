import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Card, Text, Popover, Layout, Button } from '@ui-kitten/components'
import Icon from '../atoms/Icon'
import Colors from '../../constants/Colors'

import OpenURLButton from './OpenURLButton'

const HotelCard = ({
  backgroundColor,
  name,
  address,
  city,
  zipCode,
  rooms
}) => {
  const [actions, setActions] = useState(false)
  const [options, setOptions] = useState(false)

  const displayStartOrReport = () => {
    setActions(!actions)
  }

  const renderToggleButton = () => (
    <TouchableOpacity
      onPress={() => setOptions(true)}
      activeOpacity={0.7}
      style={styles.moreIcon}>
      <Icon name='more-horizontal-outline' size={24} fill={Colors.black} />
    </TouchableOpacity>
  )

  const CardHead = (props) => (
    <View style={[styles.container, styles.cardHead]}>
      <Text style={styles.title} category='h6'>
        {name}
      </Text>
      <Popover
        visible={options}
        anchor={renderToggleButton}
        onBackdropPress={() => setOptions(false)}>
        <Layout style={styles.content}>
          <TouchableOpacity activeOpacity={0.7} style={styles.touchableButton}>
            <Text style={styles.TextStyle}>Itinéraire</Text>
          </TouchableOpacity>
          <View style={styles.callButton}>
            <OpenURLButton url={'tel:${0652033775}'}>Appeler</OpenURLButton>
          </View>
        </Layout>
      </Popover>
    </View>
  )

  return (
    <Card
      onPress={() => displayStartOrReport()}
      style={[styles.card, { backgroundColor }]}
      header={CardHead}>
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
      <View style={styles.cardopen}>
        <View style={styles.reportContainer}>
          <Text style={[styles.text, styles.report]} category='h6'>
            Reporter
          </Text>
        </View>
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
      </View>
    </Card>
  )
}
const styles = StyleSheet.create({
  cardHead: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12
  },
  card: {
    flex: 1,
    backgroundColor: 'blue',
    borderRadius: 8,
    marginBottom: 7,
    borderWidth: 0
  },
  touchableButton: {
    marginHorizontal: 10,
    paddingVertical: 5
  },
  callButton: {
    marginHorizontal: 10,
    paddingVertical: 5
  },
  listview: {
    padding: 10
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 0
  },
  headerContain: {
    padding: 12
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
  title: {
    fontSize: 16
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
    borderBottomColor: Colors.brightOrange,
    width: 70
  }
})

export default HotelCard
