import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export default function GradientButton({ text, onPress, customWidth = 200,  customHeight = 40, customBorderRadius = 45}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <LinearGradient style={[styles.buttonWrapper, {width: customWidth, height: customHeight, borderRadius: customBorderRadius}]} start={[0, 0]} end={[1, 0]} locations={[0.3, 0.7]} colors={['rgba(25, 161, 190, 0.6)', 'rgba(125, 65, 146, 0.6)']}>
                <View style={[styles.button,{width: (customWidth - 5), height: (customHeight - 5), borderRadius: (customBorderRadius - 5)}]}>
                    <Text style={{ color: "white" }}>{text}</Text>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonWrapper: {
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        marginTop: 0,
        backgroundColor: "#18181B",
        justifyContent: "center",
        alignItems: "center",
    },
});