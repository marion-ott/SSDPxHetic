import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Input } from '@ui-kitten/components';

export default function ProfileScreen() {
    const [value, setValue] = React.useState({
        firstname: "",
        lastname: "",
        mail: "",
        phone: ""
    });

    function onChangeProfile(val, name) {
        setValue({
            ...value,
            [name]: val
        });
    }

    return (
        <View style={styles.container}>
            <Text style={[styles.text, styles.title]} category='h2'>Nicolas Bertaux</Text>
            <View style={styles.form}>
                <View style={styles.inputs}>
                    <Text style={[styles.text, styles.labelInput]} category='s1'>Prénom</Text>
                    <Input
                        placeholder='Nicolas'
                        value={value}
                        onChangeText={evt => onChangeProfile(evt, "firstname")}
                    />
                </View>
                <View style={styles.inputs}>
                    <Text style={[styles.text, styles.labelInput]} category='s1'>Nom</Text>
                    <Input
                        placeholder='Bertaux'
                        value={value}
                        onChangeText={evt => onChangeProfile(evt, "lastname")}
                    />
                </View>
                <View style={styles.inputs}>
                    <Text style={[styles.text, styles.labelInput]} category='s1'>Email</Text>
                    <Input
                        placeholder='nicolas.berteaux@gmail.com'
                        value={value}
                        onChangeText={evt => onChangeProfile(evt, "mail")}
                    />
                </View>
                <View style={styles.inputs}>
                    <Text style={[styles.text, styles.labelInput]} category='s1'>Téléphone</Text>
                    <Input
                        placeholder='0634239100'
                        value={value}
                        onChangeText={evt => onChangeProfile(evt, "phone")}
                    />
                </View>
            </View>
        </View>
    );
}

ProfileScreen.navigationOptions = {

};

const styles = StyleSheet.create({
    title: {
        paddingTop: 28,
        paddingBottom: 28,
        paddingLeft: 15,
        backgroundColor: "white"
    },
    form: {
        padding: 14
    },
    inputs: {
        padding: 7
    },
    labelInput: {
        paddingBottom: 7
    }
});
