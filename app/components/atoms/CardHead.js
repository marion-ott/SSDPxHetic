import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Linking } from 'react-native'
import { Text, Popover, Layout } from '@ui-kitten/components'
import { Icon, OpenURLButton } from '../atoms'
import Colors from '../../constants/Colors'

const CardHead = ({ name, phone, lat, long }) => {
  const [popover, setPopover] = useState(false)

  const openMap = () => {
    let url = ''
    Platform.select({
      ios: () => {
        url = `maps:${lat},${long}?=Custom Label`
      },
      android: () => {
        url = `geo:${lat},${long}?=Custom Label`
      }
    })

    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url)
      } else {
        console.log("Impossible d'ouvrir cet url.")
      }
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
        width={16}
        height={16}
        fill={Colors.brightOrange}
      />
    </TouchableOpacity>
  )

  return (
    <View style={[styles.container, styles.cardHead]}>
      <Text style={styles.title} category='h6'>
        {name}
      </Text>
      <Popover
        style={styles.popoverContainer}
        visible={popover}
        anchor={renderToggleButton}
        placement='left start'
        onBackdropPress={togglePopover}>
        <Layout style={styles.popover}>
          <TouchableOpacity
            onPress={openMap}
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
        </Layout>
      </Popover>
    </View>
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
  popoverContainer: {
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
    fontSize: 16
  },
  more: {
    backgroundColor: '#FFE5D7',
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 4
  }
})

export default CardHead
