import React, { useContext } from 'react'
import { View, StyleSheet, Text, Pressable, TextInput, Image } from 'react-native'
import { Height, Width } from "../Utils/Utils";

export function CardContent(props) {
    const { Title, Content } = props;
    return (
        <View style={{ flexDirection: 'row', marginVertical: "1.5%" }}>
            <Text style={{
                fontSize: 14,
                fontWeight: "bold"
            }}>
                {Title}
            </Text>
            <Text style={{
                fontSize: 14, marginLeft: "2%",
                flex: 1
            }}>
                {Content}
            </Text>
        </View>

    )
}

export function FoodCard(props) {
    const { foodName, fatVal, ProteinVal, CarbsVal, imageSource, onPress } = props

    return (
        <Pressable style={styles.card}
            onPress={onPress}

        >
            <View style={{ flex: 1, flexDirection: 'row', alignContent: "center" }}>

                <View style={{ paddingLeft: "2.2%", paddingTop: "1%" }}>
                    <Image
                        source={{ uri: imageSource }}
                        resizeMode="contain"
                        style={{ height: Height / 8, width: Width / 3, resizeMode: "cover", borderWidth: 1, borderColor: "#ddd" }}
                    />

                </View>
                <View style={{ flex: 2, marginLeft: "5%", marginTop: "2%" }}>
                    <CardContent
                        Title="Name :"
                        Content={foodName}
                    />
                    <CardContent
                        Title="Fat :"
                        Content={fatVal}
                    />
                    <CardContent
                        Title="Protein :"
                        Content={ProteinVal}
                    />
                    <CardContent
                        Title="Carbs :"
                        Content={CarbsVal}
                    />

                </View>



            </View>
            <Text style={{ alignSelf: "flex-end", fontSize: 10, paddingRight: "1%", color: "grey", marginTop: "2%", marginBottom: -10 }}>
                CLICK ON CARD TO VIEW MORE DETAILS
            </Text>


        </Pressable>

    )
}


const styles = StyleSheet.create({
    card: {
        backgroundColor: "#ffffff",
        width: Width - 10,
        height: "auto",
        elevation: 4,
        borderRadius: 8,
        padding: "4%",
        paddingLeft: "3.2%",
        paddingRight: "2%",
        alignSelf: 'center'
    },
});