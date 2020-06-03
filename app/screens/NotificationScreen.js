import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { MonoText } from '../components/StyledText';

export default function NotificationScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.getStartedText}>NOTIFICATION</Text>
    </View>
  );
}

NotificationScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
