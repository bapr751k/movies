const express = require('express')
const router = express.Router()
const { getMovies, createMovies, updateMovies, deleteMovies } = require('../controllers/moviesControllers')
const {protect} = require ('../middleware/authMiddleware')

//router.get('/', protect, getMovies)
router.get('/', getMovies)
router.post('/', protect, createMovies)

router.put('/:id', protect, updateMovies)
router.delete('/:id', protect, deleteMovies)

// Require controller modules.
module.exports = router