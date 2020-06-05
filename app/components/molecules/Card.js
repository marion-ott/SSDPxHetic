import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text } from '@ui-kitten/components';

const HostCard = ({ backgroundColor, type, label, sublabel }) => {
    if (type === "small") {
        return (
            <View style={styles.smallCard(backgroundColor)}>
                <Text style={styles.text} appearance='hint'>{label}</Text>
                <Text>{sublabel}</Text>
            </View>
        )
    }
    return (
        <Card style={styles.card(backgroundColor)}>
            <Text style={styles.text} appearance='hint'>Horaires</Text>
            <Text>8h30 - 16h30</Text>
        </Card>
    )
}
const styles = StyleSheet.create({
    card: background => ({
        flex: 1,
        backgroundColor: background,
        padding: 2
    }),
    smallCard: background => ({
        flex: 1,
        backgroundColor: background,
        margin: 2,
        padding: 14,
        borderRadius: 8
    })
})

export default HostCard
