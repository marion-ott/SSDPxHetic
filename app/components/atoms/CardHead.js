import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Text, Popover, Layout } from '@ui-kitten/components'
import { Icon, OpenURLButton } from '../atoms'
import Colors from '../../constants/Colors'

const CardHead = ({ name, options, setOptions }) => {
  const openMap = () => {
    let m = Platform.select({
      ios: () => {
        Linking.openURL('http://maps.apple.com/maps?daddr=38.7875851,-9.3906089');
      },
      android: () => {
        Linking.openURL('http://maps.google.com/maps?daddr=38.7875851,-9.3906089').catch(err => console.error('An error occurred', err));;
      }
    });

    m();
  }

  const renderToggleButton = () => (
    <TouchableOpacity
      onPress={() => setOptions(true)}
      activeOpacity={0.7}
      style={styles.moreIcon}>
      <Icon name='more-horizontal-outline' size={24} fill={Colors.black} />
    </TouchableOpacity>
  )

  return (
    <View style={[styles.container, styles.cardHead]}>
      <Text style={styles.title} category='h6'>
        {name}
      </Text>
      <Popover
        visible={options}
        anchor={renderToggleButton}
        onBackdropPress={() => setOptions(false)}>
        <Layout style={styles.content}>
<<<<<<< HEAD
          <TouchableOpacity
            onPress={openMap}
            activeOpacity={0.7}
            style={styles.touchableButton}>
=======
          <TouchableOpacity onPress={openMap} activeOpacity={0.7} style={styles.touchableButton}>
>>>>>>> c3a8af9df0742c17bbfc245b0129ccefe1291173
            <Text>Itinéraire</Text>
          </TouchableOpacity>
          <View style={styles.callButton}>
            <OpenURLButton url={'tel:${0652033775}'}>Appeler</OpenURLButton>
          </View>
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
  touchableButton: {
    marginHorizontal: 10,
    paddingVertical: 5
  },
  callButton: {
    marginHorizontal: 10,
    paddingVertical: 5
  },
  title: {
    fontSize: 16
  }
})

export default CardHead
