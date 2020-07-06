import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Text, Popover, Layout } from '@ui-kitten/components'
import { Icon, OpenURLButton } from '../atoms'
import Colors from '../../constants/Colors'

const CardHead = ({ name, options, setOptions }) => {
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
          <TouchableOpacity activeOpacity={0.7} style={styles.touchableButton}>
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
