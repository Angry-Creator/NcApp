import axios from "axios";

// Creating a backend instance
const backendInstance = axios.create({
    baseURL: "https://MoviesAPI.angry-creator.repl.co/",
})

// Function to get all movies
const GetMovies = async (pageId = 1) => {
    let result = [];
    await backendInstance.get(`list/${pageId}`).then((response) => {
        result = [true, response.data];
    }
    ).catch((error) => {
        if (error.response) {
            result = [false, "the server responded with a 4xx/5xx error!"];
        }
        else if (error.request) {
            //App was able to make a request, but for some reason, it didn’t see a response
            result = [false, "Network Error"];
        } else {
            result = [false, "It's like something else is wrong in the app."];
        }
    });
    return result
};

const GetRandomMovie = async () => {
    let result = [];
    await backendInstance.get("random").then((response) => {
        result = [true, response.data];
    }
    ).catch((error) => {
        if (error.response) {
            result = [false, "the server responded with a 4xx/5xx error!"];
        }
        else if (error.request) {
            //App was able to make a request, but for some reason, it didn’t see a response
            result = [false, "Network Error"];
        } else {
            result = [false, "It's like something else is wrong in the app."];
        }
    });
    return result
}

const SearchMovie = async (movieName) => {
    let result = [];
    await backendInstance.get(`search/${movieName}`).then((response) => {
        result = [true, response.data];
    }
    ).catch((error) => {
        if (error.response) {
            result = [false, "the server responded with a 4xx/5xx error!"];
        }
        else if (error.request) {
            //App was able to make a request, but for some reason, it didn’t see a response
            result = [false, "Network Error"];
        } else {
            result = [false, "It's like something else is wrong in the app."];
        }
    });
    return result
}


export { GetMovies, GetRandomMovie, SearchMovie }