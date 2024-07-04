declare const _default: {
    createMovieSchedule: (filmId: number, dateStr: string, hour: number, minute: number, location: number) => Promise<"Create a new movie schedule successfully !" | "Error occurred when creating a new movie schedule !" | "Showtimes overlap!">;
    getMovieScheduleByFilmId: (filmId: number) => Promise<Record<string, {
        id: number;
        filmId: number;
        time: string;
        hour: number;
        minute: number;
        location: number;
    }[]>>;
    orderTicket: (customerId: number, totalPrice: string, movieScheduleId: number, foodIdList: number[], comboIdList: number[], values: string[]) => Promise<"Successfully !" | "Error occured when creatin new order !">;
};
export default _default;
