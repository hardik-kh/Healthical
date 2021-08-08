import React, { useEffect, useState } from "react";
import { Text, View, Image, ScrollView, FlatList, ActivityIndicator } from "react-native";
import axios from "axios";
import { Height, Width } from "../Utils/Utils";
import { HtmlText } from "@e-mine/react-native-html-text";

export default function FoodDetails({ navigation, route }) {

    // const image = navigation.getParam('image');
    // const desc = navigation.getParam('desc');
    // const name = navigation.getParam('name');


    const { id, name, image } = route.params;
    const [instructions, setInstructions] = useState("");

    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        axios.get("https://api.spoonacular.com/recipes/" + id + "/information?apiKey=5ce671523f81422ab2ab22434d7c5236&includeNutrition=false")
            .then(res => {
                setInstructions(res.data.instructions)
            }).catch(() => {
                showNotification("Error Occurred")
            }).finally(() => {
                setLoading(false)
            })

    }, [])



    return (
        isLoading ?
            <View style={{ flex: 1, backgroundColor: "white", justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size={"large"} color={"#5ca0ff"} />
            </View>
            :
            <ScrollView

                style={{ backgroundColor: '#ffffff' }}
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: "center",
                    backgroundColor: '#ffffff'
                }}>
                    <Image source={{ uri: image }}
                        style={{ width: Width - 20, height: Height / 3, resizeMode: "contain", marginTop: "5%" }} />
                    <Text style={{
                        fontWeight: 'bold',
                        color: '#263a6c',
                        fontSize: 28,

                    }}>Instructions</Text>
                    <View
                        style={{ marginTop: 10, flex: 1, backgroundColor: "#ffffff", padding: "2.4%" }}>
                        <Text style={{ fontSize: 22, textAlign: 'left', fontWeight: 'bold', marginBottom: 10 }}>To make {name}</Text>

                        <HtmlText style={{ fontSize: 18, color: '#263a6c', fontWeight: 'bold' }}>
                            {instructions}
                        </HtmlText>


                    </View>
                </View>



            </ScrollView>








    )

}