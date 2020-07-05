import React, { useCallback } from "react";
import { Alert, Linking, TouchableOpacity, Text } from "react-native";

const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this ${url}`);
        }
    }, [url]);

    return <TouchableOpacity activeOpacity={0.7} onPress={handlePress} ><Text>{children}</Text></TouchableOpacity>;
};

export default OpenURLButton