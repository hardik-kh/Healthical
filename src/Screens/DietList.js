import React, { useState, useEffect } from "react";
import { Text, View, Image, ScrollView, FlatList, Button, TouchableOpacity, Dimensions, ActivityIndicator } from "react-native";
import axios from 'axios';
import { FoodCard } from "../Components/FoodCard";
import { showNotification } from "../Utils/Utils";

export default function Diet({ navigation, route }) {
    const { BMI } = route.params;
    const [recipe, setrecipe] = useState('');
    const [isLoading, setLoading] = useState(true);


    useEffect(() => {

        let api_url = null;
        if (BMI < 18.5) {
            api_url = "https://api.spoonacular.com/recipes/findByNutrients?apiKey=5eea77c2389843fb9f350f1988193b27&minCarbs=40"
        } else if (BMI >= 18.5 && BMI <= 24.9) {
            api_url = "https://api.spoonacular.com/recipes/findByNutrients?apiKey=5eea77c2389843fb9f350f1988193b27&minProtein=50"

        } else {
            api_url = "https://api.spoonacular.com/recipes/findByNutrients?apiKey=5eea77c2389843fb9f350f1988193b27&maxFat=40"
            //High BMI
        }

        axios.get(api_url)
            .then(info => {
                setrecipe(info.data)
            }).catch(() => {
                showNotification("Error Occurred")
            }).finally(() => {
                setLoading(false)
            })

    }, [])


    const renderItemFunc = ({ item }) => (

        <View style={{ flex: 1, paddingBottom: 10, justifyContent: 'center', marginTop: 10 }}>
            <FoodCard
                foodName={item.title}
                fatVal={item.fat}
                ProteinVal={item.protein}
                CarbsVal={item.carbs}
                imageSource={item.image}
                onPress={() => {
                    navigation.navigate("FoodDetail", { id: item.id, name: item.title, image: item.image })
                }}

            />
        </View>

    );


    return (
        isLoading ?
            <View style={{ flex: 1, backgroundColor: "white", justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size={"large"} color={"#5ca0ff"} />
            </View>
            :
            <View style={{
                flex: 1,
                justifyContent: 'center',
                backgroundColor: '#eaf3fa'
            }}>

                <FlatList
                    data={recipe}
                    renderItem={renderItemFunc}
                    keyExtractor={item => item.title}
                />

            </View>


    );

}