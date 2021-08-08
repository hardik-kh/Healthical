import React, { useContext } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Card } from "../Components/Card";
import { AuthContext } from '../Context/Context'

export default function Home({ navigation }) {
    const user = useContext(AuthContext);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome </Text>
            <Text style={{
                fontWeight: '500',
                color: '#263a6c',
                fontSize: 18,
                marginBottom: "2%",
                marginLeft: "10.5%"
            }}>{user.email}</Text>
            <View style={{

                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#eaf3fa',

            }}>


                <Card
                    source={require("../Images/BMI.jpg")}
                    labelText="Calculate BMI"
                    onPress={() => {
                        navigation.navigate("BMICalculator")

                    }}

                />
                <Card
                    source={require("../Images/Chatbot.png")}
                    labelText="Chat"
                    onPress={() => {
                        navigation.navigate("ChatBot")
                    }}
                />


            </View>

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#eaf3fa'

    },
    title: {
        marginTop: 0,
        marginBottom: 5,
        fontSize: 30,
        fontWeight: '500',
        color: '#263a6c',
        marginLeft: "10%"
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
        color: '#eaf3fa',
        fontSize: 24,
        marginRight: 5
    }
})