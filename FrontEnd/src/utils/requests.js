// const API_KEY = '504b85f6fe0a10a9c7f35945e14e7ddf';
const TOKEN = '8qlOkxz4wq';

// const requests = {
// 	fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
// 	fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123`,
// 	fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
// 	fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
// 	fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
// 	fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,TOKEN
// 	fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
// 	fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
// 	fetchSearch: `/search/movie?api_key=${API_KEY}&language=en-US`,
// };
const requests = {
    fetchTrending: `/trending?token=${TOKEN}`,
    fetchNetflixOriginals: `/origin?token=${TOKEN}`,
    fetchTopRated: `/top-rate?token=${TOKEN}`,
    fetchActionMovies: `/discover?token=${TOKEN}&id=28`,
    fetchComedyMovies: `/discover?token=${TOKEN}&id=35`,
    fetchHorrorMovies: `/discover?token=${TOKEN}&id=27`,
    fetchRomanceMovies: `/discover?token=${TOKEN}&id=10749`,
    fetchDocumentaries: `/discover?token=${TOKEN}&id=99`,
    // fetchSearch: `/search/movie?api_key=${TOKEN}&language=en-US`,
};

export default requests;
