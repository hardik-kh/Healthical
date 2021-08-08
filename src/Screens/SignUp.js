import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native'
import * as firebase from 'firebase';
import { Input } from "../Components/Input";
import { Height, Width, showNotification } from '../Utils/Utils';

export default function SignUp({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cnfPassword, setCnfPassword] = useState("");
    const [isLoading, setLoading] = useState(false);
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    function checkPassword(pwd) {
        var re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        return re.test(pwd);
    }
    function SignUp() {
        if (email === "" || password === "" | cnfPassword === "") {
            showNotification("Please fill the details properly")
            return
        }
        if (!checkPassword(password)) {
            showNotification("Select a Strong Password")
            return

        } else
            if (password == cnfPassword && password.length > 8) {
                setLoading(true);

                firebase.auth().createUserWithEmailAndPassword(email, password).then(user => {
                    showNotification("Account Created Successfully")
                }).catch(() => {

                    showNotification("Error occurred")
                }).finally(() => {

                    setLoading(false)
                })

            } else {
                if (password.length < 8) {
                    showNotification("Password must contain atleast 8 characters")
                } else
                    if (password != cnfPassword)
                        showNotification("Passwords do not match")
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
                <Input
                    labelText="Confirm Password"
                    placeholder="Re-enter your password"
                    value={password}
                    onChangeText={(txt) => {
                        setCnfPassword(txt)
                    }}
                    autoCapitalize={"none"}
                    secureTextEntry={true}
                />


                <TouchableOpacity
                    style={styles.button}
                    onPress={SignUp}
                >
                    <Text style={styles.buttonText}>SignUp</Text>
                </TouchableOpacity>

                <View style={{ alignItems: "flex-start", marginLeft: "0%", marginTop: "1%" }}>
                    <Text style={{ fontSize: 16, marginTop: "20%", marginBottom: "4%" }} >
                        Password Criteria
                    </Text>
                    <Text style={{ fontSize: 12, textAlign: "center", marginBottom: "4%" }} >
                        ⬤ At least one upper case English letter
                    </Text>
                    <Text style={{ fontSize: 12, textAlign: "center", marginBottom: "4%" }} >
                        ⬤ At least one lower case English letter
                    </Text>
                    <Text style={{ fontSize: 12, textAlign: "center", marginBottom: "4%" }} >
                        ⬤ At least one digit
                    </Text>
                    <Text style={{ fontSize: 12, textAlign: "center", marginBottom: "4%" }} >
                        ⬤ At least one special character
                    </Text>
                    <Text style={{ fontSize: 12, textAlign: "center", marginBottom: "4%" }} >
                        ⬤ must contain atleast 8 characters
                    </Text>
                </View>
            </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingBottom: "5%",
        marginTop: "15%"
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