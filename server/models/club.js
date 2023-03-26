const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClubSchema = new Schema ({
    name: {
        type: String
    },
    founded: {
        type: Number
    },
    stadium: {
        type: String
    }
})

module.exports = mongoose.model('clubs',ClubSchema)