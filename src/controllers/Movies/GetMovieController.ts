import GetMoviesService from "../../services/Movies/GetMoviesService";
import { Request, Response } from "express";
const getTop10FilmCurrentShowing = async(req: Request, res: Response) => {
    try {
        const movies = await GetMoviesService.getTop10FilmCurrentShowing()
        res.status(200).send(JSON.stringify(movies))
    } catch (error:any) {
        return res.status(400).json({ error: error.message });
    }
}

const getTop10FilmComingSoon = async(req: Request, res: Response) => {
    try {
        const movies = await GetMoviesService.getTop10FilmComingSoon()
        res.status(200).send(JSON.stringify(movies))
    } catch (error:any) {
        return res.status(400).json({ error: error.message });
    }
}

const searchMovie = async(req: Request, res: Response) => {
    try {
        const {search} = req.query
        if (!search || typeof search !== 'string') {
            res.status(400).json({ error: 'Invalid search query' });
            return;
          }
        const movies = await GetMoviesService.searchMovie(search)
        res.status(200).send(movies)
    } catch (error:any) {
        return res.status(400).json({ error: error.message });
    }
}

const getMovieById = async(req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    if (isNaN(id)) {
        res.status(400).send('Invalid ID format');
        return;
    }
    const movie = await GetMoviesService.getMovieById(id)
    res.status(200).send(movie)
}

const getAllComingFilms = async(req: Request, res: Response) => {
    try {
        const movies = await GetMoviesService.getAllComingFilms()
        res.status(200).send(JSON.stringify(movies))
    } catch (error:any) {
        return res.status(400).json({ error: error.message });
    }
}

const getAllCurrentFilms = async(req: Request, res: Response) => {
    try {
        const movies = await GetMoviesService.getAllCurrentFilms()
        res.status(200).send(JSON.stringify(movies))
    } catch (error:any) {
        return res.status(400).json({ error: error.message });
    }
}


export default {
    getTop10FilmCurrentShowing,
    getTop10FilmComingSoon,
    searchMovie,
    getMovieById,
    getAllComingFilms,
    getAllCurrentFilms
}