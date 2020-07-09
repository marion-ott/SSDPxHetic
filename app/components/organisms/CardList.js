import React, { useReducer, useContext, useEffect, useState } from 'react'
import { StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native'
import { Text, Divider } from '@ui-kitten/components'
import { useLazyQuery } from '@apollo/react-hooks'
import { GET_VISITS } from '../../graphql/queries/visits'
import useGetVisits from '../../hooks/useGetVisits'
import appContext from '../../context/appContext'
import dateContext from '../../context/dateContext'
import HotelCard from '../molecules/HotelCard'
import ListHead from '../molecules/ListHead'
import Colors from '../../constants/Colors'
import { getDateStr, formatDate } from '../../utils/index'

function reducer(state, { type, payload }) {
  switch (type) {
    case 'SET_VISITS':
      return { ...state, ...payload }
    case 'UPCOMING':
      return { ...state }
    case 'ONGOING':
      return { ...state, visitInProgress: payload.id }
    case 'DONE':
      return {
        ...state,
        visitInProgress: null,
        visitsCompleted: [...state.visitsCompleted, payload.id]
      }
    default:
      throw new Error()
  }
}

const CardList = ({ label, startable, selected, onComplete }) => {
  const { context, updateContext } = useContext(appContext)

  const [state, dispatch] = useReducer(reducer, {
    visits: [],
    visitsCompleted: [],
    visitInProgress: null
  })

  const { loading, error, data } = useGetVisits(
    context.teamId,
    formatDate(selected),
    [selected]
  )

  useEffect(() => {
    if (data) {
      const visitInProgress = data.myVisits.find(
        (visit) => visit.status === 'ONGOING'
      )

      const hotels = data.myVisits.length
      const rooms = data.myVisits.reduce(
        (total, { hotel }) => total + hotel.rooms,
        0
      )
      updateContext({
        hotels,
        rooms
      })

      dispatch({
        type: 'SET_VISITS',
        payload: {
          visits: data.myVisits,
          visitsCompleted: data.myVisits.filter(
            (visit) => visit.status === 'DONE'
          ),
          visitInProgress: visitInProgress ? visitInProgress.id : null
        }
      })
    }
  }, [data])

  useEffect(() => {
    if (state.visits.length === state.visitsCompleted.length) {
      //TODO: trigger recap display
      //onComplete()
    }
  }, [state.visitsCompleted])

  if (loading) {
    return <ActivityIndicator size='small' color={Colors.main} />
  }

  return (
    <ScrollView>
      <ListHead
        name={context.user.firstName}
        startTime={context.schedule.startTime}
        endTime={context.schedule.endTime}
        hotels={context.hotels}
        rooms={context.rooms}
      />
      <View style={styles.middleContainer}>
        {label && (
          <Text style={[styles.text, styles.subtitle]} category='s1'>
            {label}
          </Text>
        )}
        <Divider style={[{ marginBottom: 10 }]} />
        <View style={styles.cardsWrapper}>
          {state.visits.map(({ id, status, hotel }) => (
            <HotelCard
              key={id}
              id={id}
              disabled={
                id !== state.visitInProgress && state.visitInProgress !== null
              }
              startable={startable}
              status={status}
              {...hotel}
              onChange={(id, action) =>
                dispatch({
                  type: action,
                  payload: {
                    id
                  }
                })
              }
            />
          ))}
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    flexDirection: 'column',
    flexDirection: 'row',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingLeft: 15,
    paddingRight: 15,
    position: 'relative',
    zIndex: 20
  },
  middleContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: Colors.main
  },
  subtitle: {
    marginBottom: 7,
    marginTop: 20
  },
  cardsWrapper: {
    flex: 1
  }
})

export default CardList
