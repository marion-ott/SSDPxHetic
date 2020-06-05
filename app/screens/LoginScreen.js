import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import * as yup from 'yup'
import { useMutation } from '@apollo/react-hooks'
import { LOGIN } from './../graphql/mutations/auth'
import { getFormProps } from './../global/data'
import AsyncStorage from '@react-native-community/async-storage'
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { MonoText } from '../components/StyledText';
import Login from '../components/organism/Login'

export default function LoginScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.getStartedText}>LOGIN</Text>

      <Login />

      {/* <Form data={form} callback={login} schema={schema} withIcon={true} /> */}

    </View>
  );
}

LoginScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  }
});
