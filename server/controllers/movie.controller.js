const Movie = require('../models/movie.model');

// CREATE 
const createMovie = async (req, res) => {
    if (req.user.isAdmin) {
        const newMovie = new Movie(req.body);
        try {
            const savedMovie = await newMovie.save();
            return res.status(201).json({
                success: true,
                message: "Movie Created.",
                movie: savedMovie
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }

    return res.status(403).json({
        success: false,
        message: "Not authorized."
    });
}

// UPDATE
const updateMovie = async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, {
                $set: req.body
            },{new: true});

            return res.status(200).json({
                success: true,
                message: "Movie Updated.",
                movie: updatedMovie
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }

    return res.status(403).json({
        success: false,
        message: "Not authorized."
    });
}

// DELETE
const deleteMovie = async (req, res) => {
    if (req.user.isAdmin) {
        try {
            await Movie.findByIdAndDelete(req.params.id);

            return res.status(200).json({
                success: true,
                message: "Movie deleted.",
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }

    return res.status(403).json({
        success: false,
        message: "Not authorized."
    });
}

// GET
const getMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id).lean();
        return res.status(200).json({
            success: true,
            message: "Success.",
            movie,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// GET ALL
const getAllMovies = async(req, res) => {
    if (req.user.isAdmin) {
        try {
            const movies = await Movie.find().lean();
            movies.reverse();
            res.status(200).json({
                success: true,
                message: "Success",
                movies
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }

    return res.status(403).json({
        success: false,
        message: "Not authorized."
    });
}

// GET RANDOM
const getRandomMovie = async (req, res) => {
    const type = req.query.type;
    let movie;
    try {
        if (type === "series") {
            movie = await Movie.aggregate([
                { $match: { isSeries: true } },
                { $sample: { size: 1} },
            ])
        } else {
            movie = await Movie.aggregate([
                { $match: { isSeries: false } },
                { $sample: { size: 1} },
            ])
        }

        return res.status(200).json({
            success: true,
            message: "Success.",
            movie
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {createMovie, updateMovie, deleteMovie, getMovie, getAllMovies, getRandomMovie}