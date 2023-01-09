import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator, RefreshControl, Text } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import TopCard from "../components/TopCard";
import appColors from "../config/appColors";
import { GetMovies } from "../Networking/MoviesApi";
import MovieCard from "../components/MovieCard";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Dashboard({ navigation }) {
    const [moviesList, setMoviesList] = useState([]);
    const [maxPage, setMaxPage] = useState(1);
    const minPage = 1;
    const [movieCount, setmovieCount] = useState(minPage);
    const [refreshing, setRefreshing] = useState(false);

    const getRandomNumber = () => {
        return Math.floor(Math.random() * (maxPage - minPage + 1) + minPage);
    }

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        let randomNumber = getRandomNumber(randomNumber);
        //Making sure the random number does not refresh as the previous number
        while ((randomNumber == movieCount) && (maxPage > minPage)) {
            randomNumber = getRandomNumber(randomNumber);
        }
        setmovieCount(randomNumber);
        wait(1000).then(() => setRefreshing(false));
    }, []);

    const callApi = async (pageId = 1) => {
        const [valid, result] = await GetMovies(pageId);
        if (valid) {
            setMoviesList(result);
        } else {
            //If there is an error!
            console.log(result);
        }
    }


    useEffect(() => {
        callApi(movieCount);
    }, [movieCount]);

    return (
        <SafeAreaView style={{flex: 1}}>
            {/* When the Movie Lists is Loading */}
            {((moviesList.length < 1) && (moviesList.length < 1)) && <View style={[styles.container, { justifyContent: "center" }]}>
                <ActivityIndicator size="large" color="white" />
            </View>}

            {/* When Loading Movie Lists is Done */}
            {((moviesList.length > 0) && (moviesList.length > 0)) &&
                <ScrollView contentContainerStyle={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} progressViewOffset={30} />}>

                    <View style={styles.bodyContainer}>

                    </View>

                </ScrollView>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        flex: 1,
        backgroundColor: appColors.primary,
    },
    bodyContainer: {
        flex: 0.6,
    },
});