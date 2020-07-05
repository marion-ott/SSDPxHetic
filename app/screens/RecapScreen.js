import React, { useContext } from 'react'
import userContext from '../context/userContext'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { Text, Layout } from '@ui-kitten/components'
import Icon from '../components/molecules/CommonIcon'

import Words from '../constants/Words'
import congrats from '../assets/images/congrats.png'

import moment from "moment";


export default function RecapScreen() {
  const { user } = useContext(userContext)

  const getRandomWording = (array) => {
    const sample = arr => arr[Math.floor(Math.random() * arr.length)]
    let randomWord = sample(array)

    return randomWord
  }
  
  return (
    <Layout style={styles.container}>
      <View style={styles.recapMessage}>
        <Image
          style={styles.picto}
          source={congrats}
        />
        <Text style={[styles.title, styles.labelUser]} category='h5'>
          {getRandomWording(Words.congratWords)} {user.firstName},
        </Text>
        <Text style={styles.title}>
          {' '}
          {getRandomWording(Words.congratSentences)}
        </Text>
      </View>

      <View style={styles.recapInfo}>
        <View style={styles.infoCtn}>
          <Icon fill='#ffffff' style={styles.infoPicto} name='calendar-outline' width={27} height={27} />
          <Text style={[styles.infoTxt, styles.marginTop]}>{moment().locale('fr').format("dddd Do")}</Text>
          <Text style={styles.infoTxt}>{moment().locale('fr').format("MMMM YYYY")}</Text>
        </View>

        <View style={[styles.infoCtn, styles.separator]}>
          <Icon fill='#ffffff' style={styles.infoPicto} name='clock-outline' width={27} height={27} />
          <Text style={[styles.infoTxt, styles.marginTop]}>8h30</Text>
          <Text style={styles.infoTxt}>16h30</Text>
        </View>

        <View style={styles.infoCtn}>
          <Icon fill='#ffffff' style={styles.infoPicto} name='home-outline' width={27} height={27} />
          <Text style={[styles.infoTxt, styles.marginTop]}>23</Text>
          <Text style={styles.infoTxt}>chambres</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        // onPress={onPress}
      >
        <Text style={styles.buttonLabel}>Revenir à mon planning</Text>
      </TouchableOpacity>
    </Layout>
  )
}

RecapScreen.navigationOptions = {
  header: null
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3D52D5',
    padding: 16,
  },
  picto: {
    marginBottom: 40,
    width: 122,
    height: 122,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 40,
    textAlign: 'center',
  },
  recapMessage: {
    alignItems: 'center',
    marginBottom: 40,
  },
  recapInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#6E7DE0',
    borderRadius: 20,
    width: '100%',
    maxWidth: 345,
    height: 176,
    marginBottom: 42,
    paddingTop: 30,
    paddingBottom: 30,
  },
  infoCtn: {
    width: 115,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  height: '100%',
  },
  infoPicto: {
    backgroundColor: '#FFFFFF',
    marginBottom: 27,
  },
  infoTxt: {
    // height: 38,
    // width: 70,
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    textTransform: 'capitalize',
    lineHeight: 19,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    width: '100%',
    maxWidth: 345,
    height: 56,
  },
  buttonLabel: {
    color: '#241F1F',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 19,
  },
  separator: {
    borderWidth: 3,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderLeftColor: 'rgba(255, 255, 255, 0.3)',
    borderRightColor: 'rgba(255, 255, 255, 0.3)',
  },
  marginTop: {
    marginTop: 27,
  }

})
