declare const _default: {
    getTop10FilmCurrentShowing: () => Promise<{
        image: string;
        id: number;
        name: string;
        mainActors: string;
        content: string;
        director: string;
    }[] | null>;
    getTop10FilmComingSoon: () => Promise<{
        image: string;
        id: number;
        name: string;
        mainActors: string;
        content: string;
        director: string;
    }[] | null>;
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
