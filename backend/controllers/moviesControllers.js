const asyncHandler = require('express-async-handler')
const Movie = require('../models/moviesModels')
const User = require('../models/userModels')

const getMovies = async (req, res) => {

   // const movies = await Movie.find({ user: req.user.id })
    const movies = await Movie.find()
    res.status(200).json(movies)
}

const createMovies = asyncHandler( async (req, res) => {
    if(!req.body.id){
        res.status(400)
        throw new Error('Por favor completa el registro de la pelicula')
    }

    const movie = await Movie.create({
        adult: req.body.adult,
        backdrop_path: req.body.backdrop_path,  
        genre_ids: req.body.genre_ids,
        id:req.body.id,
        original_language:req.body.original_language,
        original_title:req.body.original_title,
        overview: req.body.overview,
        popularity:req.body.popularity,
        poster_path:req.body.poster_path,
        release_date:req.body.release_date,
        title:req.body.title,
        video:req.body.video,
        vote_average:req.body.vote_average,
        vote_count:req.body.vote_count,
        user: req.user.id,
    })
    res.status(201).json(movie)
}
)

const updateMovies = asyncHandler( async (req, res) => {

    const movie = await Movie.findById(req.params.id)

    if(!movie){
        res.status(400)
        throw new Error("La pelicula no existe")
    }

    //nos aseguramos que la pelicula pertenezca al usuario logeado, es decir el del token

    if(movie.user.toString()!== req.user.id){
        res.status(401)
        throw new Error ("usuario no autorizado")
    } else {
        const movieUpdate = await Movie.findByIdAndUpdate(req.params.id, req.body, {new: true})

        res.status(200).json(movieUpdate)

    }
}
)

const deleteMovies = asyncHandler( async (req, res) => {

    const movie = await Movie.findById(req.params.id)

    if(!movie){
        res.status(400)
        throw new Error("La pelicula no existe")
    }

 //nos aseguramos que la pelicula pertenezca al usuario logeado, es decir el del token
 //if(movie.user.toString()!== req.user.id){
   // res.status(401)
   // throw new Error ("usuario no autorizado")
 if(User.esAdmin === false){
    res.status(401)
    throw new Error ("usuario no autorizado")
} else {
    await Movie.deleteOne(movie)

    res.status(200).json({ id: req.params.id })
}
    
} )

module.exports ={
    getMovies,
    createMovies,
    updateMovies,
    deleteMovies
}
