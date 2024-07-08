import express, { Router } from 'express'
import upload from '../multer/multerStorage'
import MovieController from '../controllers/Movies/MovieController'
import GetMovieController from '../controllers/Movies/GetMovieController'
import isAuthenticated from '../middleware/auth'
const movieRouter: Router = express.Router()

movieRouter.use(isAuthenticated)

movieRouter.post('/createNewMovie', upload.fields([{name: 'data', maxCount: 1}]), MovieController.createNewMovie)

movieRouter.post('/createNewCurrentMovieShowing', MovieController.createNewCurrentMovieShowing)

movieRouter.post('/createNewMovieComingSoon', MovieController.createNewMovieComingSoon)

movieRouter.delete('/deleteMovieCurrentShowing', MovieController.deleteMovieCurrentShowing)

movieRouter.delete('/deleteMovieComingSoon', MovieController.deleteMovieComingSoon)

movieRouter.get('/getImageFromFilmId/:id', MovieController.getImageFromFilmId)

movieRouter.get('/getTop10FilmCurrentShowing', GetMovieController.getTop10FilmCurrentShowing)

movieRouter.get('/getTop10FilmComingSoon', GetMovieController.getTop10FilmComingSoon)

movieRouter.get('/searchMovie', GetMovieController.searchMovie)

movieRouter.get('/getMovieById/:id', GetMovieController.getMovieById)

movieRouter.post('/createNewTicket', MovieController.createNewTicket)

movieRouter.get('/getTicketByFilmId/:id', MovieController.getTicketByFilmId)

movieRouter.get('/getAllCurrentFilms', GetMovieController.getAllCurrentFilms)

movieRouter.get('/getAllComingFilms', GetMovieController.getAllComingFilms)

export default movieRouter