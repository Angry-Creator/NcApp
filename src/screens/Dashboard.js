import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator, Platform, StatusBar, RefreshControl, TouchableOpacity, Text } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import TopCard from "../components/TopCard";
import appColors from "../config/appColors";
import { GetMovies } from "../Networking/MoviesApi";
import MovieCard from "../components/MovieCard";

export default function Dashboard({ navigation }) {
    const [moviesList, setMoviesList] = useState([]);
    const [maxPage, setMaxPage] = useState(1);
    const minPage = 1;
    const [prevPage, setPrevPage] = useState(minPage);
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
        while ((randomNumber == prevPage) && (maxPage > minPage)) {
            randomNumber = getRandomNumber(randomNumber);
        }
        setPrevPage(randomNumber);
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

    const MoviesCardList = ({ item }) => {
        return (
            <MovieCard item={item} />
        )
    }

    const renderItemSeperator = () => {
        return (
            <View style={{ width: 10 }}></View>
        )
    }


    useEffect(() => {
        callApi(prevPage);
    }, [prevPage]);

    return (
        <>
            {/* When the Movie Lists is Loading */}
            {(moviesList.length < 1) && <View style={[styles.container, { justifyContent: "center" }]}>
                <ActivityIndicator size="large" color="white" />
            </View>}

            {/* When Loading Movie Lists is Done */}
            {((moviesList.length > 0)) &&
                <ScrollView contentContainerStyle={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} progressViewOffset={30} />}>

                    {/* Top Card */}
                    < TopCard data={moviesList[5]} onPressAction={() => navigation.navigate("MovieInfo", { "movie_data": moviesList[5] })} />

                    <Text style={styles.headerText}>Latest Movies</Text>
                    {/* Recommended Movies */}
                    <View style={styles.moviesList}>
                        <FlatList style={{ paddingVertical: 5 }} renderItem={MoviesCardList} ItemSeparatorComponent={renderItemSeperator} data={moviesList} horizontal ListFooterComponent={<View style={{width: 10}}></View>} />
                    </View>
                    <Text style={styles.headerText}>Recommended Movies</Text>
                    <View style={styles.moviesList}>
                        <FlatList style={{ paddingVertical: 5 }} renderItem={MoviesCardList} ItemSeparatorComponent={renderItemSeperator} data={moviesList} horizontal ListFooterComponent={<View style={{width: 10}}></View>} />
                    </View>
                    
                </ScrollView>
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        flex: 1,
        paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
        backgroundColor: appColors.primary,
    },
    moviesList: {
        paddingBottom: 5,
    },
    headerText: {
        fontSize: 18,
        color: "white",
        marginTop: 8,
        marginBottom: 5,
        paddingHorizontal: 10,
        fontWeight: "400",
    }
});