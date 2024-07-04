declare const _default: {
    createMovieSchedule: (filmId: number, time: string, hour: number, minute: number, location: number) => Promise<"Create a new movie schedule successfully !" | "Error occurred when creating a new movie schedule !">;
    getMovieScheduleByTime: (time: string, location: number) => Promise<{
        id: number;
        filmId: number;
        time: string;
        hour: number;
        minute: number;
        location: number;
    } | null>;
    getMovieScheduleByFilmId: (filmId: number) => Promise<{
        id: number;
        filmId: number;
        time: string;
        hour: number;
        minute: number;
        location: number;
    }[]>;
};
export default _default;
