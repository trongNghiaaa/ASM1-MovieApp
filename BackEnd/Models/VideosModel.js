const fs = require('fs');
const path = require('path');

const pathListVideo = path.join(__dirname, '../Data/videoList.json');

const Video = {
    all() {
        return JSON.parse(fs.readFileSync(pathListVideo, 'utf-8'));
    },
};

module.exports = Video;
