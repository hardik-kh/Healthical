import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native'
import * as firebase from 'firebase';
import { Input } from "../Components/Input";
import { Height, Width, showNotification } from '../Utils/Utils';

export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setLoading] = useState(false);
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    function signIn() {
        {
            if (email === "" || password === "") {
                showNotification("Please fill the details properly")
                return
            }
            setLoading(true)

            if (validateEmail(email) && password) {
                firebase.auth().signInWithEmailAndPassword(email, password).then(res => {

                }).catch((err) => {
                    console.log(err)
                    if (err == "Error: [auth/user-not-found] There is no user record corresponding to this identifier. The user may have been deleted.") {
                        showNotification("User not found")
                    } else if (err = "Error: [auth/wrong-password] The password is invalid or the user does not have a password.") {
                        showNotification("Invalid Password")
                    } else {
                        showNotification("Sorry, Something went wrong")
                    }
                }).finally(() => {
                    setLoading(false)
                })

            } else {
                showNotification("Invalid Credentials, please re-check email id and password")
                setLoading(false)
            }

        }
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

                <Image
                    style={{ width: Width, height: Height / 3.5, resizeMode: "contain", marginVertical: "10%" }}
                    source={require("../Images/LandingPage.png")}
                />


                <Input
                    labelText="Email-id"
                    placeholder="Enter your email-id"
                    value={email}
                    onChangeText={(txt) => {
                        setEmail(txt)
                    }}
                    autoCapitalize={"none"}
                    keyboardType={"email-address"}

                />
                <Input
                    labelText="Password"
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={(txt) => {
                        setPassword(txt)
                    }}
                    autoCapitalize={"none"}
                    secureTextEntry={true}
                />
                <TouchableOpacity

                    onPress={() => {
                        navigation.navigate("SignUp")
                    }}
                >
                    <Text style={{
                        color: "#263a6c",
                        fontSize: 14,
                        marginVertical: "5%",
                        textDecorationLine: "underline"
                    }}>Don't have an account? Register now. </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={signIn}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingBottom: "5%"
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