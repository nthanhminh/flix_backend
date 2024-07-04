import path from "path";
import MovieService from "../../services/Movies/MovieService"
import fs from 'fs'
import { Request, Response } from "express"

interface MulterRequest extends Request {
    files?: {
      [fieldname: string]: Express.Multer.File[];
    };
}

const createNewMovie = async (req: Request, res: Response) => {
    const multerReq = req as MulterRequest;
    const {name, mainActors, content, director} = multerReq.body
    const fileName = multerReq.files?.['data'][0].filename
    const image = fs.readFileSync(path.join(__dirname, '../../uploads', fileName!));
    if(!image){
        res.status(400).send('Please upload a file')
    }
    const response = await MovieService.createNewMovie(name, image, director, mainActors, content)
    if(response === 'Error occurred. Please try again later !'){
        res.status(500).send('Internal Server Error')
    } else {
        res.status(200).send(response)
    }
}

const createNewCurrentMovieShowing = async (req: Request, res: Response) => {
    const {filmId} = req.body;
    const response = await MovieService.createNewCurrentMovieShowing(filmId)
    if(response === 'Error occurred. Please try again later !'){
        res.status(500).send('Internal Server Error')
    } else {
        res.status(200).send(response)
    }
}

const createNewMovieComingSoon = async (req: Request, res: Response) => {
    const {filmId} = req.body;
    const response = await MovieService.createNewMovieComingSoon(filmId)
    if(response === 'Error occurred. Please try again later !'){
        res.status(500).send('Internal Server Error')
    } else {
        res.status(200).send(response)
    }
}

const deleteMovieCurrentShowing = async (req: Request, res: Response) => {
    const {id} = req.body;
    const response = await MovieService.deleteMovieCurrentShowing(id)
    if(response === 'Error occurred. Please try again later !'){
        res.status(500).send('Internal Server Error')
    } else {
        res.status(200).send(response)
    }
}

const deleteMovieComingSoon = async (req: Request, res: Response) => {
    const {id} = req.body;
    const response = await MovieService.deleteMovieComingSoon(id)
    if(response === 'Error occurred. Please try again later !'){
        res.status(500).send('Internal Server Error')
    } else {
        res.status(200).send(response)
    }
}

const getImageFromFilmId = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        res.status(400).send('Invalid ID format');
        return;
    }

    try {
        const image = await MovieService.getImageFromFilmId(id);

        if (image) {
            res.setHeader('Content-Type', 'image/jpeg'); 
            res.send(image);
        } else {
            res.status(404).send('Film not found');
        }
    } catch (error) {
        console.error(`Error retrieving image for film ID ${id}:`, error);
        res.status(500).send('Internal Server Error');
    }
}

export default {
    createNewMovie,
    createNewCurrentMovieShowing,
    createNewMovieComingSoon,
    deleteMovieCurrentShowing,
    deleteMovieComingSoon,
    getImageFromFilmId
}
