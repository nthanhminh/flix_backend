import express, { Router } from 'express'
import upload from '../multer/multerStorage'
import MovieController from '../controllers/Movies/MovieController'
import GetMovieController from '../controllers/Movies/GetMovieController'
const movieRouter: Router = express.Router()

movieRouter.post('/createNewMovie', upload.fields([{name: 'data', maxCount: 1}]), MovieController.createNewMovie)

movieRouter.post('/createNewCurrentMovieShowing', MovieController.createNewCurrentMovieShowing)

movieRouter.post('/createNewMovieComingSoon', MovieController.createNewMovieComingSoon)

movieRouter.delete('/deleteMovieCurrentShowing', MovieController.deleteMovieCurrentShowing)

movieRouter.delete('/deleteMovieComingSoon', MovieController.deleteMovieComingSoon)

movieRouter.get('/getImageFromFilmId/:id', MovieController.getImageFromFilmId)

movieRouter.get('/getTop10FilmCurrentShowing', GetMovieController.getTop10FilmCurrentShowing)

movieRouter.get('/getTop10FilmComingSoon', GetMovieController.getTop10FilmComingSoon)

movieRouter.get('/searchMovie', GetMovieController.searchMovie)

export default movieRouter