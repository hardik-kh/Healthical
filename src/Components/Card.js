import React, { useContext } from 'react'
import { View, StyleSheet, Text, Pressable, TextInput, Image } from 'react-native'
import { Height, Width } from "../Utils/Utils";

export function Card(props) {
    const { labelText, placeholder, onChangeText, value, onPress, ...extraProps } = props;

    return (
        <Pressable style={{
            width: Width - 80, height: Height / 3, backgroundColor: "#ffff",
            marginVertical: "4%", borderRadius: 10, elevation: 2, justifyContent: "center",
            alignItems: "center", marginTop: "5%"
        }}
            onPress={onPress}
        >
            <Image
                style={{ width: "90%", height: "70%", resizeMode: "contain" }}
                {...extraProps}
            />
            <Text style={{
                fontWeight: '500',
                color: '#263a6c',
                fontSize: 24,

            }}>{labelText}</Text>
        </Pressable>
    )
}

