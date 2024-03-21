const mongoose = require('mongoose')

const connectDB = async () => {
    try{
        const cont = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected:  ${cont.connection.host}`.cyan.underline)

    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB
