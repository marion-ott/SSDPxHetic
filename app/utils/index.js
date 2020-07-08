import moment from 'moment'
import AsyncStorage from '@react-native-community/async-storage'
import * as SecureStore from 'expo-secure-store'


const getDateStr = (date) => {
  return date.toISOString().slice(0, 10)
}

const formatDate = (date) =>
  `${moment(date).startOf('day').format('YYYY-MM-DD')}T00:00:00.000Z`

const setTokenInStorage = async (value) => {
  try {
    await SecureStore.setItemAsync('token', value)
  } catch (e) {
    // saving error
    console.log(e)
  }
}

const deleteTokenInStorage = async (value) => {
  try {
    await SecureStore.deleteItemAsync('token', value)
  } catch (e) {
    // saving error
    console.log(e)
  }
}

export { getDateStr, formatDate, setTokenInStorage, deleteTokenInStorage }
