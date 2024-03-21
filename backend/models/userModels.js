const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, "por favor teclea tu nombre"]
    },
    email: {
        type: String,
        require: [true, "por favor teclea tu email"],
        unique: true
    },
    password: {
        type: String,
        require: [true, "por favor teclea tu password"]
    },
    esAdmin: {
        type: Boolean,
        default: false
    },
},{
    timestamps: true  //instrucción que pone el identificador unico fecha de creación y de modificación
})

module.exports = mongoose.model('User', userSchema)
// exportamos la función que permite interactuar con los usuarios a través del modelo
