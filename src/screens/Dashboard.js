import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator, RefreshControl, Text } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import TopCard from "../components/TopCard";
import appColors from "../config/appColors";
import { GetMovies } from "../Networking/MoviesApi";
import MovieCard from "../components/MovieCard";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Dashboard({ navigation }) {
    const [moviesList1, setMoviesList1] = useState([]);
    const [moviesList2, setMoviesList2] = useState([]);
    const [maxPage, setMaxPage] = useState(1);
    const minPage = 1;
    const [prevPage, setPrevPage] = useState(minPage);
    const [refreshing, setRefreshing] = useState(false);
    const [topCardMovie, setTopCardMovie] = useState(Math.floor(Math.random() * (9 - 0 + 1) + 0));

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
        while ((randomNumber == prevPage) && (maxPage > minPage)) {
            randomNumber = getRandomNumber(randomNumber);
        }
        setPrevPage(randomNumber);
        setTopCardMovie(Math.floor(Math.random() * (9 - 0 + 1) + 0));
        wait(1000).then(() => setRefreshing(false));
    }, []);

    const callApi = async (pageId = 1) => {
        const [valid, result] = await GetMovies(pageId);
        if (valid) {
            setMoviesList1(result);
        } else {
            //If there is an error!
            console.log(result);
        }
    }

    const callApiForRecommendedMovies = async (pageId = 1) => {
        const [valid, result] = await GetMovies(pageId);
        if (valid) {
            setMoviesList2(result);
        } else {
            //If there is an error!
            console.log(result);
        }
    }

    const MoviesCardList = ({ item }) => {
        return (
            <MovieCard item={item} onPressAction={() => navigation.navigate("MovieInfo", { "movie_data": item })} />
        )
    }

    const renderItemSeperator = () => {
        return (
            <View style={{ width: 10 }}></View>
        )
    }


    useEffect(() => {
        callApi(prevPage);
        callApiForRecommendedMovies(prevPage);
    }, [prevPage]);

    return (
        <SafeAreaView style={{flex: 1}}>
            {/* When the Movie Lists is Loading */}
            {((moviesList1.length < 1) && (moviesList2.length < 1)) && <View style={[styles.container, { justifyContent: "center" }]}>
                <ActivityIndicator size="large" color="white" />
            </View>}

            {/* When Loading Movie Lists is Done */}
            {((moviesList1.length > 0) && (moviesList2.length > 0)) &&
                <ScrollView contentContainerStyle={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} progressViewOffset={30} />}>

                    {/* Top Card */}
                    <View style={styles.topCardContainer}>
                        < TopCard data={moviesList1[topCardMovie]} onPressAction={() => navigation.navigate("MovieInfo", { "movie_data": moviesList1[topCardMovie] })} />
                    </View>

                    <View style={styles.bodyContainer}>
                        {/* Latest Moives */}
                        <Text style={styles.headerText}>Latest Movies</Text>
                        <View style={styles.moviesList}>
                            <FlatList style={{ paddingVertical: 5 }} renderItem={MoviesCardList} ItemSeparatorComponent={renderItemSeperator} data={moviesList1} horizontal ListFooterComponent={<View style={{ width: 10 }}></View>} />
                        </View>
                        {/* Recommended Movies */}
                        <Text style={styles.headerText}>Recommended Movies</Text>
                        <View style={styles.moviesList}>
                            <FlatList style={{ paddingVertical: 5 }} renderItem={MoviesCardList} ItemSeparatorComponent={renderItemSeperator} data={moviesList2} horizontal ListFooterComponent={<View style={{ width: 10 }}></View>} />
                        </View>
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
    topCardContainer: {
        flex: 0.4,
    },
    bodyContainer: {
        flex: 0.6,
    },
    moviesList: {
        flex: 0.8,
        paddingBottom: 5,
    },
    headerText: {
        flex: 0.2,
        fontSize: 18,
        color: "white",
        marginTop: 8,
        marginBottom: 5,
        paddingHorizontal: 10,
        fontWeight: "400",
    }
});