import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { MonoText } from '../components/StyledText';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.profile}>PROFILE</Text>
    </View>
  );
}

ProfileScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profile: {
    color: 'blue'
  }
});
