const express = require('express');
const cors = require('cors');
const moviesRoute = require('./Routes/MovieRoute');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/movies', moviesRoute);
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

app.use('/', (req, res) => {
    res.send('<h1>Hello from server</h1>');
});

module.exports = app;
