import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export default function GradientButton({ text, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <LinearGradient style={styles.buttonWrapper} start={[0, 0]} end={[1, 0]} locations={[0.3, 0.7]} colors={['rgba(25, 161, 190, 0.6)', 'rgba(125, 65, 146, 0.6)']}>
                <View style={styles.button}>
                    <Text style={{ color: "white" }}>{text}</Text>
                </View>
            </LinearGradient>
            <View style={styles.leftGradientShadow}></View>
            <View style={styles.rightGradientShadow}></View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonWrapper: {
        width: 200,
        height: 40,
        marginTop: 20,
        borderRadius: 45,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        width: 195,
        height: 35,
        marginTop: 0,
        backgroundColor: "#18181B",
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    leftGradientShadow: {
        position: "relative",
        left: 0,
        bottom: 150,
        width: 100,
        height: 100,
        elevation: 75,
        backgroundColor: "hsla(0, 10%, 90%, 0)",
        shadowColor: "#19A1BE",
        shadowOpacity: 30,
        shadowOffset: {width: 200, height: 200},
        shadowRadius: 30,
    },
    rightGradientShadow: {
        position: "relative",
        left: 100,
        bottom: 250,
        width: 100,
        height: 100,
        elevation: 70,
        backgroundColor: "hsla(0, 10%, 90%, 0)",
        shadowColor: "#7D4192",
        shadowOpacity: 30,
        shadowOffset: {width: 200, height: 200},
        shadowRadius: 30,
    }
});