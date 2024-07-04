import MovieRepository from "../../repository/Movies/MovieRepository";

const createNewMovie = async (
    name: string,
    image: Buffer,
    director: string,
    mainActors: string,
    content: string
) : Promise<string> => {
    const response: string = await MovieRepository.createNewMovie(name,image, director, mainActors,content);
    return response;
}

const createNewCurrentMovieShowing = async (filmId : number): Promise<string> => {
    const response: string = await MovieRepository.createNewCurrentMovieShowing(filmId)
    return response;
}

const createNewMovieComingSoon = async (filmId : number): Promise<string> => {
    const response: string = await MovieRepository.createNewMovieComingSoon(filmId)
    return response;
}

const deleteMovieCurrentShowing = async (id:number): Promise<string> => {
    const response: string = await MovieRepository.deleteMovieCurrentShowing(id)
    return response;
}

const deleteMovieComingSoon = async (id:number): Promise<string> => {
    const response: string = await MovieRepository.deleteMovieComingSoon(id)
    return response;
}

const getImageFromFilmId = async (id : number): Promise<Buffer | null> => {
    const image = await MovieRepository.getImageFromFilmId(id)
    return image;
}

export default {
    createNewMovie,
    createNewCurrentMovieShowing,
    createNewMovieComingSoon,
    deleteMovieCurrentShowing,
    deleteMovieComingSoon,
    getImageFromFilmId
}