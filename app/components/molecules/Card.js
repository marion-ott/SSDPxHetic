import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';

const HostCard = ({ backgroundColor, type, label, sublabel }) => {
    const [options, setOptions] = useState(false)

    const displayCard = () => {
        setOptions(!options)
    }

    if (type === "small") {
        return (
            <View style={styles.smallCard(backgroundColor)}>
                <Text style={styles.text} appearance='hint'>{label}</Text>
                <Text>{sublabel}</Text>
            </View>
        )
    }
    const Header = (props) => {
        return (
            <View {...props}>
                <View style={styles.cardContainer}>
                    <Text style={styles.text} category='h6'>Hilton Gare d’Austerlitz</Text>
                    <Ionicons name="md-more" size={24} color="black" />
                </View>
            </View>
        )
    }
    return (
        <Card onPress={() => displayCard()} style={[styles.card, { backgroundColor }]} header={Header}>
            <View style={styles.cardContainer}>
                <View>
                    <Text style={styles.text} category='s2'>24 rue des petits champs,</Text>
                    <Text style={styles.text} category='s2'>75013 Paris</Text>
                </View>
                <View style={styles.room}>
                    <Ionicons style={styles.roomIcon} name="md-bed" size={24} color="#B97D08" />
                    <Text style={styles.text} category='s2'>12</Text>
                </View>
            </View>
            {options ?
                <View style={styles.cardopen}>
                    <View style={styles.reportContainer}>
                        <View style={styles.borderLine}>
                            <Text style={[styles.text, styles.report]} category='h6'>Reporter</Text>
                        </View>
                    </View>
                    <View style={styles.startContainer}>
                        <Ionicons style={styles.startIcon} name="md-play" size={24} color="black" />
                        <Text appearance='alternative' style={[styles.text, styles.start]} category='h6'>Commencer</Text>
                    </View>
                </View>
                :
                null}
        </Card >
    )
}
const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: "blue",
        borderRadius: 8,
        marginBottom: 7,
        borderWidth: 0
    },
    smallCard: background => ({
        flex: 1,
        backgroundColor: background,
        margin: 2,
        padding: 9,
        borderRadius: 8
    }),
    headerContain: {
        padding: 12
    },
    cardContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    room: {
        display: "flex",
        flexDirection: "row"
    },
    roomIcon: {
        marginRight: 4
    },
    cardopen: {
        marginTop: 14,
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    report: {
        color: '#FF8139',
        textAlign: 'center',
    },
    startContainer: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'center',
        backgroundColor: "#FF8139",
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 40,
        color: 'white',
        flex: 1
    },
    reportContainer: {
        flex: 1,
        alignItems: "center",
    },
    start: {
        color: "white",
        textAlign: 'center',
    },
    startIcon: {
        color: 'white',
        marginRight: 12
    },
    borderLine: {
        borderBottomWidth: 1,
        textAlign: 'center',
        borderBottomColor: "#FF8139",
        width: 70
    }
})

export default HostCard
