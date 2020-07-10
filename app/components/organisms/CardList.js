import React, {
  useReducer,
  useContext,
  useEffect,
  useRef,
  Fragment
} from 'react'
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
      let visitsCompleted = [...state.visitsCompleted]
      if (!visitsCompleted.includes(payload.id)) {
        visitsCompleted = [...state.visitsCompleted, payload.id]
      }
      return {
        ...state,
        visitInProgress: null,
        visitsCompleted
      }
    default:
      throw new Error()
  }
}

const CardList = ({ label, startable, selected, onComplete }) => {
  const triggerRecap = useRef(false)
  const preventTrigger = useRef(true)
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

      const visitsCompleted = data.myVisits
        .filter((visit) => visit.status === 'DONE')
        .map((visit) => visit.id)

      dispatch({
        type: 'SET_VISITS',
        payload: {
          visits: data.myVisits,
          visitsCompleted,
          visitInProgress: visitInProgress ? visitInProgress.id : null
        }
      })
      if (state.visitsCompleted.length !== state.visits.length) {
        preventTrigger.current = false
      }
    }
  }, [data])

  useEffect(() => {
    if (
      state.visits.length > 0 &&
      state.visits.length === state.visitsCompleted.length
    ) {
      if (!triggerRecap.current && !preventTrigger.current) {
        onComplete()
        triggerRecap.current = true
      }
    }
  }, [state.visitsCompleted])

  return (
    <View>
      <ListHead
        name={context.user.firstName}
        startTime={context.schedule.startTime}
        endTime={context.schedule.endTime}
        hotels={context.hotels}
        rooms={context.rooms}
      />
      {state.visits.length > 0 && (
        <Fragment>
          <View style={[styles.middleContainer]}>
            {label && (
              <Text style={[styles.text, styles.subtitle]} category='s1'>
                Visite prioritaire
              </Text>
            )}
            <Divider style={[{ marginBottom: 16 }]} />
            <View style={styles.cardsWrapper}>
              <HotelCard
                id={state.visits[0].id}
                disabled={
                  state.visits[0].id !== state.visitInProgress &&
                  state.visitInProgress !== null
                }
                startable={startable}
                status={state.visits[0].status}
                {...state.visits[0].hotel}
                onChange={(id, action) =>
                  dispatch({
                    type: action,
                    payload: {
                      id
                    }
                  })
                }
              />
            </View>
          </View>
          <View style={[styles.middleContainer]}>
            {label && (
              <Text style={[styles.text, styles.subtitle]} category='s1'>
                Visites standards
              </Text>
            )}
            <Divider style={[{ marginBottom: 10 }]} />
            <View style={styles.cardsWrapper}>
              {state.visits.map(({ id, status, hotel }) => {
                const firstVisitId = state.visits[0].id
                if (id === firstVisitId) return
                const isLast =
                  state.visitsCompleted.length === state.visits.length - 1
                const disabled =
                  (id !== state.visitInProgress &&
                    state.visitInProgress !== null) ||
                  (!state.visitsCompleted.includes(firstVisitId) &&
                    id !== firstVisitId)
                return (
                  <HotelCard
                    key={id}
                    id={id}
                    disabled={disabled}
                    startable={startable}
                    status={status}
                    isLast={isLast}
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
                )
              })}
            </View>
          </View>
        </Fragment>
      )}
    </View>
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
    marginTop: 26,
    fontSize: 16
  },
  cardsWrapper: {
    flex: 1
  }
})

export default CardList
