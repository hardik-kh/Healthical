import React, { useContext } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native'
import { Height, Width } from "../Utils/Utils";

export function Input(props) {
    const { labelText, placeholder, onChangeText, value, ...extraProps } = props;

    return (
        <View style={{ marginVertical: "2%" }}>
            <Text style={{ marginBottom: "3.2%", fontSize: 16, color: "#263a6c" }}>
                {labelText}
            </Text>
            <TextInput
                style={{ width: Width - 40, height: 50, borderRadius: 10, paddingLeft: "2.8%", backgroundColor: "#fff" }}
                placeholder={placeholder}
                onChangeText={onChangeText}
                {...extraProps}




            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffe2ff'
    },
    title: {
        marginTop: 20,
        marginBottom: 30,
        fontSize: 28,
        fontWeight: '500',
        color: '#7f78d2'
    },
    button: {
        flexDirection: 'row',
        borderRadius: 30,
        marginTop: 10,
        marginBottom: 10,
        width: 160,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#481380'
    },
    buttonText: {
        color: '#ffe2ff',
        fontSize: 24,
        marginRight: 5
    }
})