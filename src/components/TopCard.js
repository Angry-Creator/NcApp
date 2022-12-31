import { useState } from "react";
import { StyleSheet, TouchableOpacity, ActivityIndicator, ImageBackground, Text, View } from "react-native";
import appColors from "../config/appColors";

export default function TopCard({ data, onPressAction }) {
    const [loading, setLoading] = useState(true);

    return (
        <TouchableOpacity style={styles.container} onPress={onPressAction} >
            {(loading == true) &&
                <ActivityIndicator size="large" color="white" />
            }

            <ImageBackground source={{ uri: data.image }} onLoadStart={() => setLoading(true)} onLoadEnd={() => setLoading(false)} style={styles.topCard} resizeMode="cover">
                <View style={styles.movieView}>
                    {(data.title != undefined) &&
                        <Text style={styles.movieTitle} numberOfLines={1}>{data.title}</Text>
                    }
                    {(data.additional_data.Genre != undefined) &&
                        <Text style={styles.genreText} numberOfLines={1}>Genre: {data.additional_data.Genre}</Text>
                    }
                </View>
            </ImageBackground>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20,
        width: "100%",
        height: 280,
    },
    topCard: {
        width: "100%",
        height: "100%",
        justifyContent: "flex-end",
    },
    movieView: {
        paddingVertical: 20,
        paddingHorizontal: 15,
        backgroundColor: appColors.transparent,
    },
    movieTitle: {
        fontWeight: "500",
        fontSize: 18,
    },
    genreText: {
        fontWeight: "300",
        fontSize: 16,
    }
})