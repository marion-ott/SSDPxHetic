import React, { useReducer, useContext, useEffect, useState } from 'react'
import { StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native'
import { useMutation } from '@apollo/react-hooks'
import { UPDATE_VISIT } from '../../graphql/mutations/visits'
import { Text, Divider, Layout } from '@ui-kitten/components'
import appContext from '../../context/appContext'
import dateContext from '../../context/dateContext'
import useGetVisits from '../../hooks/useGetVisits'
import Colors from '../../constants/Colors'
import { HotelCard, ListHead } from '../molecules'

// UPCOMING
// ONGOING
// DONE

const status = {
  upcoming: 'UPCOMING',
  inProgress: 'ONGOING',
  complete: 'DONE'
}

function reducer(state, { type, payload }) {
  switch (type) {
    case 'upcoming':
      return { ...state, visits: payload.visits }
    case 'inProgress':
      return { ...state, visitInProgress: payload.id }
    case 'complete':
      return {
        ...state,
        visitInProgress: null,
        visitsCompleted: [...state.visitsCompleted, payload.id]
      }
    case 'onDayEnd':
      return {
        ...state,
        isDayOver: true
      }
    default:
      throw new Error()
  }
}

const CardList = ({ label, cards, startable, onComplete }) => {
  const [fetching, setFetching] = useState(false)
  const { today } = useContext(dateContext)
  const { context, updateContext } = useContext(appContext)

  const [state, dispatch] = useReducer(reducer, {
    visits: [],
    visitsCompleted: [],
    visitInProgress: null,
    isDayOver: false
  })
  // '5f03013a24aa9a0007167c30'

  const { loading, error, data } = useGetVisits(context.teamId, today, [
    state.visits
  ])
  const [updateVisit, { loading: test, data: cc, error: err }] = useMutation(
    UPDATE_VISIT,
    {
      onCompleted() {
        //onClick()
        setFetching(false)
      },
      onError: (error) => console.error('ERREUR: ', error.message)
    }
  )

  useEffect(() => {
    if (data) {
      const { myVisits } = data

      updateContext({
        hotels: data.myVisits.length,
        rooms: data.myVisits.reduce(
          (total, { hotel }) => total + hotel.rooms,
          0
        )
      })

      dispatch({
        type: 'upcoming',
        payload: {
          visits: myVisits
        }
      })
    }
  }, [data])

  const onDayEnd = () => {
    dispatch({
      type: 'onDayEnd'
    })
    onComplete()
  }

  const onChange = () => {
    //TODO: dispatch proper action & payload
  }

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
          {state.visits.map(({ id, hotel }) => (
            <HotelCard
              complete={state.visitsCompleted.some(
                (visit) => visit === hotel.id
              )}
              inProgress={hotel.id === state.visitInProgress}
              startable={startable}
              key={id}
              {...hotel}
              onChange={(id, action) => {
                // updateVisit({
                //   variables: { id, data: { status: status[action] } }
                // })

                dispatch({
                  type: action,
                  payload: {
                    id
                  }
                })
              }}
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
