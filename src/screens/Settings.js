import { View, StyleSheet, Text } from "react-native";
import appColors from "../config/appColors";

export default function Settings(){
    return(
        <View style={styles.container}>
            <Text style={styles.testText}>Settings Page</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: appColors.primary,
        justifyContent: "center",
        alignItems: "center",
    },
    testText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
    }
})