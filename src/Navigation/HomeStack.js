import * as React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../Screens/Home'
import Icon from '@expo/vector-icons/MaterialIcons';
import * as firebase from 'firebase';
import ChatBot from "../Screens/ChatBot";
import BMICalculator from "../Screens/BMICalculator";
import DietList from "../Screens/DietList";
import FoodDetail from "../Screens/FoodDetail";



const Stack = createStackNavigator()

export default function HomeStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerTintColor: "#eaf1f9",
                    headerStyle: {
                        backgroundColor: "#5ca0ff"
                    }
                }}
            >
                <Stack.Screen name="Home" component={Home}
                    options={{
                        headerRight: () => (

                            <TouchableOpacity

                                onPress={async () => {

                                    try {
                                        await firebase.auth().signOut()
                                    } catch (e) {
                                        console.error(e)
                                    }

                                }}
                            >
                                <Icon
                                    name="logout"
                                    color={"#eaf1f9"}
                                    size={30}
                                    style={{ marginRight: 20 }}
                                />

                            </TouchableOpacity>

                        )
                    }}
                />
                <Stack.Screen name="ChatBot" component={ChatBot}
                    options={{ headerTitle: "Healthical Bot" }}
                />
                <Stack.Screen name="BMICalculator" component={BMICalculator}
                    options={{ headerTitle: "BMI Calculator" }}
                />
                <Stack.Screen name="DietList" component={DietList}
                    options={{ headerTitle: "Diet List" }}
                />
                <Stack.Screen name="FoodDetail" component={FoodDetail}
                    options={{ headerTitle: "Recipe " }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}