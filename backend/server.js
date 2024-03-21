const express = require('express')
const connectDB = require('./config/db')
const colors =  require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require ('./middleware/errorMiddleware')
const port = process.env.PORT || 8000
const cors = require('cors')
const app = express()

connectDB()
app.use(cors())
// Middleware para parsear el body de las peticiones
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/api/users', require('./routes/usersRoutes'))
app.use('/api/movies', require('./routes/moviesRoutes'))
app.use(errorHandler)

//app.get('/', (req, res) => {
 // res.send('¡Hola mundo con Express y Node.js!')
//})

app.listen(port, () => {
  console.log(`Aplicación escuchando en el puerto ${port}!`)
})

