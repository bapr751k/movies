const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModels')

const crearUser = asyncHandler (async (req, res) => {
    //desestructurar el body
    const {name, email, password, esAdmin} = req.body  
// Verificamos que nos pasen todos los datos necesarios para crear un usuario
    if(!name | !email |!password | !esAdmin){
        res.status(400)
        throw new Error('Faltan datos')
    }

    // Verificar si el usuario existe atraves de su email
const userExiste = await User.findOne({email})

if(userExiste){
    res.status(400)
    throw new Error('Ese usuario ya existe en la base de datos')
    }

//Hacemos el HASH al password

const salt = await bcrypt.genSalt(10)
const  hashedPassword = await bcrypt.hash(password,salt)

//Crear el usuario
const user = await User.create({
    name,
    email,
    password: hashedPassword,
    //El token lo generamos aqui y se guarda en el campo token
    esAdmin
    

})

if (user) {
    res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        esAdmin: user.esAdmin,
    })
}  else{
    res.status(400)
    throw new Error('No se pudieron guardar los datos')
}

  //  res.status(201).json({message: 'Crear usuario'})
})

const loginUser = asyncHandler (async (req, res) => {

    const {email, password} = req.body
// Verifica que exista un usuario con ese email
    const user = await User.findOne({email})
// Si el usuario existe verificamos tambien el password
    if(user && (await bcrypt.compare(password,user.password))) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generarToken(user.id),
            esAdmin: user.esAdmin,

        })
    } else{
        res.status(400)
        throw new Error('Credenciales incorrectas')

}
})

const datosUser = asyncHandler (async (req, res) => {
    res.status(201).json(req.user)
})

const generarToken = (id_usuario) =>{
    return jwt.sign({id_usuario}, process.env.JWT_SECRET, {expiresIn: "30d"});

}


module.exports = {
    crearUser,
    loginUser,
    datosUser
}
