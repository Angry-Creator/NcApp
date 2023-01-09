import { ActivityIndicator, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";
import appColors from "../config/appColors";

export default function WatchTrailer({ route }) {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <WebView style={styles.container} originWhitelist={["*"]} source={{ uri: route.params.movie_trailer }} renderLoading={() => <View style={styles.activityIndicatorStyle}><ActivityIndicator size="large" color="white" /></View>} startInLoadingState={true} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: appColors.primary,
    },
    activityIndicatorStyle: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
    }
})