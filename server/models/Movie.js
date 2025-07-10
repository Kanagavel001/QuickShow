import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    _id: {type: String, rquired: true},
    title: {type: String, rquired: true},
    overview: {type: String, rquired: true},
    poster_path: {type: String, rquired: true},
    backdrop_path: {type: String, rquired: true},
    release_date: {type: String, rquired: true},
    original_language: {type: String},
    tagline: {type: String},
    genres: {type: Array, rquired: true},
    casts: {type: Array, rquired: true},
    vote_average: {type: Number, rquired: true},
    runtime: {type: Number, rquired: true},
}, {timestamps: true});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;