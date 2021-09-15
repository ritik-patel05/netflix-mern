const express = require('express');
const router = express.Router();
const {createMovie, updateMovie, deleteMovie, getMovie, getAllMovies, getRandomMovie} = require('../controllers/movie.controller')

router.route('/').post(createMovie);
router.route('/').get(getAllMovies);
router.route('/random').get(getRandomMovie);
router.route('/:id').put(updateMovie);
router.route('/:id').delete(deleteMovie);
router.route('/find/:id').get(getMovie);

module.exports = router;
