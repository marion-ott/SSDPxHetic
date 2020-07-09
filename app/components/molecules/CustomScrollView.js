import React from 'react'
import { StyleSheet, View, ScrollView, SafeAreaView } from 'react-native'
import Colors from '../../constants/Colors'
import { Dimensions } from 'react-native'

export default function CustomScrollView({ top = 100, Component, children }) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.component}>
        <Component />
      </View>
      <ScrollView style={[styles.scrollWrapper, { top }]}>
        <View style={[styles.content]}>{children}</View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white'
  },
  scrollWrapper: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 24,
    overflow: 'visible'
  },
  component: {
    minHeight: 200,
    backgroundColor: Colors.main,
    zIndex: -1,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    paddingBottom: 50
  },
  content: {
    flexGrow: 1,
    flex: 1,
    //height: 500, QUAND CONTENT TROP PETIT BG BLEU
    alignSelf: 'stretch',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: Colors.white,
    position: 'relative',
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 20
  }
})
