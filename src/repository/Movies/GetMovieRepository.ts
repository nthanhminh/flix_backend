import { ComingSoon, CurrentShowing, Film, PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config()
const prisma: PrismaClient = new PrismaClient()

const BASE_URL = process.env.BASE_URL

const getTop10FilmCurrentShowing = async() => {
    try {
        const movies: (CurrentShowing & { film: Film })[]= await prisma.currentShowing.findMany({
            take: 6,
            include: {
                film: true
            }
        })

        const movieTranforms = movies.map((movie: (CurrentShowing & { film: Film })) => {
            return {
                ...movie.film,
                image: `${BASE_URL}/images/getImageFromFilmId/${movie.film.id}`
            }
        })

        return movieTranforms 
    } catch (error) {
        console.error(error)
        return null
    }
}

const getAllCurrentFilms = async() => {
    try {
        const movies: (CurrentShowing & { film: Film })[]= await prisma.currentShowing.findMany({
            include: {
                film: true
            }
        })

        const movieTranforms = movies.map((movie: (CurrentShowing & { film: Film })) => {
            return {
                ...movie.film,
                image: `${BASE_URL}/images/getImageFromFilmId/${movie.film.id}`
            }
        })

        return movieTranforms 
    } catch (error) {
        console.error(error)
        return null
    }
}

const getAllComingFilms = async() => {
    try {
        const movies: (CurrentShowing & { film: Film })[]= await prisma.comingSoon.findMany({
            include: {
                film: true
            }
        })

        const movieTranforms = movies.map((movie: (CurrentShowing & { film: Film })) => {
            return {
                ...movie.film,
                image: `${BASE_URL}/images/getImageFromFilmId/${movie.film.id}`
            }
        })

        return movieTranforms 
    } catch (error) {
        console.error(error)
        return null
    }
}

const getTop10FilmComingSoon = async() => {
    try {
        const movies: (ComingSoon & { film: Film })[]= await prisma.comingSoon.findMany({
            take: 6,
            include: {
                film: true
            }
        })

        const movieTranforms = movies.map((movie: (ComingSoon & { film: Film })) => {
            return {
                ...movie.film,
                image: `${BASE_URL}/images/getImageFromFilmId/${movie.film.id}`
            }
        })

        return movieTranforms 
    } catch (error) {
        console.error(error)
        return null
    }
}

const searchMovie = async(searchTerm: string) => {
    try {
        const movies = await prisma.film.findMany({
            where: {
                name: {
                    search: searchTerm
                }
            }
        })

        const movieTranforms = movies.map((movie) => {
            return {
                ...movie,
                image: `${BASE_URL}/images/getImageFromFilmId/${movie.id}`
            }
        })
    
        return movieTranforms
    } catch (error) {
        console.error(error)
        return []
    }
}

const getMovieById = async(id: number) => {
    const movie = await prisma.film.findFirst({
        where: {
            id
        }
    })

    return movie
}

export default {
    getTop10FilmCurrentShowing,
    getTop10FilmComingSoon,
    searchMovie,
    getMovieById,
    getAllComingFilms,
    getAllCurrentFilms
}