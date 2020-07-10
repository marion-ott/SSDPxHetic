import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Text, Input } from '@ui-kitten/components'
import Icon from '../atoms/Icon'
import Colors from '../../constants/Colors'

const ModalBody = ({ setVisible, hotel, deleteVisit }) => {

  return (
    <View style={[styles.container]}>
      <View style={[styles.modalHead]}>

        <Text style={styles.title}>
          Confirmation de report
        </Text>

      </View>

      <View>
        <Text style={[styles.label]}>
          Souhaitez-vous vraiment reporter la visite de l'hôtel {hotel.name} ?
        </Text>

        <View style={[{ flexDirection: "row" }]}>
          
          <TouchableOpacity
            style={[styles.button, styles.logout]}
            onPress={() => setVisible()}>
            <Text style={[styles.buttonLabel, styles.logoutLabel]}>
              Non
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => deleteVisit}>
            <Text style={styles.buttonLabel}>
              Oui
            </Text>
          </TouchableOpacity>
          
        </View>

      </View>


    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 24,
    minWidth: 300,
  },
  modalHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 24,
    textAlign: 'center'
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.main,
    borderRadius: 30,
    width: '100%',
    height: 56,
    width: '100%',
    marginTop: 16
  },
  buttonLabel: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 19
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 16,
  },
  input: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  logout: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.brightOrange
  },
  logoutLabel: {
    color: Colors.brightOrange
  }
})

export default ModalBody
