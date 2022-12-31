import { useState } from "react";
import { StyleSheet, View, Text, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import appColors from "../config/appColors";


export default function MovieCard({ item }) {
    const [loading, setLoading] = useState(true);
    return (
        <TouchableOpacity style={styles.movie_container}>
            {(loading == true) &&
                <View style={styles.activityIndicator}>
                    <ActivityIndicator size="large" color="white" />
                </View>
            }
            {(item.image != undefined) &&
                <View style={styles.imageContainer}>
                    <Image source={{ uri: item.image }} onLoadEnd={() => setLoading(false)} style={styles.image} resizeMode="cover" />
                </View>}

            {((item.title != undefined) && (loading == false)) &&
                <Text numberOfLines={2} style={styles.movieTitle}>{item.title}</Text>
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    movie_container: {
        alignItems: "center",
        height: 140,
        width: 120,
        backgroundColor: appColors.transparent,
        borderRadius: 10,
        overflow: "hidden"
        // borderBottomStartRadius: 10,
        // borderBottomEndRadius: 10,
    },
    activityIndicator:{
        position: "relative",
        top: 80,
    },
    imageContainer: {
        borderBottomStartRadius: 10,
        borderBottomEndRadius: 10,
        width: "100%",
        height: 100,
        overflow: "hidden"
    },
    image: {
        width: "100%",
        height: "100%",
    },
    movieTitle: {
        fontSize: 14,
        fontWeight: "300",
        textAlign: "center",
    }
})