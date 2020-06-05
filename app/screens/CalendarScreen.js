import * as WebBrowser from 'expo-web-browser'
import * as React from 'react'
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import CalendarElement from '../components/Calendar'
import { MonoText } from '../components/StyledText'

export default function CalendarScreen() {
  return (
    <View style={styles.container}>
      <CalendarElement />
    </View>
  )
}

CalendarScreen.navigationOptions = {
  header: null
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})
