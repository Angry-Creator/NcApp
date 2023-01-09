import { StyleSheet, Text } from "react-native";
import appColors from "../config/appColors";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings(){
    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.testText}>Settings Page</Text>
        </SafeAreaView>
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