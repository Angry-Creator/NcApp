import { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, ActivityIndicator, TouchableOpacity, Image, ScrollView, Dimensions, StatusBar } from "react-native";
import GradientButton from "../components/GradientButton";
import appColors from "../config/appColors";
import { Video, VideoFullscreenUpdate } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MovieInfo({ navigation, route }) {
    let data = route.params.movie_data;
    const video = useRef();
    const [deviceWidth, setDeviceWidth] = useState(Dimensions.get("window").width);
    const [deviceHeight, setDeviceHeight] = useState(Dimensions.get("window").height);
    const landscapeHeight = ((deviceHeight / 2) - 50);
    const [videoWidth, setVideoWidth] = useState(deviceWidth);
    const [videoHeight, setVideoHeight] = useState(landscapeHeight);
    const topBoxStyle = { width: deviceWidth, height: (deviceHeight / 2) - 50 };
    const bottomBoxStyle = { width: deviceWidth, height: (deviceHeight / 2) + 50 + StatusBar.currentHeight };
    const [orientationIsLandscape, setOrientation] = useState(false);
    const [status, setStatus] = useState({
        positionMillis: 0,
        playableDurationMillis: 0,
        progressUpdateIntervalMillis: 1000,
    });
    const initialOrientation = useRef(true);
    const [loading, setLoading] = useState(true);
    const [playVideo, setPlayVideo] = useState(false);
    const [videoBufferLoader, setVideoBufferLoader] = useState(videoHeight / 2);
    const [loadingVideo, setLoadingVideo] = useState(true);

    async function changeScreenOrientation() {
        if (orientationIsLandscape) {
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
        } else if (orientationIsLandscape == false) {
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
        }
    }
    const dateFormatter = (date) => {
        let [year, month, day] = date.split('-');
        let dateFormat = { "01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr", "05": "May", "06": "Jun", "07": "Jul", "08": "Aug", "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dec" }
        return `${day} ${dateFormat[month]}, ${year}`;
    }

    useEffect(() => {
        if (initialOrientation.current) {
            initialOrientation.current = false;
        }
        else {
            changeScreenOrientation();
        }
    }, [orientationIsLandscape]);

    useEffect(() => {
        setVideoBufferLoader(videoHeight / 2);
    }, [videoHeight]);

    return (
        <SafeAreaView style={styles.videoContainer} edges={["bottom"]}>
            {(loadingVideo && playVideo) && <View style={{ position: "absolute", top: videoBufferLoader, backgroundColor: 'transparent', height: 50, width: "100%", justifyContent: "center", zIndex: 1 }}>
                <ActivityIndicator size="large" color="white" />
            </View>}

            {/* Movie Image */}
            {(playVideo == false) && <TouchableOpacity style={[styles.posterContainer, topBoxStyle]}>
                {(loading == true) &&
                    <ActivityIndicator size="large" color="white" />
                }
                <View style={styles.imageContainer}>
                    <Image source={{ uri: data.image }} onLoadEnd={() => setLoading(false)} style={styles.image} resizeMode="cover" />
                </View>
            </TouchableOpacity >}

            {/* Video Player */}
            {(playVideo) && <Video source={{ uri: data.video_link }} style={{ width: videoWidth, height: videoHeight, backgroundColor: appColors.primary }} resizeMode="cover" useNativeControls ref={video} onFullscreenUpdate={({ fullscreenUpdate, status }) => {
                if (fullscreenUpdate == VideoFullscreenUpdate.PLAYER_WILL_PRESENT) {
                    setOrientation(!orientationIsLandscape);
                }
                else if (fullscreenUpdate == VideoFullscreenUpdate.PLAYER_DID_PRESENT) {
                    setVideoWidth(deviceHeight);
                    setVideoHeight(deviceWidth);
                }
                else if (fullscreenUpdate == VideoFullscreenUpdate.PLAYER_WILL_DISMISS) {
                    setOrientation(!orientationIsLandscape);
                }
                else if (fullscreenUpdate == VideoFullscreenUpdate.PLAYER_DID_DISMISS) {
                    setVideoWidth(deviceWidth);
                    setVideoHeight(landscapeHeight);
                }
            }} shouldPlay={true} onPlaybackStatusUpdate={(status) => setStatus(() => status)} status={{ progressUpdateIntervalMillis: 1000 }} onLoad={() => setLoadingVideo(false)} />}

            {/* Movie Details */}
            <View style={[bottomBoxStyle, { backgroundColor: appColors.primary }]}>
                <ScrollView>
                    <View style={styles.movieDetails}>
                        <Text style={[styles.movieDetailsText, { marginVertical: 10, fontWeight: "800", textAlign: "center" }]}>{(data.title).toUpperCase()}</Text>
                        <Text style={styles.movieDetailsText}>{data.description}</Text>
                        <Text style={[styles.movieDetailsText, { marginVertical: 10 }]}> Release Date: {dateFormatter(data.release_date)}</Text>
                        <Text style={[styles.movieDetailsText, { marginVertical: 10 }]}> Download Size: {data.video_size}</Text>
                        {(data.subtitle_size.length > 0) && <Text style={[styles.movieDetailsText, { marginVertical: 10 }]}> Subtitle Size: {data.subtitle_size}</Text>}
                    </View>
                    <View style={styles.downloadLinks}>
                        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                            <GradientButton customWidth={160} customHeight={50} text={"Play Trailer"} onPress={() => navigation.navigate("WatchTrailer", { "movie_trailer": data.trailer })} />
                            <GradientButton customWidth={160} customHeight={50} text={"Play Movie"} onPress={() => setPlayVideo(true)} />
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                            <GradientButton customWidth={160} customHeight={50} text={"Download Movie"} />
                            {(data.subtitle_link.length > 0) && <GradientButton customWidth={160} customHeight={50} text={"Download Subtitle"} />}
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        flex: 1,
        backgroundColor: appColors.primary,
    },
    posterContainer: {
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: appColors.primary,
    },
    imageContainer: {
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20,
        width: "100%",
        height: "100%",
        overflow: "hidden"
    },
    image: {
        width: "100%",
        height: "100%",
    },
    movieDetails: {
        paddingHorizontal: 15,
        marginVertical: 10,
    },
    movieDetailsText: {
        fontSize: 17,
        color: appColors.transparent,
    },
    downloadLinks: {
        paddingHorizontal: 10,
    },
})