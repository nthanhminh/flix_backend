declare const _default: {
    getTop10FilmCurrentShowing: () => Promise<{
        image: string;
        id: number;
        name: string;
        mainActors: string;
        content: string;
        director: string;
    }[] | null | undefined>;
    getTop10FilmComingSoon: () => Promise<{
        image: string;
        id: number;
        name: string;
        mainActors: string;
        content: string;
        director: string;
    }[] | null | undefined>;
    searchMovie: (searchTerm: string) => Promise<{
        image: string;
        id: number;
        name: string;
        mainActors: string;
        content: string;
        director: string;
    }[]>;
};
export default _default;
