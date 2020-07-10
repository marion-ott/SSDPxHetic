import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Linking } from 'react-native'
import { Text, Popover, Layout } from '@ui-kitten/components'
import Icon from './Icon'
import OpenURLButton from './OpenURLButton'
import Colors from '../../constants/Colors'
import openMap from 'react-native-open-maps'

const CardHead = ({ name, phone, lat, long, status, disabled, onChange }) => {
  const [popover, setPopover] = useState(false)
  const disabledStyle =
    disabled && status === 'UPCOMING'
      ? styles.grey
      : status === 'UPCOMING'
      ? styles.black
      : status === 'DONE'
      ? styles.black
      : status === 'ONGOING'
      ? styles.white
      : ''

  const openLoc = () => {
    openMap({
      latitude: lat,
      longitude: long,
      navigate_mode: 'navigate',
      end: name
    })
  }

  const togglePopover = () => {
    setPopover(!popover)
  }

  const renderToggleButton = () => (
    <TouchableOpacity
      onPress={togglePopover}
      activeOpacity={0.7}
      style={styles.more}>
      <Icon
        name='more-vertical-outline'
        fill={
          disabled && status !== 'DONE'
            ? Colors.darkGrey
            : status === 'DONE'
            ? Colors.brightOrange
            : status === 'ONGOING'
            ? Colors.white
            : Colors.black
        }
        width={16}
        height={16}
      />
    </TouchableOpacity>
  )

  return (
    <View
      style={[
        styles.cardHead,
        status == 'DONE'
          ? ''
          : disabled
          ? styles.borderDisabled
          : status == 'UPCOMING'
          ? styles.borderUpcoming
          : styles.borderNotDone
      ]}>
      <View style={styles.flexRow}>
        {status == 'DONE' && (
          <View style={styles.slide}>
            <Icon
              name='checkmark-outline'
              width={26}
              height={26}
              fill={Colors.brightOrange}
            />
          </View>
        )}
        <Text style={[styles.title, disabledStyle]} category='h6'>
          {name}
        </Text>
      </View>
      <Popover
        style={styles.popoverContainer}
        visible={popover}
        anchor={renderToggleButton}
        placement='left start'
        onBackdropPress={togglePopover}>
        <Layout style={styles.popover}>
          <TouchableOpacity
            onPress={openLoc}
            activeOpacity={0.7}
            style={styles.options}>
            <Icon
              name='pin-outline'
              width={18}
              height={18}
              fill={Colors.black}
            />
            <Text style={styles.optionsText}>Itinéraire</Text>
          </TouchableOpacity>
          <OpenURLButton url={`tel:${phone}`}>
            <View style={[styles.options, styles.optionsNoBorder]}>
              <Icon
                name='phone-outline'
                width={18}
                height={18}
                fill={Colors.black}
              />
              <Text style={styles.optionsText}>Appeler l'hôtel</Text>
            </View>
          </OpenURLButton>

          {status === 'ONGOING' && (
            <TouchableOpacity
              onPress={() => onChange(true)}
              activeOpacity={0.7}
              style={[styles.options, { marginTop: 16, marginBottom: 0 }]}>
              <Icon
                name='clock-outline'
                width={18}
                height={18}
                fill={Colors.black}
              />
              <Text style={styles.optionsText}>Reprendre plus tard</Text>
            </TouchableOpacity>
          )}
        </Layout>
      </Popover>
    </View>
  )
}

const styles = StyleSheet.create({
  cardHead: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 24,
    width: '100%',
    height: 55
  },
  borderDisabled: {
    borderBottomColor: Colors.darkGrey,
    borderBottomWidth: 1
  },
  borderNotDone: {
    borderBottomColor: Colors.white,
    borderBottomWidth: 1
  },
  borderUpcoming: {
    borderBottomColor: Colors.lightGrey,
    borderBottomWidth: 1
  },
  popoverContainer: {
    borderBottomColor: Colors.darkGrey,
    borderBottomWidth: 1,
    borderWidth: 0,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4
  },
  popover: {
    paddingHorizontal: 16,
    borderRadius: 8,
    paddingVertical: 16,
    fontSize: 16
  },
  touchableButton: {
    marginHorizontal: 10,
    paddingVertical: 5
  },
  options: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  optionsNoBorder: {
    marginBottom: 0
  },
  optionsText: {
    fontSize: 16,
    marginLeft: 5,
    fontWeight: '500'
  },
  title: {
    fontSize: 17,
    fontWeight: '500'
  },
  more: {
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 4
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
  slide: {
    marginRight: 7,
    alignItems: 'center'
  },
  black: {
    color: Colors.tabIconDefault
  },
  white: {
    color: Colors.white
  },
  grey: {
    color: Colors.darkGrey
  }
})

export default CardHead
