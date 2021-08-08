import React, { useContext, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Image, Pressable, ActivityIndicator } from 'react-native'
import { Input } from "../Components/Input";
import { Width, Height, showNotification } from "../Utils/Utils";
import * as Linking from "expo-linking";


export default function BMICalculator({ navigation }) {

    const [mass, setMass] = useState("");
    const [heightincm, setHeightinCM] = useState("");
    const [BMI, setBMI] = useState("");
    const [BMIVal, setBMIVal] = useState("");

    const [colorVal, setColorVal] = useState("#eaf3fa");

    const [isLoading, setLoading] = useState(false);
    function CalculateBMI() {
        if (mass === "" || heightincm === "") {
            showNotification("Please fill the details properly")
            return
        }
        setLoading(true)
        let BMI_val = 0;
        BMI_val = mass * 10000 / (heightincm * heightincm)
        setBMIVal(BMI_val)
        if (BMI_val < 18.5) {
            setBMI("Under Weight")
            setColorVal("#fee400")
        } else if (BMI_val >= 18.5 && BMI_val <= 24.9) {
            setBMI("Healthy")
            setColorVal("#018137")

        } else if (BMI_val >= 25 && BMI_val <= 29.9) {
            setBMI("Over Weight")
            setColorVal("#ffe400")

        } else {
            setBMI("Obese")
            setColorVal("#b90707")

        }
        setLoading(false)

    }
    function Card(props) {
        const { labelText, placeholder, onChangeText, value, onPress, ...extraProps } = props;

        return (
            <Pressable style={{
                width: Width / 2 - 20, height: Height / 4, backgroundColor: "#ffff",
                marginVertical: "4%", borderRadius: 10, elevation: 2, justifyContent: "center",
                alignItems: "center", marginTop: "5%", marginHorizontal: "2%"
            }}
                onPress={onPress}
            >
                <Image

                    {...extraProps}
                />
                <Text style={{
                    fontWeight: '500',
                    color: '#263a6c',
                    fontSize: 20,

                }}>{labelText}</Text>
            </Pressable>
        )
    }
    function DietView(params) {
        return (
            <View style={{ flexDirection: "row" }}>
                <Card
                    source={require("../Images/Diet.jpg")}
                    labelText="Diet Plan"
                    onPress={() => {

                        navigation.navigate("DietList", { BMI: BMIVal })

                    }}
                    style={{ width: "98%", height: "70%", resizeMode: "contain" }}

                />
                <Card
                    source={require("../Images/Youtube.png")}
                    labelText="Watch a video"
                    onPress={() => {

                        if (BMIVal < 18.5) {
                            Linking.openURL("https://youtube.com/playlist?list=PLmTVoL6WRflnOVYfGeVyjFr3cC9bAy9K6")

                        } else if (BMIVal >= 18.5 && BMIVal <= 24.9) {

                            Linking.openURL("https://youtube.com/playlist?list=PLmTVoL6WRflkNT3OiQpgy0o5g3LwjbRoO")
                        } else {
                            Linking.openURL("https://youtube.com/playlist?list=PLmTVoL6WRfll1BTzJ7_4W5rUhZF6Zjtjc")

                            //High BMI
                        }

                    }}
                    style={{ width: "64%", height: "70%", resizeMode: "contain" }}

                />


            </View>
        )
    }

    return (
        isLoading ?
            <View style={{ flex: 1, backgroundColor: "white", justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size={"large"} color={"#5ca0ff"} />
            </View>
            :
            <ScrollView
                style={{ backgroundColor: '#eaf3fa' }}
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
            >
                <Input
                    labelText="Weight in Kg"
                    placeholder="Enter your Weight"
                    value={mass}
                    onChangeText={(txt) => {
                        setMass(txt)
                        if (txt === "") {
                            setBMI("")
                        }
                    }}
                    autoCapitalize={"none"}
                    keyboardType={"decimal-pad"}
                />
                <Input
                    labelText="Height in Cm"
                    placeholder="Enter your Height"
                    value={heightincm}
                    onChangeText={(txt) => {
                        setHeightinCM(txt)
                        if (txt === "") {
                            setBMI("")
                        }
                    }}
                    autoCapitalize={"none"}
                    keyboardType={"decimal-pad"}
                />
                <Text
                    style={{
                        color: colorVal, fontSize: 24, fontWeight: "bold",
                        backgroundColor: "#ffffff", padding: BMI === "" ? 0 : "5%", borderRadius: 10, marginTop: "5%"
                    }}
                >{BMI}</Text>

                {BMI === "" ?
                    null :
                    <DietView />


                }
                <TouchableOpacity
                    style={styles.button}
                    onPress={CalculateBMI}
                >
                    <Text style={styles.buttonText}>Calculate</Text>
                </TouchableOpacity>
            </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingBottom: "5%",
        paddingTop: "5%"
    },
    title: {
        marginTop: "18%",
        marginBottom: "24%",
        fontSize: 28,
        fontWeight: '500',
        color: '#263a6c'
    },
    button: {
        flexDirection: 'row',
        width: Width - 100,
        height: Height / 15,
        borderRadius: 50,
        marginTop: "5%",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5ca0ff'
    },
    buttonText: {
        color: '#eaf1f9',
        fontSize: 24,
        marginRight: 5

    }
})