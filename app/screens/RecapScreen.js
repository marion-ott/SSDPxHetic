import React, { useContext } from 'react'
import appContext from '../context/appContext'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { Text, Layout } from '@ui-kitten/components'
import Icon from '../components/atoms/Icon'
import Colors from '../constants/Colors'
import Words from '../constants/Words'
import congrats from '../assets/images/congrats.png'
import moment from 'moment/min/moment-with-locales'

export default function RecapScreen({ onPress }) {
  const { context, updateContext } = useContext(appContext)

  const getRandomWording = (array) => {
    const sample = (arr) => arr[Math.floor(Math.random() * arr.length)]
    let randomWord = sample(array)

    return randomWord
  }

  return (
    <Layout style={styles.container}>
      <View style={styles.recapMessage}>
        <Image style={styles.picto} source={congrats} />
        <Text style={[styles.title, styles.labelUser]} category='h5'>
          {getRandomWording(Words.congratWords)} {context.user.firstName},
        </Text>
        <Text style={styles.title}>
          {' '}
          {getRandomWording(Words.congratSentences)}
        </Text>
      </View>

      <View style={styles.recapInfo}>
        <View style={styles.infoCtn}>
          <Icon
            fill={Colors.white}
            style={styles.infoPicto}
            name='calendar-outline'
            width={27}
            height={27}
          />
          <Text style={[styles.infoTxt, styles.marginTop]}>
            {moment().locale('fr').format('dddd Do MMMM')}
          </Text>
        </View>

        <View style={[styles.infoCtn, styles.separator]}>
          <Icon
            fill={Colors.white}
            style={styles.infoPicto}
            name='clock-outline'
            width={27}
            height={27}
          />
          <Text style={[styles.infoTxt, styles.marginTop]}>
            {context.schedule.startTime}
          </Text>
          <Text style={styles.infoTxt}>{context.schedule.endTime}</Text>
        </View>

        <View style={styles.infoCtn}>
          <Icon
            fill={Colors.white}
            style={styles.infoPicto}
            name='home-outline'
            width={27}
            height={27}
          />
          <Text style={[styles.infoTxt, styles.marginTop]}>
            {context.rooms}
          </Text>
          <Text style={styles.infoTxt}>chambres</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={onPress}>
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
    backgroundColor: Colors.main,
    padding: 16
  },
  picto: {
    marginBottom: 20,
    width: 112,
    height: 112
  },
  title: {
    color: Colors.white,
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 40,
    textAlign: 'center'
  },
  recapMessage: {
    alignItems: 'center',
    marginBottom: 40
  },
  recapInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#6E7DE0',
    borderRadius: 20,
    width: '100%',
    maxWidth: 345,
    height: 136,
    marginBottom: 42,
    paddingTop: 10,
    paddingBottom: 10
  },
  infoCtn: {
    width: 115,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  infoPicto: {
    backgroundColor: Colors.white,
    marginBottom: 27
  },
  infoTxt: {
    color: Colors.white,
    fontSize: 16,
    textAlign: 'center',
    textTransform: 'capitalize',
    lineHeight: 19
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 30,
    width: '100%',
    maxWidth: 345,
    height: 56
  },
  buttonLabel: {
    color: '#241F1F',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 19
  },
  separator: {
    borderWidth: 3,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderLeftColor: 'rgba(255, 255, 255, 0.3)',
    borderRightColor: 'rgba(255, 255, 255, 0.3)'
  },
  marginTop: {
    marginTop: 27
  }
})
