const fs = require('fs');
const path = require('path');

const pathListGenre = path.join(__dirname, '../Data/genreList.json');

const Genre = {
    all() {
        return JSON.parse(fs.readFileSync(pathListGenre, 'utf-8'));
    },
};

module.exports = Genre;
