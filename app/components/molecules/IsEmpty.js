import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { Text } from '@ui-kitten/components'
import notif from '../../assets/images/icon_notif.png'

const IsEmpty = () => {
    return (
        <View style={styles.container}>
            <Image style={styles.picto} source={notif} />
            <Text style={styles.text} category='h5'>
                Cet élément est vide.
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: "auto",
        flexDirection: 'column',
    },
    text: {
        color: '#241F1F',
        opacity: 0.5,
        width: 200,
        marginTop: 20,
        textAlign: 'center'
    },
    picto: {
        textAlign: 'center'
    }
})

export default IsEmpty
