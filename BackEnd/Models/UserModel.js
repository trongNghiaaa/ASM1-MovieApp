const fs = require('fs');
const path = require('path');

const pathListUser = path.join(__dirname, '../Data/userToken.json');

const User = {
    all() {
        return JSON.parse(fs.readFileSync(pathListUser, 'utf-8'));
    },
};

module.exports = User;
