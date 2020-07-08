import React, { useState, useContext } from 'react'
import moment from 'moment'
import useGetVisits from '../hooks/useGetVisits'
import { StyleSheet, View, ActivityIndicator, ScrollView } from 'react-native'
import { Text, Layout } from '@ui-kitten/components'
import appContext from '../context/appContext'
import dateContext from '../context/dateContext'
import { RecapScreen } from './'
import { CardList } from '../components/organisms'
import { Details } from '../components/molecules'
import Colors from '../constants/Colors'

export default function HomeScreen() {

    const { user, teamId, schedule } = useContext(userContext)
    const { hotels, rooms } = useContext(recapContext)
    const { today } = useContext(dateContext)
    const [visits, setVisits] = useState([])
    const [details, setDetails] = useState([])
    const [recap, setRecap] = useState([])
    const { today } = useContext(dateContext)
    const [visitsCompleted, setVisitsCompleted] = useState(false)

      //TODO: trigger recap display
      const onVisitsCompleted = () => {
        setVisitsCompleted(true)
      }

    const { loading, error, data } = useGetVisits(teamId, today)

    useEffect(() => {
        if (data) {
            const { myVisits } = data

            let sum = 0
            myVisits.forEach(({ hotel }) => (sum += hotel.rooms))

            setRecap({
                hotels: data.myVisits.length,
                rooms: sum
            })
            setVisits(myVisits)
            setDetails([
                {
                    label: 'Horaires',
                    value: `${schedule.startTime}-${schedule.endTime}`
                },
                {
                    label: 'Hôtels',
                    value: data.myVisits.length
                },
                {
                    label: 'Chambres',
                    value: sum
                }
            ])
        }
    }, [data])

    if (loading) {
        return <ActivityIndicator size='small' color={Colors.main} />
    }

    return (
        <View style={{
            flex: 1,
            flexDirection: "column",
            backgroundColor: Colors.main,
            position: "relative"
        }}>
            <Text style={[styles.currentDay, styles.text]} category='h5'>
                {moment(today).locale('fr').format('dddd Do MMMM')}
            </Text>
            <ScrollView style={{
                flex: 1,
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 2,
            }}>
                <View style={{
                    backgroundColor: "white",
                    flex: 1,
                    marginTop: 90,
                    flexDirection: 'column',
                    flexDirection: 'row',
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    paddingLeft: 15,
                    paddingRight: 15,
                }}>
                    <View style={styles.layoutContain}>
                        <View style={styles.headContain}>
                            <Text style={[styles.text, styles.labelUser]} category='h5'>
                                Bonjour {user.firstName},
                            </Text>
                            <Text style={styles.text} appearance='hint'>
                                Voici le récapitulatif de votre journée.
                            </Text>
                        </View>
                        <View style={styles.details}>
                            {details.map((el, index) => (
                                <Details key={index} {...el} />
                            ))}
                        </View>
                        {visits && (
                            <CardList
                             onComplete={onVisitsCompleted}
                             startable={true}
                             label={'Visites'}
                           />
                        )}
                    </View>
                </View>
            </ScrollView>
            <View style={{
                backgroundColor: "white",
                flex: 1,
                marginTop: 100,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
            }}>

            </View>
        </View>
    )

}

HomeScreen.navigationOptions = {
    header: null
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.main
    },
    layoutContain: {
        flex: 1,
    },
    currentDay: {
        color: '#FFFF',
        textAlign: 'center',
        paddingTop: 40,
        paddingBottom: 20
    },
    viewport: {
        flexBasis: "30%",
    },
    headContain: {
        marginTop: 40,
        marginBottom: 20
    },
    labelUser: {
        fontWeight: 'bold',
        marginBottom: 4
    },
    layout: {
        flexBasis: "80%",
        zIndex: 2,
        width: "100%",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,

    },
    details: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    scroll: {
        backgroundColor: "transparent",
        flex: 1,
        flexDirection: "column",
    }

})
