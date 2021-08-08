import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { Dialogflow_V2 } from 'react-native-dialogflow';
import { dialogflowConfig } from '../Config/chatBotconfig';


export default function Chatbot() {
    const BOT_USER = {
        _id: 2,
        name: 'Healthical Bot',
        avatar: require("../Images/chatbotavatar.png")

    };
    const [messages, setMessages] = useState([{
        _id: 1,
        text: `Hi! I am the Healthical bot.\n\nHow may I help you with today?`,
        createdAt: new Date(),
        user: BOT_USER
    }])

    useEffect(() => {
        Dialogflow_V2.setConfiguration(
            dialogflowConfig.client_email,
            dialogflowConfig.private_key,
            Dialogflow_V2.LANG_ENGLISH_US,
            dialogflowConfig.project_id
        )
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousState => GiftedChat.append(previousState, messages));

        let message = messages[0].text;
        requestQuery(message)
    }, [])
    function requestQuery(message) {
        Dialogflow_V2.requestQuery(
            message,
            result => {
                let text = result.queryResult.fulfillmentMessages[0].text.text[0];
                let msg = {
                    _id: result.responseId,
                    text,
                    createdAt: new Date(),
                    user: BOT_USER
                };

                setMessages(previousState => GiftedChat.append(previousState, [msg]));
            },
            error => console.log("Error", error)
        );
    }
    function renderBubble(props) {
        return (
            <Bubble
                {...props}
                textStyle={{
                    right: {
                        color: 'black'
                    }
                }}
                wrapperStyle={{
                    left: {
                        backgroundColor: "#ffffff"
                    },
                    right: {
                        backgroundColor: "#ffffff"
                    }
                }}
                timeTextStyle={{

                    right: { color: '#b0b0b0' },

                }}

            />
        )
    }


    return (
        <View style={{ flex: 1, backgroundColor: '#eaf3fa' }}>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1
                }}
                renderBubble={renderBubble}
            />
        </View>
    );

}