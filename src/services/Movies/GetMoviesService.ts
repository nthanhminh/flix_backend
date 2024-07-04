import GetMovieRepository from "../../repository/Movies/GetMovieRepository";
import dotenv from 'dotenv';
dotenv.config()
const getTop10FilmCurrentShowing = async () => {
    try {
        const movies = await GetMovieRepository.getTop10FilmCurrentShowing();
        return movies
    } catch (error) {
        console.error(error);
    }
}

const getTop10FilmComingSoon = async () => {
    try {
        const movies = await GetMovieRepository.getTop10FilmComingSoon();
        return movies
    } catch (error) {
        console.error(error);
    }
}

const searchMovie = async (searchTerm: string) => {
    try {
        const search = searchTerm.trim().split(" ").join(" | ");
        const movies = await GetMovieRepository.searchMovie(search);
        return movies;
    } catch (error) {
        console.error(error);
        return ([])
    }
}

const getMovieById = async (id: number) => {
    const movie = await GetMovieRepository.getMovieById(id);
    const response = {
        ...movie,
        image: `${process.env.BASE_URL}/getImageFromFilmId/${movie?.id}`
    }
    return response
}

export default {
    getTop10FilmCurrentShowing,
    getTop10FilmComingSoon,
    searchMovie,
    getMovieById
}