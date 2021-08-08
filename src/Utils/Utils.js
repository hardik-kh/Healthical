import { Dimensions, ToastAndroid } from "react-native";

export const Width = Dimensions.get("screen").width
export const Height = Dimensions.get("screen").height
export const showNotification = (str) => {
    if (Platform.OS == "android") {
        ToastAndroid.show(str, ToastAndroid.LONG);
    }
    if (Platform.OS == "ios") {
        Alert.alert(str);
    }
}
