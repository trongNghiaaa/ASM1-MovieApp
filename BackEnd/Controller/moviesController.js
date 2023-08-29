const Movies = require('../Models/MoviesModel');
const Genre = require('../Models/GenreModel');
const Video = require('../Models/VideosModel');
const { paginateAndSorted, calcTotalPage } = require('../Utils/paging');

exports.getOriginMovies = (req, res) => {
    try {
        const movies = Movies.all(); // Lấy danh sách tất cả các phim từ MovieModel

        const page = req.query.page * 1 || 1; // Lấy giá trị của tham số 'page' từ query, mặc định là 1
        const limit = req.query.limit * 1 || 20; // Số phim trên mỗi trang mặc định 20 phim / 1 trang

        // Lấy danh sách các phim trên trang hiện tại
        const results = paginateAndSorted(movies, page, limit);

        // Tính tổng số trang
        const totalPages = calcTotalPage(movies.length, limit);

        res.status(200).json({
            page: page,
            total_pages: totalPages,
            results: results,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getTrendingMovies = (req, res) => {
    try {
        const movies = Movies.all(); // Lấy danh sách tất cả các phim từ MovieModel

        const page = req.query.page * 1 || 1; // Lấy giá trị của tham số 'page' từ query, mặc định là 1
        const limit = req.query.limit * 1 || 20; // Số phim trên mỗi trang mặc định 20 phim / 1 trang

        // Lấy danh sách các phim trên trang hiện tại
        const results = paginateAndSorted(movies, page, limit, 'popularity', 'desc');

        // Tính tổng số trang
        const totalPages = calcTotalPage(movies.length, limit);

        res.status(200).json({
            page: page,
            total_pages: totalPages,
            results: results,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getRatingMovies = (req, res) => {
    try {
        const movies = Movies.all();

        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 20;

        // Lấy danh sách các phim trên trang hiện tại
        const results = paginateAndSorted(movies, page, limit, 'vote_average', 'incr');

        // Tính tổng số trang
        const totalPages = calcTotalPage(movies.length, limit);

        res.status(200).json({
            page: page,
            total_pages: totalPages,
            results: results,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getMoviesByGenre = (req, res) => {
    try {
        const genreId = req.query.id * 1;
        if (!genreId || isNaN(genreId)) {
            return res.status(400).json({ message: 'Genre not found' });
        }

        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 20;

        const allMovies = Movies.all();
        const allGenre = Genre.all();

        const genreMovies = allMovies.filter((movie) => movie.genre_ids.includes(genreId));

        if (genreMovies.length === 0) {
            return res.status(400).json({ message: 'Genre not found' });
        }

        const genreName = allGenre.find((genre) => genre.id === genreId)?.name || 'Unknown Genre';

        const results = paginateAndSorted(genreMovies, page, limit);

        const totalPages = calcTotalPage(genreMovies.length, limit);

        res.json({
            page,
            total_pages: totalPages,
            genre_name: genreName,
            results,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getTrailer = (req, res) => {
    try {
        const filmId = req.body.film_id;

        if (!filmId) {
            return res.status(400).json({ message: 'Not found film_id param' });
        }

        const videoList = Video.all();
        const film = videoList.find((item) => item.id === filmId);

        if (!film) {
            return res.status(404).json({ message: 'Not found video' });
        }

        const validVideos = film.videos.filter((video) => {
            return video.official && video.site === 'YouTube' && (video.type === 'Trailer' || video.type === 'Teaser');
        });

        if (validVideos.length === 0) {
            return res.status(404).json({ message: 'Not found video' });
        }

        const latestVideo = validVideos.reduce((prev, current) => {
            return Date.parse(current.published_at) > Date.parse(prev.published_at) ? current : prev;
        });

        res.status(200).json(latestVideo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getSearchV1 = (req, res) => {
    try {
        const keyword = req.body.keyword;
        if (!keyword) {
            return res.status(400).json({ message: 'Not found keyword param' });
        }
        const movies = Movies.all();

        const page = req.body.page * 1 || 1;
        const limit = req.body.limit * 1 || 20;

        const searchMovies = movies.filter(
            (movie) =>
                movie.title?.toLowerCase().includes(keyword.toLowerCase()) ||
                movie.overview?.toLowerCase().includes(keyword.toLowerCase())
        );

        if (searchMovies.length === 0) {
            return res.status(200).json({ results: [], page: page, total_pages: 0 });
        }

        const results = paginateAndSorted(searchMovies, page, limit);

        const total_pages = calcTotalPage(searchMovies.length, limit);

        res.status(200).json({
            page: page,
            total_pages,
            results,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getSearchV2 = (req, res) => {
    try {
        const keyword = req.body.keyword;
        const genre = req.body.genre;
        const mediaType = req.body.mediaType;
        const year = req.body.year;
        const language = req.body.language;

        const page = req.body.page * 1 || 1;
        const limit = req.body.limit * 1 || 20;

        if (!keyword) {
            return res.status(400).json({ message: 'Not found keyword param' });
        }

        const movies = Movies.all();

        const searchMovies = movies.filter((movie) => {
            const isMatchingTitleOrOverview =
                movie.title?.toLowerCase().includes(keyword.toLowerCase()) ||
                movie.overview?.toLowerCase().includes(keyword.toLowerCase());

            const isMatchingGenre = genre ? movie.genre_ids.includes(genre) : true;
            const isMatchingMediaType = mediaType ? movie.media_type === mediaType : true;
            const isMatchingLanguage = language ? movie.original_language === language : true;
            const isMatchingYear = year
                ? movie.release_date?.split('-')[0] === year || movie.first_air_date?.split('-')[0] === year
                : true;

            return isMatchingTitleOrOverview && isMatchingGenre && isMatchingMediaType && isMatchingLanguage && isMatchingYear;
        });

        if (searchMovies.length === 0) {
            return res.status(200).json({ results: [], page: page, total_pages: 0 });
        }

        const results = paginateAndSorted(searchMovies, page, limit);

        const total_pages = calcTotalPage(searchMovies.length, limit);

        res.status(200).json({
            page: page,
            total_pages,
            results,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
