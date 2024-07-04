import GetMoviesService from "../../services/Movies/GetMoviesService";
import { Request, Response } from "express";
const getTop10FilmCurrentShowing = async(req: Request, res: Response) => {
    try {
        const movies = await GetMoviesService.getTop10FilmCurrentShowing()
        res.status(200).send(JSON.stringify(movies))
    } catch (error) {
        res.status(500).send(error)
    }
}

const getTop10FilmComingSoon = async(req: Request, res: Response) => {
    try {
        const movies = await GetMoviesService.getTop10FilmComingSoon()
        res.status(200).send(JSON.stringify(movies))
    } catch (error) {
        res.status(500).send(error)
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
    } catch (error) {
        res.status(500).send(error)
    }
}

export default {
    getTop10FilmCurrentShowing,
    getTop10FilmComingSoon,
    searchMovie
}