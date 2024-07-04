import { MovieSchedule, PrismaClient } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();

const createMovieSchedule = async (filmId: number, time: string, hour: number, minute: number , location: number) => {
    const newSchedule = await prisma.movieSchedule.create({
        data: {
            filmId,
            time,
            hour,
            minute,
            location
        }
    })
    
    if (newSchedule) {
        return 'Create a new movie schedule successfully !'
    }
    return 'Error occurred when creating a new movie schedule !'
}

const getMovieScheduleByTime = async (time: string, location: number) => {
    const movieSchedule = await prisma.movieSchedule.findFirst({
        where: {
            time,
            location: location
        }
    })
    return movieSchedule
}

const getMovieScheduleByFilmId = async (filmId: number) => {
    const movieSchedules: MovieSchedule[] = await prisma.movieSchedule.findMany({
        where: {
            filmId
        },
        orderBy: {
            time: 'asc' // Ensure the schedules are ordered by time
        }
    })

    return movieSchedules
}

export default {
    createMovieSchedule,
    getMovieScheduleByTime,
    getMovieScheduleByFilmId
}