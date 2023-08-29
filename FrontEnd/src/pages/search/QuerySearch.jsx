import { useState } from 'react';
import './QuerySearch.css';

const genreData = [
    {
        id: 28,
        name: 'Action',
    },
    {
        id: 12,
        name: 'Adventure',
    },
    {
        id: 16,
        name: 'Animation',
    },
    {
        id: 35,
        name: 'Comedy',
    },
    {
        id: 80,
        name: 'Crime',
    },
    {
        id: 99,
        name: 'Documentary',
    },
    {
        id: 18,
        name: 'Drama',
    },
    {
        id: 10751,
        name: 'Family',
    },
    {
        id: 14,
        name: 'Fantasy',
    },
    {
        id: 36,
        name: 'History',
    },
    {
        id: 27,
        name: 'Horror',
    },
    {
        id: 10402,
        name: 'Music',
    },
    {
        id: 9648,
        name: 'Mystery',
    },
    {
        id: 10749,
        name: 'Romance',
    },
    {
        id: 878,
        name: 'Science Fiction',
    },
    {
        id: 10770,
        name: 'TV Movie',
    },
    {
        id: 53,
        name: 'Thriller',
    },
    {
        id: 10752,
        name: 'War',
    },
    {
        id: 37,
        name: 'Western',
    },
];

const mediaTypes = [
    { id: '', name: 'All' },
    { id: 'movie', name: 'Movie' },
    { id: 'tv', name: 'TV' },
    { id: 'person', name: 'Person' },
];
const languages = [
    { id: 'en', name: 'EN' },
    { id: 'ja', name: 'JA' },
    { id: 'ko', name: 'KO' },
];

function QuerySearch({ getGenre, getType, getLanguage, getYear }) {
    const [selectedGenre, setSelectedGenre] = useState('');
    const [selectedMediaType, setSelectedMediaType] = useState('');
    const [language, setLanguage] = useState('');
    const [year, setYear] = useState('');

    const handleGenre = (e) => {
        setSelectedGenre(e.target.value);

        getGenre(e.target.value * 1);
    };

    const handleType = (e) => {
        setSelectedMediaType(e.target.value);

        getType(e.target.value);
    };

    const handleLanguage = (e) => {
        setLanguage(e.target.value);

        getLanguage(e.target.value);
    };

    const handleYear = (e) => {
        setYear(e.target.value);

        getYear(e.target.value);
    };
    return (
        <div className="row">
            <div>
                <select id="genreSelect" name="genre" value={selectedGenre} onChange={handleGenre}>
                    <option value="">Genre</option>
                    {genreData.map((genre) => (
                        <option key={genre.id} value={genre.id}>
                            {genre.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <select id="mediaType" name="mediaType" value={selectedMediaType} onChange={handleType}>
                    <option value="">Media Type</option>
                    {mediaTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                            {type.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <select id="language" name="language" value={language} onChange={handleLanguage}>
                    <option value="">Language</option>
                    {languages.map((language) => (
                        <option key={language.id} value={language.id}>
                            {language.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <input type="number" id="yearInput" name="year" value={year} onChange={handleYear} placeholder="Year" />
            </div>
        </div>
    );
}

export default QuerySearch;
