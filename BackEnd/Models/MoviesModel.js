const fs = require('fs');
const path = require('path');

const pathListMovie = path.join(__dirname, '../Data/movieList.json');

const Movie = {
    all() {
        return JSON.parse(fs.readFileSync(pathListMovie, 'utf-8'));
    },
};


module.exports = Movie;
