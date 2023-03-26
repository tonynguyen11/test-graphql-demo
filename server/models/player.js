const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PlayerSchema = new Schema ({
    name: {
        type: String
    },
    age: {
        type: Number
    },
    clubId: {
        type: String
    }
})

module.exports = mongoose.model('players',PlayerSchema)