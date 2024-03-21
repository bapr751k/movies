const mongoose = require ('mongoose')

const moviesSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    adult:{
        type: Boolean
    },
    backdrop_path: {
        type: String
    },
    genre_ids:{
        type: [Number]  //array of numbers
    },
    id:{
        type: Number
    },
    original_language:{
        type: String
    },
    original_title:{
        type: String
    },
    overview: {
        type: String
    },
    popularity:{
        type: Number
    },
    poster_path:{
        type: String
    },
    release_date:{
        type: Date
    },
    title:{
        type: String
    },
    video:{
        type: Boolean
    },
    vote_average:{
        type: Number
    },
    vote_count:{
        type: Number
    },
},
{
    timestamps: true
})


module.exports = mongoose.model('Movies', moviesSchema)
