const express = require('express');
const moviesController = require('../Controller/moviesController');
const authenticateUser = require('../Middleware/userToken');

const router = express.Router();

// Áp dụng middleware xác thực cho tất cả các route trong router này
router.use(authenticateUser);

router.get('/origin', moviesController.getOriginMovies);
router.get('/trending', moviesController.getTrendingMovies);
router.get('/top-rate', moviesController.getRatingMovies);
router.get('/discover', moviesController.getMoviesByGenre);

// v1: search theo keyword || v2 : search theo keyword ,language , type , year
router.post('/search/v1', moviesController.getSearchV1);
router.post('/search/v2', moviesController.getSearchV2);
router.post('/video', moviesController.getTrailer);

module.exports = router;
