import React, { useState, useEffect } from 'react';

import axios from '../../utils/axios';
// import movieTrailer from 'movie-trailer';
import MovieDetail from '../../components/browse/MovieDetail';
import './MovieList.css';

const base_url = 'https://image.tmdb.org/t/p/original';

function MovieList({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    const handleClick = async (movie) => {
        try {
            const response = await axios.post(
                'http://localhost:5000/api/movies/video?token=8qlOkxz4wq',
                { film_id: movie.id },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (selectedMovie && selectedMovie.id === movie.id) {
                setSelectedMovie(null);
                setTrailerUrl('');
                setError(null);
            } else {
                setSelectedMovie(movie);
                setTrailerUrl(response.data.key);
                setError(null);
            }
        } catch (error) {
            setError(error);
        }

        // if (selectedMovie && selectedMovie.id === movie.id) {
        //     setSelectedMovie(null);
        //     setTrailerUrl('');
        // } else {
        //     setSelectedMovie(movie);
        //     movieTrailer(movie?.title || '')
        //         .then((url) => {
        //             const urlParams = new URLSearchParams(new URL(url).search);
        //             setTrailerUrl(urlParams.get('v'));
        //         })
        //         .catch((error) => console.log(error));
        // }
    };

    return (
        <div className="row">
            <h2 className="movie-list-title">{title}</h2>
            <div className="row_posters sc2">
                {movies.map((movie) => {
                    return (
                        <img
                            key={movie.id}
                            onClick={() => handleClick(movie)}
                            className={`row_poster ${isLargeRow && 'row_posterLarge'}`}
                            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                            alt={movie.name}
                        />
                    );
                })}
            </div>
            {error && <h3 style={{ textAlign: 'center', paddingTop: '50px' }}>Not Found Trailer...</h3>}
            {!error && (
                <div style={{ padding: '40px' }}>
                    {selectedMovie && <MovieDetail movieData={selectedMovie} movieTrailer={trailerUrl} />}
                </div>
            )}
        </div>
    );
}

export default MovieList;
