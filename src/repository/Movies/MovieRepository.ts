import { PrismaClient, Film, CurrentShowing, ComingSoon, TicketPrice } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient()

const createNewMovie = async (
    name: string,
    image: Buffer,
    director: string,
    mainActors: string,
    content: string,
    tag: string,
    duration: string,
    country: string,
) : Promise<string> => {
    const newMovie: Film = await prisma.film.create({
        data: {
            name,
            image,
            director,
            mainActors,
            content,
            tag,
            duration,
            country
        }
    })

    if(newMovie){
        return "Created new movie successfully !"
    }

    return "Error occurred. Please try again later !"
}

const createNewCurrentMovieShowing = async (filmId: number) : Promise<string> => {
    const newMovieShowing: CurrentShowing = await prisma.currentShowing.create({
        data: {
            filmId: filmId
        }
    })

    if(newMovieShowing){
        return "Created new movie showing successfully !"
    }

    return "Error occurred. Please try again later !"
}

const createNewMovieComingSoon = async (filmId: number) : Promise<string> => {
    const newMovieComingSoon: ComingSoon = await prisma.comingSoon.create({
        data: {
            filmId
        }
    })

    if(newMovieComingSoon){
        return "Created new movie coming soon successfully !"
    }

    return "Error occurred. Please try again later !"
}

const deleteMovieCurrentShowing = async (id: number) : Promise<string> => {
    const movie = await prisma.currentShowing.delete({
        where: {
            id
        }
    })

    if(movie){
        return "Removed movie from current showing list successfully !"
    }

    return "Error occurred. Please try again later !"
}

const deleteMovieComingSoon = async (id: number) : Promise<string> => {
    const movie = await prisma.comingSoon.delete({
        where: {
            id
        }
    })

    if(movie){
        return "Removed movie from coming soon list successfully !"
    }

    return "Error occurred. Please try again later !"
}

const getImageFromFilmId = async (id: number) : Promise<Buffer | null> => {
    const movie: Film | null = await prisma.film.findFirst({
        where: {
            id
        }
    })
    if(!movie){
        return null
    }
    return movie.image
}

const createNewTicket = async (name: string, type: string, price: string, filmId: number) =>{
    const newTicket: TicketPrice = await prisma.ticketPrice.create({
        data: {
            name,
            type,
            price,
            filmId
        }
    })

    return newTicket
}

const getTicketByFilmId = async (filmId: number) => {
    const tickets = await prisma.ticketPrice.findMany({where: {
        filmId
    }})

    return tickets
}

export default {
    createNewMovie,
    createNewCurrentMovieShowing,
    createNewMovieComingSoon,
    deleteMovieCurrentShowing,
    deleteMovieComingSoon,
    getImageFromFilmId,
    createNewTicket,
    getTicketByFilmId
}