import React, { useState, useEffect } from 'react';

import axios from '../../utils/axios';
// import requests from '../../utils/requests';

import './SearchResult.css';

const base_url = 'https://image.tmdb.org/t/p/original';

const SearchResult = ({ keyword, genre, year, language, mediaType }) => {
    const [movies, setMovies] = useState([]);

    // const url = `${requests.fetchSearch}&keyword=${keyword}`;
    console.log(genre);
    useEffect(() => {
        async function fetchData() {
            const response = await axios.post(
                'http://localhost:5000/api/movies/search/v2?token=8qlOkxz4wq',
                { keyword, genre, year, language, mediaType },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            setMovies(response.data.results);
            return response;
        }

        if (keyword) {
            fetchData();
        } else {
            setMovies([]);
        }
    }, [keyword, genre,language,year,mediaType]);

    return (
        <div className="row">
            <h2>Search Result</h2>
            <div className="row_posters search-resul-container sc2">
                {movies.map((movie) => {
                    return (
                        <img
                            key={movie.id}
                            className={`row_poster row_posterLarge`}
                            src={`${base_url}${movie.poster_path}`}
                            alt={movie.name}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default SearchResult;
