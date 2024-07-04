declare const _default: {
    createNewMovie: (name: string, image: Buffer, director: string, mainActors: string, content: string) => Promise<string>;
    createNewCurrentMovieShowing: (filmId: number) => Promise<string>;
    createNewMovieComingSoon: (filmId: number) => Promise<string>;
    deleteMovieCurrentShowing: (id: number) => Promise<string>;
    deleteMovieComingSoon: (id: number) => Promise<string>;
    getImageFromFilmId: (id: number) => Promise<Buffer | null>;
};
export default _default;
