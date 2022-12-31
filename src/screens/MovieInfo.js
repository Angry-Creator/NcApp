import { Platform, StyleSheet, View, Text } from "react-native";

export default function MovieInfo({ navigation, route }) {
    
    return (
        <View style={styles.container}>
            <Text>Hello</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS == "android" ? 20 : 0,
    },
})