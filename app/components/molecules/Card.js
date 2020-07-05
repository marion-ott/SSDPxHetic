import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Card, Text, Popover, Layout, Button } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';

import OpenURLButton from "./OpenURLButton"

const HostCard = ({ backgroundColor }) => {
    const [actions, setActions] = useState(false)
    const [options, setOptions] = useState(false)

    const displayStartOrReport = () => {
        setActions(!actions)
    }

    const renderToggleButton = () => (
        <TouchableOpacity onPress={() => setOptions(true)} activeOpacity={0.7} style={styles.moreIcon} >
            <Ionicons name="md-more" size={24} color="black" />
        </TouchableOpacity>
    );

    const Header = (props) => {
        return (
            <View {...props}>
                <View style={styles.cardContainer}>
                    <Text style={styles.text} category='h6'>Hilton Gare d’Austerlitz</Text>
                    <Popover
                        visible={options}
                        anchor={renderToggleButton}
                        onBackdropPress={() => setOptions(false)}>
                        <Layout style={styles.content}>
                            <TouchableOpacity activeOpacity={0.7} style={styles.touchableButton} >
                                <Text style={styles.TextStyle}>Itinéraire</Text>
                            </TouchableOpacity>
                            <View style={styles.callButton}>
                                <OpenURLButton url={'tel:${0652033775}'}>Appeler</OpenURLButton>
                            </View>
                        </Layout>
                    </Popover>
                </View>
            </View>
        )
    }
    return (
        <Card onPress={() => displayStartOrReport()} style={[styles.card, { backgroundColor }]} header={Header}>
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
            {actions ?
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
    touchableButton: {
        marginHorizontal: 10,
        paddingVertical: 5,
        // backgroundColor: "#D1BEB0"
    },
    callButton: {
        marginHorizontal: 10,
        paddingVertical: 5,
        // backgroundColor: "#F8BD7F"
    },
    moreIcon: {
        // backgroundColor: "blue",
        width: 30,
        alignItems: 'center',
        marginLeft: 134
    },
    container: {
        maxHeight: 180,
    },
    listview: {
        // width: 85,
        padding: 10
    },
    content: {
        // backgroundColor: "#DDDBF1",
        paddingLeft: 7,
        paddingVertical: 7,
        borderBottomRightRadius: 3,
        borderTopRightRadius: 3,
        borderBottomLeftRadius: 3,
        borderTopLeftRadius: 3,
    },
    card: {
        flex: 1,
        backgroundColor: "blue",
        borderRadius: 8,
        marginBottom: 7,
        borderWidth: 0
    },
    moreIconContainer: {
        // backgroundColor: 'green',
    },
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
